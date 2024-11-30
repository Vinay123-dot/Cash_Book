
import React, { useState,memo,useRef,useContext } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form } from 'formik';
import CButton from "components/ui/Button";
import AntdFormikSelect from "components/ui/AntdFormikSelect";
import AntdInput from "components/ui/AntdInput";
import ParagraphTag from "constants/PTag";
import ShowPaymentTypes from "../DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "../DayBookFiles/BillAmountModal";
import { DayBookValidations } from "Validations";
import CashTypes from "../DayBookFiles/CashTypes";
import AdvanceBillDetails from "../DayBookFiles/AdvanceBillDetails";
import Modal from "components/shared/Modal";
import { getToday } from "utils/dateFormatter";
import AntdDaySelect from "components/ui/AntdDaySelect";
import AntdDatePicker from "components/ui/AntdDatePicker";
import { DaybookDataContext } from "context/DaybookContext";
import {
    setCommonCashBalance,
    setRemainingCommonBalance,
    setPettyCashBalance,
    setPettyCashRemainingBalance
} from '../../store/stateSlice';

import {
    apiStoreDayBookInfo,
    apiGetCommonOpeningBalance,
    apiGetRemainingCashBalance,
    apiGetPettyCashCommonBalance,
    apiGetPettyCashRemainingBalance
} from "../../../services/TransactionService";

import { getTotalMoneyInDayBook,convertTONumbers, verifyInputField } from "../CompConstants";
import DrawerSlide from "components/shared/Drawer";


const EditInDayBook = (props) => {

    const { editDayBookObj,
            isEditDayBookModal,
            handleCancelDBook,
            handleSaveEditDayBook,
        } = props;
    const dispatch = useDispatch();
    const editBookRef = useRef();
    const [showBillModal,setShowBillModal] = useState(false);
    const [validateModal,setValidateModal] = useState(true);
    const { daybooKData, setDaybookData } = useContext(DaybookDataContext);
    let uniqueId = localStorage.getItem("uniqueId");

  

    if (!isEditDayBookModal) return null;

    const showSelectBox = (label, name, ph, dynamicArray) => (
        <AntdDaySelect
            labelText = {label}
            name = {name}
            ph = {ph}
            handleChange = {(name, selectedValue) => editBookRef?.current?.setFieldValue(name, selectedValue)}
            Arr = {dynamicArray}
        />
    )

    
    const getBankBalance = async() => {
        try{
            const [openingBal,remBalance,pettyOpBal,pettyRembal] = await Promise.all([
                apiGetCommonOpeningBalance({uniqueId,date:getToday()}),
                apiGetRemainingCashBalance({uniqueId,date:getToday()}),
                apiGetPettyCashCommonBalance({ uniqueId,date: getToday()}),
                apiGetPettyCashRemainingBalance({ uniqueId, date: getToday() })
            ]);
            dispatch(setCommonCashBalance(openingBal?.opening_balance));
            dispatch(setRemainingCommonBalance(remBalance?.opening_balance));
            dispatch(setPettyCashBalance(pettyOpBal?.opening_balance));
            dispatch(setPettyCashRemainingBalance(pettyRembal?.opening_balance));
        }catch(e){
        }
        
    }
    // const showLoader = (loaderFlag) => setDaybookData((prev) => ({...prev,showDaybookLoader:loaderFlag}));
    const showLoader = (loaderFlag) => setDaybookData((prev) => ({...prev}));
    const handleSubmit = async (values,validateModal) => {
        try {
            if(Number(values.advance_receipt_amount) > values.remaining_balance ) {
                ErrModal({
                    Eflag : true,
                    EMsg : "Given amount should be less than or equal to the Advance Receipt Amount"
                });
                return;

            }
            setShowBillModal(false);
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = values.sales_type === 1 && validateModal && (diffInAmount > 10 || diffInAmount < -10);
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            showLoader(true);
            let newObj = JSON.parse(JSON.stringify(values));
            let convertedObj = convertTONumbers(newObj);

            convertedObj.key = uniqueId;
            // convertedObj.bill_no = billNum+"/"+ convertedObj.sales_code+"/"+convertedObj.bill_no;
            convertedObj.pending_balance = Number(values.bill_value) - getTotalMoneyInDayBook(values);
           
            
            let response = await apiStoreDayBookInfo([convertedObj]);
            if (response.message) {
                handleSaveEditDayBook();
                getBankBalance();
                setValidateModal(true);
                ErrModal({});
            }
            showLoader(false);
        } catch (Err) {
            ErrModal({
                Eflag : true,
                EMsg : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again"
            });
            showLoader(false);
            setValidateModal(true);
        }
    }

    const handleChangeSalesType = (name, sValue) => {
        editBookRef?.current?.setFieldValue(name, sValue);
        let salesObj = (daybooKData.salesType || []).find(
          (eachDoc) => eachDoc.Id === sValue
        );
        editBookRef?.current?.setFieldValue("sales_code", salesObj?.Code || "");
        let temp = [];
        if (sValue == 1) {
          temp = daybooKData.paymentListInfo.filter(
            (eachDoc) => eachDoc.Id != 4
          );
        } else {
          temp = JSON.parse(JSON.stringify(daybooKData.paymentListInfo));
        }
        setDaybookData({ ...daybooKData, paymentListInfo: temp });
      };

    const getCustomerList = (listArr,allObj) => {
        const { sales_type } =  allObj;
        let cType;
        if(sales_type != 1){
            cType = listArr.filter((eachDoc) => eachDoc.Id != 3);
        }else{
            cType = [...listArr];
        }
        return cType;

    }

    const showInputBox = ({
        label, 
        val, 
        func = verifyInputField, 
        values, 
        validation = false, 
        prefix = false, 
        onlyNum = false
    }) => {
        return (
            <AntdInput
                text={label}
                value={val}
                ph={label}
                showPrefix={prefix}
                acceptOnlyNum={onlyNum}
                validation={validation}
                validateField={(value) => func(value, values, val)}
            />
        )
    }

    const ErrModal = ({Eflag = false,EMsg = ""}) => {
        setDaybookData((prev) => ({
            ...prev,
            showErrorModal : Eflag,
            errorMessage : EMsg,
        }))
    }
   
    return (
      <DrawerSlide
        openDrawer = {true} 
        title = "Edit DayBook"
      >
        <Formik
          initialValues={editDayBookObj}
          validationSchema={DayBookValidations}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, validateModal);
          }}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className="h-full flex flex-col">
                <div className="flex-grow overflow-y-auto">
                  <ParagraphTag label="Details" />
                  <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-3 md:grid-cols-2">
                    <AntdDatePicker
                      labelText="Day"
                      name="date"
                      ph="--- Select Day ---"
                      value={values["date"]}
                      handleChange={(date, dateString) =>
                        setFieldValue("date", dateString)
                      }
                    />
                    <AntdFormikSelect
                      labelText="Sale Type"
                      name="sales_type"
                      ph="--Select Sale Type--"
                      handleChange={(name, selectedValue) =>
                        handleChangeSalesType(name, selectedValue)
                      }
                      Arr={daybooKData.salesType}
                    />
                    <AntdInput
                      text="Bill Number"
                      value="bill_no"
                      ph="Enter Bill Number"
                      showAddBefore={true}
                      disableInput={true}
                    />
                    {showSelectBox(
                      "Customer Type",
                      "customer_type",
                      "--Select CustomerType--",
                      getCustomerList(daybooKData.customerListInfo, values)
                    )}
                    {showInputBox({
                      label: "Bill Total Value",
                      val: "bill_value",
                      values: values,
                      validation: false,
                      prefix: true,
                      onlyNum: true,
                    })}
                    {showInputBox({
                      label: "Party Code",
                      val: "party_code",
                      values: values,
                    })}
                    {showInputBox({
                      label: "Party Name",
                      val: "party_name",
                      values: values,
                    })}
                  </div>
                  {values.sales_type === 1 && (
                    <>
                      <CashTypes
                        valObj={values}
                        paymentListInfo={daybooKData.paymentListInfo}
                        upiTypeInfo={daybooKData.upiTypeInfo}
                      />

                      <AdvanceBillDetails values={values} />
                    </>
                  )}

                  <ShowPaymentTypes paymentValues={values} />
                  <BillAmountModal
                    billModal={showBillModal}
                    valuesObj={values}
                    handleSubmitBillModal={() => handleSubmit(values, false)}
                    handleCancelBillModal={() => {
                      setShowBillModal(false);
                      setValidateModal(true);
                    }}
                  />
                </div>

                <div className="flex flex-row-reverse items-center gap-10 px-4 h-[20%]">
                  <CButton btnType="submit">Save</CButton>
                  <CButton
                    onClick={() => {
                      ErrModal({});
                      handleCancelDBook();
                      // dispatch(setShowAddBookPage(false))
                    }}
                    type="cancel"
                  >
                    Cancel
                  </CButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DrawerSlide>
    );
}

export default memo(EditInDayBook);

EditInDayBook.propTypes  = {
  editDayBookObj : PropTypes.object,
  isEditDayBookModal : PropTypes.bool,
  handleCancelDBook : PropTypes.func,
  handleSaveEditDayBook : PropTypes.func
};


