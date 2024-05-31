
import React, { useEffect, useState,memo } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import { DaysArr,selectedValType } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setShowUploadInvoice
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import {
    apiGetCustomerTypeInfo,
    apiGetPaymentTypeInfo,
    apiGetSalesTypeInfo,
    apiGetUPITypeInfo,
    apiStoreDayBookInfo,
    apiVerifyAdvancedBookReceipt,
    apiGetTerminal,
} from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import { getTotalMoneyInDayBook } from "./CompConstants";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { dayBookIntialObj } from "../intialValuesFol";
import UploadInvoiceModal from "./DayBookFiles/UploadInvoiceModal";
import { DayBookValidations } from "../../Validations";
import CashTypes from "./DayBookFiles/CashTypes";
import AdvanceBillDetails from "./DayBookFiles/AdvanceBillDetails";
import DaybookTable from "../../components/ui/DaybookTable";

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />
)

const daybookColumns = [
    { id: "Bill_No", name: "Bill No" },
    { id: "date", name: "Date" },
    { id: "Customer_Type", name: "Customer Type" },
    { id: "Bill_Value", name: "Bill Value" },
    { id: "Cash_Amount", name: "Cash" },
    { id: "UPI_Type", name: "UPI Type" },
    { id: "UPI_Amount", name: "UPI Amount" },
    { id: "Debit_Card_Amount", name: "Debit Card" },
    { id: "Credit_Card_Amount", name: "Credit Card" },
    { id: "Online_Bank_Amount", name: "Bank" },
    { id: "Bank_Cheque_Amount", name: "Cheque" },
    { id: "Advance_Receipt_Amount", name: "Advanced Receipt Amount" },
];

const DayBookModal = (props) => {

    const { showDaybookModal,onCancel } = props;
    const dispatch = useDispatch();
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
    const [excelData,setExcelData] = useState([]);
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
   
    
    const handleSubmit = async (values,validateModal) => {
        try {
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

    // if(excelData.length <= 0) {
    //     console.log("TEST")
    //     return  <div className="mt-10">
    //     <CustomizedTable
    //         data={[]}
    //         columns={daybookColumns}
    //         // handleEditClick={handleEditClick}
    //         // handleDeleteClick={handleDeleteClick}
    //     />
    // </div>
    // } 
 
    return ( showdayBookFields ?
        <>
            <Formik
                initialValues={dayBookIntialObj}
                validationSchema={DayBookValidations}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values,validateModal)
                }}
                style={{ overflow: "auto" }}
            >
                {({setFieldValue, values}) => {
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
                                    showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", getCustomerList(customerListInfo,values), setFieldValue)
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
                                        paymentListInfo = {paymentListInfo}
                                        upiTypeInfo = {upiTypeInfo}
                                    />
                                    
                                    <AdvanceBillDetails values = {values}/>
    
                                </>
                            }
                            
                           
                            <ShowPaymentTypes paymentValues = {values}/>
                            <BillAmountModal 
                                billModal = {showBillModal}
                                valuesObj = {values}
                                handleSubmitBillModal = {() =>handleSubmit(values,false)}
                                handleCancelBillModal = {() =>{setShowBillModal(false);setValidateModal(true)}}
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
           
            <Loader showLoading={showLoader} />
            
        </> : showUploadInvoice ? <UploadInvoiceModal onClose={handleCloseInvoiceModal}/> : null
    )
}

export default memo(DayBookModal);

