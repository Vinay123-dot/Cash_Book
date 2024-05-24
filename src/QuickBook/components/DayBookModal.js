
import React, { useEffect, useState,memo } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CButton from "../../components/ui/Button";
import { DaysArr,selectedValType } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import PaymentSelect from "../../components/ui/PaymentSelect/PaymentSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import { AiOutlineDelete } from "react-icons/ai";
import {
    apiGetCustomerTypeInfo,
    apiGetPaymentTypeInfo,
    apiGetSalesTypeInfo,
    apiGetUPITypeInfo,
    apiStoreDayBookInfo,
    apiVerifyAdvancedBookReceipt,
    apiGetTerminal
} from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import { getTotalMoneyInDayBook } from "./CompConstants";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { dayBookIntialObj } from "../intialValuesFol";
import UploadInvoiceModal from "./DayBookFiles/UploadInvoiceModal";



const validationSchema = Yup.object().shape({
    date: Yup.string().required('This field is required.'),
    sales_type: Yup.string().required('This field is required.'),
    bill_no: Yup.string().required('This field is required.'),
    customer_type: Yup.string().required('This field is required.'),
    bill_value: Yup.string().required('This field is required.'),
    party_code: Yup.string().required('This field is required.'),
    party_name: Yup.string().required('This field is required.'),
    // advance_receipt_no: Yup.string().required('This field is required.'),
});


const iconStyle = { color: "red", width: 20, height: 20, position: "absolute", right: 10, bottom: 5 };

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />
)

const DayBookModal = (props) => {

    const { showDaybookModal,onCancel } = props;
    const dispatch = useDispatch();
    const [clickCount, setClickCount] = useState([0]);
    const [salesType, setSalesType] = useState([]);
    const [paymentListInfo, setPaymentListInfo] = useState([]);
    const [upiTypeInfo, setUpiTypeInfo] = useState([]);
    const [customerListInfo, setCustomerListInfo] = useState([]);
    const [showBillModal,setShowBillModal] = useState(false);
    const [showLoader,setShowLoader] = useState(false);
    const [billNum,setBillNum] = useState("");
    const [verifyBtnLdng,setVerifyBtnLdng] = useState(false);
    const showdayBookFields = useSelector(state => state.quickbookStore.state.showdayBookFields);
    const showUploadInvoice = useSelector(state => state.quickbookStore.state.showUploadInvoice);
    const [validateModal,setValidateModal] = useState(true);
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        getTerminal();
        fetchReqTypesInDayBook();
    }, []);

    const fetchReqTypesInDayBook = async() => {
        try{
            const [salesList,paymentArray,upiArray,customerArr] = await Promise.all([
                apiGetSalesTypeInfo(),apiGetPaymentTypeInfo(),
                apiGetUPITypeInfo(),apiGetCustomerTypeInfo()
            ]);
            setSalesType(salesList?.data || []);
            setPaymentListInfo(paymentArray?.data || []);
            setUpiTypeInfo(upiArray?.data || []);
            setCustomerListInfo(customerArr?.data || []);
        }catch(e){}
    }
    
    const getTerminal = async() => {
        try{
            let response = await apiGetTerminal(uniqueId);
            setBillNum(response?.[0]?.Sequence_No);
        }
        catch(e){}
    }

    if (!showDaybookModal) return null;

    const handleButtonClick = (setFieldValue) => {
        if (clickCount.length > 4) return;
        setFieldValue(`paymentType${clickCount.length}`,null);
        setClickCount(prevCount => [...prevCount, clickCount.length]);
    };

    const handleRemoveFromList = (selectedItem,setFieldValue,valObj) => {
        setFieldValue(`paymentType${selectedItem}`,null);
        let selectedVal = valObj?.[`paymentType${selectedItem}`];
        if(selectedVal === "UPI"){
            setFieldValue("upi_amount",null);
            setFieldValue("upi_type",null);
        }
        if (selectedVal === "Cash"){
            setFieldValue("cash_amount",null);
        }
        if(selectedVal === "Bank"){
            setFieldValue("online_bank_amount",null);
            setFieldValue("online_bank_name","");
            setFieldValue("online_bank_trans_no","");
        }
        if(selectedVal === "Cheque"){
            setFieldValue("bank_cheque_amount",null);
            setFieldValue("bank_cheque_name","");
            setFieldValue("bank_cheque_no","");
        }
        if(selectedVal === "Credit Card"){
            setFieldValue("credit_card_amount",null)
        }
        if(selectedVal === "Debit Card"){
            setFieldValue("debit_card_amount",null)
        }

        let filteredCount = clickCount.filter(item => item !== selectedItem);
        setClickCount(JSON.parse(JSON.stringify(filteredCount)));
    }

    const convertTONumbers = (newObj) => {

        newObj.bill_value = Number(newObj.bill_value);
        newObj.cash_amount = Number(newObj.cash_amount);
        newObj.credit_card_amount = Number(newObj.credit_card_amount);
        newObj.debit_card_amount = Number(newObj.debit_card_amount);
        newObj.bank_cheque_amount = Number(newObj.bank_cheque_amount);
        newObj.online_bank_amount = Number(newObj.online_bank_amount);
        newObj.upi_amount = Number(newObj.upi_amount);
        return newObj;
    }
    //conditions
        //if sales_type is 2 ,check whather it's going to if or not.
        //if sales_type is 1 ,check validatemodal
        console.log("v_outside",validateModal);
    const handleSubmit = async (values,validateModal) => {
        console.log("v",validateModal);
        try {
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            console.log("diffAmount..",diffInAmount);
            let modalFlag = values.sales_type === 1 && validateModal && (diffInAmount > 10 || diffInAmount < -10);
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            setShowLoader(true);
            let newObj = JSON.parse(JSON.stringify(values));
            let convertedObj = convertTONumbers(newObj);

            convertedObj.key = uniqueId;
            convertedObj.bill_no = billNum+"/"+ convertedObj.sales_code+"/"+convertedObj.bill_no;
            convertedObj.pending_balance = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let response = await apiStoreDayBookInfo([convertedObj]);
            if (response.message) {
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                setBillNum("");
                setValidateModal(true);
            }
            setShowLoader(false);
        } catch (e) {
            setShowLoader(false);
            setValidateModal(true);
        }
    }

    const validatePaymentType = (value) => {
        let error;
        if (!value) {
            error = 'This field is required';
        }
        return error;
    }
    const validateInputField = (value, allValues, type) => {
        const {
            paymentType0: P0, paymentType1: P1,
            paymentType2: P2, paymentType3: P3,
            paymentType4: P4, paymentType5: P5
        } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
        let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This field is required' : null
        // let err =  !value ? 'This Field is Required' : null
        return err;

    }

    const validateReasonField = (value,allValues) => {
        let diffInAmount = Number(allValues.bill_value) - getTotalMoneyInDayBook(allValues);
        let err = (diffInAmount > 10 || diffInAmount < -10) && !value ? 'This field is required' : null;
        return err;
    }

    const validateUpiType = (value, allValues) => {
        const {
            paymentType0: P0, paymentType1: P1,
            paymentType2: P2, paymentType3: P3,
            paymentType4: P4, paymentType5: P5
        } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
        let error = (paymentTypeArr.includes("UPI") && !value) ? 'This field is required' : null
        return error;

    }

    const handleChangeSalesType = (name,sValue,setFieldValue,sArr) => {
        setFieldValue(name,sValue);
        let salesObj = sArr.find((eachDoc) => eachDoc.Id === sValue);
        setFieldValue("sales_code",salesObj?.Code || "");
        let temp = [];
        if (sValue == 1) {
            temp = paymentListInfo.filter((eachDoc) => eachDoc.Id != 4);
        } else {
            temp = JSON.parse(JSON.stringify(paymentListInfo));
        }
        setPaymentListInfo(temp);
    }

    const handleVerifyAdvanceMoney = async(allVal,setFieldValue) => {
        const {advance_receipt_no} = allVal;
        if(!advance_receipt_no) return console.log("test")
            setVerifyBtnLdng(true);
            const data = {
                key : uniqueId,
                id : advance_receipt_no
            };
        let response = await apiVerifyAdvancedBookReceipt(data);
        setFieldValue("advance_receipt_amount",response?.Bill_Value || 0);
        setFieldValue("advance_customer_name",response?.Customer_Name || "");
        setVerifyBtnLdng(false);
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
 
    return ( showdayBookFields ?
        <>
            <Formik
                initialValues={dayBookIntialObj}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values,validateModal)
                }}
                style={{ overflow: "auto" }}
            >
                {({ errors, touched, isSubmitting, setFieldValue, values, setErrors }) => {
                    return (
                        <Form>
                            <ParagraphTag label="Details" />
                            <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                                {
                                    showSelectBox("Day", "date", "--Select Day--", DaysArr, setFieldValue)
                                }
                                <AntdFormikSelect
                                    labelText = "Sale Type"
                                    name = "sales_type"
                                    ph = "--Select Sale Type--"
                                    handleChange={(name, selectedValue) => handleChangeSalesType(name,selectedValue,setFieldValue,salesType)}
                                    Arr={salesType}
                                />
                                <AntdInput
                                    text="Bill Number"
                                    value='bill_no'
                                    ph="Enter Bill Number"
                                    showAddBefore = {true}
                                    showAddBeforeValue = {
                                        billNum+"/"+ (values.sales_code?values.sales_code+"/":"")
                                    }
                                    disableInput = {!values.sales_type && true}
                                />
                                {
                                    showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", customerListInfo, setFieldValue)
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
                                    <hr style={{ border: "5px solid #F4F6F9" }} />
    
                                    <div className="flex items-center mt-5">
                                        <ParagraphTag label="Payment Details" />
                                        <CButton onClick={()=>handleButtonClick(setFieldValue)}>Add</CButton>
    
                                    </div>
                                    {clickCount.map((eachItem, index) => (
                                        <div
                                            className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2"
                                            key={index}
                                        >
                                            <PaymentSelect
                                                labelText="Payment Type"
                                                name={`paymentType${eachItem}`}
                                                ph="--Select PaymentType--"
                                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                                outputObj = {values}
                                                Arr={paymentListInfo}
                                                validation={true}
                                                validateField={validatePaymentType}
                                                key={index}
                                            />
    
                                            {
                                                values[`paymentType${eachItem}`] === "UPI" &&
                                                <AntdFormikSelect
                                                    labelText="UPI Type"
                                                    name="upi_type"
                                                    ph="--Select UPI Type--"
                                                    handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                                    Arr={upiTypeInfo}
                                                    validation={true}
                                                    validateField={(value) => validateUpiType(value, values)}
    
                                                />
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "UPI" &&
                                                <div className="col-span-1  flex flex-row relative items-center">
                                                    {
                                                        showInputBox("Enter Amount", 'upi_amount', "Amount", validateInputField, values)
                                                    }
                                                    {
                                                        index !== 0 &&
                                                        <AiOutlineDelete
                                                            style={iconStyle}
                                                            onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)}
                                                        />
                                                    }
                                                </div>
                                            }
    
                                            {
                                                values[`paymentType${eachItem}`] === "Cash" &&
                                                <div className="col-span-2  flex flex-row relative items-center">
                                                    {
                                                        showInputBox("Enter Amount", 'cash_amount', "Amount", validateInputField, values)
                                                    }
                                                    {
                                                        index !== 0 &&
                                                        <AiOutlineDelete
                                                            style={iconStyle}
                                                            onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)}
                                                        />
                                                    }
                                                </div>
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Bank" &&
                                                showInputBox("Enter Amount", 'online_bank_amount', "Amount", validateInputField, values)
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Bank" &&
                                                showInputBox("UTR Number", 'online_bank_trans_no', "UTR Number", validateInputField, values,true,false,false)
    
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Bank" &&
                                                <div className="col-span-3  flex flex-row relative items-center">
                                                    {
                                                        showInputBox("Bank Name", "online_bank_name", "Bank Name", validateInputField, values,true,false,false)
                                                    }
                                                    {
                                                        index !== 0 &&
                                                        <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
                                                    }
                                                </div>
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Cheque" &&
                                                showInputBox("Amount", "bank_cheque_amount", "Amount", validateInputField, values)
    
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Cheque" &&
                                                showInputBox("Cheque Number", "bank_cheque_no", "Cheque Number", validateInputField, values, true, false, false)
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Cheque" &&
                                                <div className="col-span-3  flex flex-row relative items-center">
                                                    {
                                                        showInputBox("Bank", "bank_cheque_name", "Bank Name", validateInputField, values, true, false, false)
                                                    }
                                                    {
                                                        index !== 0 &&
                                                        <AiOutlineDelete
                                                            style={iconStyle}
                                                            onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)}
                                                        />
                                                    }
                                                </div>
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Credit Card" &&
                                                <div className="col-span-2  flex flex-row relative items-center">
                                                    {
                                                        showInputBox("Amount", "credit_card_amount", "Amount", validateInputField, values)
                                                    }
                                                    {
                                                        index !== 0 &&
                                                        <AiOutlineDelete
                                                            style={iconStyle}
                                                            onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)}
                                                        />
                                                    }
                                                </div>
                                            }
                                            {
                                                values[`paymentType${eachItem}`] === "Debit Card" &&
                                                <div className="col-span-2 flex flex-row relative items-center">
                                                    {
                                                        showInputBox("Amount", "debit_card_amount", "Amount", validateInputField, values)
                                                    }
                                                    {
                                                        index !== 0 &&
                                                        <AiOutlineDelete
                                                            style={iconStyle}
                                                            onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)}
                                                        />
                                                    }
                                                </div>
                                            }
                                        </div>
                                    ))
                                    }
                                    <div
                                        className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2"
                                    >
                                    {
                                        showInputBox("Reason", 'reason', "Reason", validateReasonField, values,true,false,false)
                                    }
    
                                    </div>
                                    
                                    <hr style={{ border: "5px solid #F4F6F9" }} />
                                    <ParagraphTag label="Advance Bill Details" />
                                    <div className="flex px-4 py-2 items-center">
                                        {
                                            showInputBox("Advance Receipt Number", 'advance_receipt_no', "AdvanceReceiptNumber", validateInputField, values, false, false, false)
                                        }
                                        <CButton
                                            className="h-44 mt-10 ml-10"
                                            isLoading={verifyBtnLdng}
                                            onClick={() => handleVerifyAdvanceMoney(values, setFieldValue)}
                                        >
                                            Verify
                                        </CButton>
                                    </div>
                                    {
                                        values.advance_receipt_no &&
                                        <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
                                            <div className="flex flex-col">
                                                <p>Advance Receipt Amount</p>
                                                <p>{values.advance_receipt_amount}</p>
                                            </div>
                                            <div>
                                                <p>Customer Name</p>
                                                <p>{values.advance_customer_name}</p>
                                            </div>
                                            {
                                                showInputBox("Amount", 'used_receipt_amount', "Amount", validateInputField, values, false, false, false)
                                            }
                                        </div>
                                    }
    
    
                                </>
                            }
                            
                           
                            <ShowPaymentTypes paymentValues = {values}/>
                            <BillAmountModal 
                                billModal = {showBillModal} 
                                valuesObj = {values}
                                handleCancelBillModal = {() =>{setShowBillModal(false);setValidateModal(false)}}
                            />
                           
    
                            <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                                <CButton btnType="submit">
                                    Save
                                </CButton>
                                <CButton onClick={() => {
                                    onCancel();
                                    dispatch(setShowAddBookPage(false))
                                }} type="cancel"
                                >
                                    Cancel
                                </CButton>
                            </div>
    
                        </Form>
                    )
                }}
    
    
            </Formik>
            
            {
                showLoader && <Loader showLoading={true} />
            }
        </> : showUploadInvoice ? <UploadInvoiceModal/> : null
    )
}

export default memo(DayBookModal);

