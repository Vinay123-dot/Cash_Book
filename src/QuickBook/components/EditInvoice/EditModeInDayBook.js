
import React, { useState,memo } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../../components/ui/Button";
import { DaysArr,selectedValType } from "../../../Constants";
import AntdFormikSelect from "../../../components/ui/AntdFormikSelect";
import AntdInput from "../../../components/ui/AntdInput";
import { useDispatch,useSelector } from "react-redux";
import {
    setCommonCashBalance,
    setShowUploadInvoice,
    setRemainingCommonBalance,
    setPettyCashBalance,
    setPettyCashRemainingBalance
} from '../../store/stateSlice';
import ParagraphTag from "../../../constants/PTag";
import {
    apiStoreDayBookInfo,
    apiGetCommonOpeningBalance,
    apiGetRemainingCashBalance,
    apiGetPettyCashCommonBalance,
    apiGetPettyCashRemainingBalance
} from "../../../services/TransactionService";
import Loader from "../../../components/shared/Loader";
import { getTotalMoneyInDayBook,convertTONumbers, verifyInputField } from "../CompConstants";
import ShowPaymentTypes from "../DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "../DayBookFiles/BillAmountModal";
import { DayBookValidations } from "../../../Validations";
import CashTypes from "../DayBookFiles/CashTypes";
import AdvanceBillDetails from "../DayBookFiles/AdvanceBillDetails";
import Modal from "../../../components/shared/Modal";
import { getToday } from "../../../utils/dateFormatter";
import AntdDaySelect from "../../../components/ui/AntdDaySelect";
import ErrorModal from "../../../components/ui/ErrorModal";

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdDaySelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />
)


const EditModalInDayBook = (props) => {

    const { editDayBookObj,
            isEditDayBookModal,
            handleCancelDBook,
            handleSaveEditDayBook,
        } = props;
    const dispatch = useDispatch();
    const {
        paymentTypeInfo,
        upiTypeInfo,
        customerListInfo,
        salesType

    } = useSelector(state => state.quickbookStore.state);
    const [showBillModal,setShowBillModal] = useState(false);
    const [showLoader,setShowLoader] = useState(false);
    const [validateModal,setValidateModal] = useState(true);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    let uniqueId = localStorage.getItem("uniqueId");

  

    if (!isEditDayBookModal) return null;

    
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
     
    const handleSubmit = async (values,validateModal) => {
        try {
            if(Number(values.advance_receipt_amount) > values.remaining_balance ) {
                setEModal({
                    eMessage : "Given amount should be less than or equal to the Advance Receipt Amount",
                    show : true
                })
                return;

            }
            setShowBillModal(false);
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = values.sales_type === 1 && validateModal && (diffInAmount > 10 || diffInAmount < -10);
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            setShowLoader(true);
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
                setEModal({
                    eMessage : "",
                    show : false
                })
            }
            setShowLoader(false);
        } catch (Err) {
            setEModal({
                eMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show : true
            })
            setShowLoader(false);
            setValidateModal(true);
        }
    }

    const validateInputField = (value, allValues, type) =>  verifyInputField(value, allValues, type);

    const handleChangeSalesType = (name,sValue,setFieldValue,sArr) => {
        setFieldValue(name,sValue);
        let salesObj = sArr.find((eachDoc) => eachDoc.Id === sValue);
        setFieldValue("sales_code",salesObj?.Code || "");
        let temp = [];
        if (sValue == 1) {
            temp = paymentTypeInfo.filter((eachDoc) => eachDoc.Id != 4);
        } else {
            temp = JSON.parse(JSON.stringify(paymentTypeInfo));
        }
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

    const showInputBox = (txt, val, placeHolder, func, values, validation = true, prefix = true, onlyNum = true) => {
        return (
            <AntdInput
                text={txt}
                value={val}
                ph={placeHolder}
                showPrefix={prefix}
                acceptOnlyNum={onlyNum}
                validation={validation}
                validateField={(value) => func(value, values, val)}
            />
        )
    }

    const handleCloseInvoiceModal = () => {
        dispatch(setShowUploadInvoice(false))
    }

    const onEModalCancel = () => {
        setEModal({
            show : false,
            eMessage : ""
        })
    }
   
    return (
        <Modal openModal={true} height={"90%"} width={"90%"}  ai = {null}>
            <>
                <Formik
                    initialValues = {editDayBookObj}
                    validationSchema = {DayBookValidations}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values, validateModal)
                    }}
                    
                >
                    {({ setFieldValue, values }) => {
                        return (
                            <Form style={{ overflow: "auto"}}>
                                <ParagraphTag label="Details" />
                                <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                                    {
                                        showSelectBox("Day", "date", "--Select Day--", DaysArr, setFieldValue)
                                    }
                                    <AntdFormikSelect
                                        labelText = "Sale Type"
                                        name = "sales_type"
                                        ph = "--Select Sale Type--"
                                        handleChange = {(name, selectedValue) => handleChangeSalesType(name, selectedValue, setFieldValue, salesType)}
                                        Arr = {salesType}
                                    />
                                    <AntdInput
                                        text="Bill Number"
                                        value='bill_no'
                                        ph="Enter Bill Number"
                                        showAddBefore={true}
                                        disableInput={true}
                                    />
                                    {
                                        showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", getCustomerList(customerListInfo, values), setFieldValue)
                                    }
                                    {
                                        showInputBox("Bill Total Value", 'bill_value', "Bill TotalValue", validateInputField, values, false, true, true)
                                    }
                                    {
                                        showInputBox("Party Code", 'party_code', "PartyCode", validateInputField, values, false, false, false)
                                    }
                                    {
                                        showInputBox("Party Name", 'party_name', "Party Name", validateInputField, values, false, false, false)
                                    }
                                </div>
                                {
                                    values.sales_type === 1 &&
                                    <>
                                        <CashTypes
                                            setFieldValue = {setFieldValue}
                                            valObj = {values}
                                            paymentListInfo = {paymentTypeInfo}
                                            upiTypeInfo = {upiTypeInfo}
                                        />

                                        <AdvanceBillDetails values={values} />

                                    </>
                                }


                                <ShowPaymentTypes paymentValues={values} />
                                <BillAmountModal
                                    billModal={showBillModal}
                                    valuesObj={values}
                                    handleSubmitBillModal={() => handleSubmit(values, false)}
                                    handleCancelBillModal={() => { setShowBillModal(false); setValidateModal(true) }}
                                />


                                <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                                    <CButton btnType="submit">
                                        Save
                                    </CButton>
                                    <CButton onClick={() => {
                                        setEModal({
                                            eMessage : "",
                                            show : false
                                        })
                                        handleCancelDBook();
                                        // dispatch(setShowAddBookPage(false))
                                    }} type="cancel"
                                    >
                                        Cancel
                                    </CButton>
                                </div>

                            </Form>
                        )
                    }}
                </Formik>
                <Loader showLoading={showLoader} />
                { 
                    eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}/>
                }

            </>

        </Modal>
    )
}

export default memo(EditModalInDayBook);

