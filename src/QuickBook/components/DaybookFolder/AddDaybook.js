import React, { useContext, useEffect, useRef,useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { dayBookIntialObj } from "QuickBook/intialValuesFol";
import { DayBookValidations } from "Validations";
import ParagraphTag from "constants/PTag";
import AntdDatePicker from "components/ui/AntdDatePicker";
import AntdFormikSelect from "components/ui/AntdFormikSelect";
import { DaybookDataContext } from "context/DaybookContext";
import AntdInput from "components/ui/AntdInput";
import CashTypes from "../DayBookFiles/CashTypes";
import AdvanceBillDetails from "../DayBookFiles/AdvanceBillDetails";
import ShowPaymentTypes from "../DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "../DayBookFiles/BillAmountModal";
import CButton from "components/ui/Button";
import { convertTONumbers, getTotalMoneyInDayBook, verifyInputField } from "../CompConstants";
import { apiGetTerminal, apiStoreDayBookInfo } from "services/TransactionService";
import { 
    setSelectedBookType, 
    setShowAddBookPage, 
    setShowDayBookFields,
    setDataSavedModal
} from "../../store/stateSlice";
import useFetchReqBook from "views/RequestBook/components/useFetchReqBook";
import { setApprovedDates } from "views/RequestBook/store/dataSlice";

const AddDaybook = () => {

    const dispatch = useDispatch();
    const addBookRef = useRef();
    const { fetchRequestedDates } = useFetchReqBook();
    const { daybooKData, setDaybookData } = useContext(DaybookDataContext);
    const [billNum,setBillNum] = useState("");
    const [showBillModal,setShowBillModal] = useState(false);
    const [validateModal,setValidateModal] = useState(true);
    let uniqueId = localStorage.getItem("uniqueId");

  useEffect(() => {
    getTerminal();
    getRequiredDates();

    return () => {
      dispatch(setApprovedDates([]));
    }
  },[])

    const getTerminal = async() => {
        try{
            setDaybookData((prev) => ({...prev,showDaybookLoader : true}));
            let response = await apiGetTerminal(uniqueId);
            setBillNum(response?.[0]?.Sequence_No);
            setDaybookData((prev) => ({...prev,showDaybookLoader : false}));
        }
        catch(e){
            setDaybookData((prev) => ({...prev,showDaybookLoader : false}));
        }
    }

    const getRequiredDates = async() => {
      try{
         let response = await fetchRequestedDates({book_name : "Day Transactions"});
         dispatch(setApprovedDates(response || []));
      }catch(Err){

      }
  }

  const handleChangeSalesType = (name, sValue) => {
    addBookRef?.current?.setFieldValue(name, sValue);
    let salesObj = (daybooKData.salesType || []).find(
      (eachDoc) => eachDoc.Id === sValue
    );
    addBookRef?.current?.setFieldValue("sales_code", salesObj?.Code || "");
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

    const showSelectBox = (label, name, ph, dynamicArray) => (
        <AntdFormikSelect
            labelText = {label}
            name = {name}
            ph = {ph}
            handleChange = {(name, selectedValue) => addBookRef?.current?.setFieldValue(name, selectedValue)}
            Arr = {dynamicArray}
        />
    );

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

    const ErrModal = ({Eflag = false,EMsg = ""}) => {
        setDaybookData((prev) => ({
            ...prev,
            showErrorModal : Eflag,
            errorMessage : EMsg,
        }))
    }

    const showLoader = (loaderFlag) => setDaybookData((prev) => ({...prev,showDaybookLoader:loaderFlag}));

    const handleSubmit = async (values,validateModal) => {
        try {
            setShowBillModal(false);
            if(Number(values.advance_receipt_amount) > values.remaining_balance ) {
                ErrModal({
                    Eflag : true,
                    EMsg : "Given amount should be less than or equal to the Advance Receipt Amount"
                });
                return;

            }
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = values.sales_type === 1 && 
                            validateModal && 
                            (diffInAmount > 10 || diffInAmount < -10);
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            
            showLoader(true);
            
            let newObj = JSON.parse(JSON.stringify(values));
            let convertedObj = convertTONumbers(newObj);

            convertedObj.key = uniqueId;
            convertedObj.bill_no = billNum+"/"+ convertedObj.sales_code+"/"+convertedObj.bill_no;
            convertedObj.pending_balance = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let response = await apiStoreDayBookInfo([convertedObj]);
            if (response.message) {
                dispatch(setShowAddBookPage(false));
                dispatch(setSelectedBookType(null));
                dispatch(setDataSavedModal(true));
                dispatch(setShowDayBookFields(false));
                setBillNum("");
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

  return (
    <Formik
      innerRef={addBookRef}
      initialValues={dayBookIntialObj}
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
                  labelText = "Day"
                  name = "date"
                  ph = "--- Select Day ---"
                  value = {values["date"]}
                  handleChange = {(date, dateString) => setFieldValue("date", dateString)}
                />
                <AntdFormikSelect
                  labelText = "Sale Type"
                  name = "sales_type"
                  ph = "--Select Sale Type--"
                  handleChange = {(name, selectedValue) =>handleChangeSalesType(name, selectedValue)}
                  Arr = {daybooKData.salesType}
                />
                <AntdInput
                  text = "Bill Number"
                  value = "bill_no"
                  ph = "Enter Bill Number"
                  showAddBefore = {true}
                  showAddBeforeValue = {
                    billNum +"/" +(values.sales_code ? values.sales_code + "/" : "")
                  }
                  disableInput = {!values.sales_type}
                />
                {
                    showSelectBox("Customer Type","customer_type","--Select Customer Type--",
                        getCustomerList(daybooKData.customerListInfo, values))
                }
                {
                    showInputBox({
                        label: "Bill Total Value",
                        val: "bill_value",
                        values: values,
                        validation: false, 
                        prefix: true, 
                        onlyNum: true 
                    })
                }
                {
                    showInputBox({
                        label: "Party Code",
                        val: "party_code",
                        values: values,
                    })
                }
                {
                    showInputBox({
                        label: "Party Name",
                        val: "party_name",
                        values: values,
                    })
                }
              </div>
              {values.sales_type === 1 && (
                <>
                    <CashTypes
                        valObj = {values}
                        paymentListInfo = {daybooKData.paymentListInfo}
                        upiTypeInfo = {daybooKData.upiTypeInfo}
                        showReferenceName = {true}
                    />
                    <AdvanceBillDetails 
                        values = {values} 
                    />
                </>
              )}
                <ShowPaymentTypes 
                    paymentValues = {values} 
                />
                <BillAmountModal
                    billModal = {showBillModal}
                    valuesObj = {values}
                    handleSubmitBillModal = {() => handleSubmit(values, false)}
                    handleCancelBillModal = {() => {
                        setShowBillModal(false);
                        setValidateModal(true);
                    }}
                />
            </div>
           
            <div className="flex flex-row-reverse items-center gap-10 p-4">
                <CButton 
                    btnType = "submit"
                > 
                    Save
                </CButton>
                <CButton
                    onClick = {() => {
                        // dispatch(setSelectedBookType(null));
                        // dispatch(setShowAddBookPage(false));
                        dispatch(setShowDayBookFields(false));
                        setDaybookData({ 
                            ...daybooKData,
                            showErrorModal : false,
                            errorMessage : ""
                        });
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
  );
};

export default AddDaybook;
