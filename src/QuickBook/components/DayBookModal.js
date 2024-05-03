
import React, { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CButton from "../../components/ui/Button";
import { DaysArr } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import PaymentSelect from "../../components/ui/PaymentSelect/PaymentSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
} from '../store/stateSlice';
import Modal from "../../components/shared/Modal";
import ParagraphTag from "../../constants/PTag";
import { AiOutlineDelete } from "react-icons/ai";
import {
    apiGetCustomerTypeInfo,
    apiGetDayInfo,
    apiGetPaymentTypeInfo,
    apiGetSalesTypeInfo,
    apiGetUPITypeInfo,
    apiStoreDayBookInfo,
    apiVerifyAdvancedBookReceipt
} from "../../services/TransactionService";
import { getTotalMoney} from "./CompConstants";



const validationSchema = Yup.object().shape({
    date: Yup.string().required('This field is required.'),
    sales_type: Yup.string().required('This field is required.'),
    bill_no: Yup.string().required('This field is required.'),
    customer_type: Yup.string().required('This field is required.'),
    bill_value: Yup.string().required('This field is required.'),
    // advance_receipt_no: Yup.string().required('This field is required.'),


});
const iconStyle = {color:"red",width:20,height:20,position: "absolute", right: 10 };
const selectedValType = {
    "cash_amount": "Cash",
    "upi_amount": "UPI",
    "upi_type": "UPI",
    "online_bank_amount": "Bank",
    "online_bank_trans_no": "Bank",
    "online_bank_name": "Bank",
    "bank_cheque_amount": "Cheque",
    "bank_cheque_no": "Cheque",
    "bank_cheque_name": "Cheque",
    "credit_card_amount": "Credit Card",
    "debit_card_amount": "Debit Card"
}


const initialObj = {
    Terminal_Id: 1720, //NOT REQUIRED FROM HERE
    Merchant_Id: 554, //NOT REQUIRED FROM HERE
    id: 0,
    advance_customer_name: "", //string
    advance_receipt_amount: null, //number
    used_receipt_amount : null,
    advance_receipt_no: "", //string
    date: null, //string
    customer_type: null, //string //CONVERTING
    bill_value: null, //number //CONVERTING
    bill_no: "", //string Ex: 8974759759
    pending_balance: 0, //number
    paymentType0: null,

    upi: "", //string newly added from here //UPI DETAILS
    upi_amount: null, //number
    upi_type: null, //string
    upi_trans_no: "", //DOUBT

    sales_code: null, //string //DOUBT SALES CODE
    sales_type: null, //stirng

    cash: "", //CASH DETAILS (string why this)
    cash_amount: null, //number

    debit_card: "", //DEBIT CARD DETAILS (string why this)
    debit_card_amount: null, //number

    credit_card: "",  //(string why this)
    credit_card_amount: null, //number

    bank_cheque: "",   //(string why this)
    bank_cheque_amount: null, //number
    bank_cheque_name: "", //string
    bank_cheque_no: "", //string

    online_bank: "", //(string Why this)
    online_bank_amount: null,
    online_bank_name: "", //string
    online_bank_trans_no: "", //string


};

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
    const [intialValues, setIntialValues] = useState({ ...initialObj });
    const [salesType, setSalesType] = useState([]);
    const [paymentListInfo, setPaymentListInfo] = useState([]);
    const [upiTypeInfo, setUpiTypeInfo] = useState([]);
    const [customerListInfo, setCustomerListInfo] = useState([]);
    const [showBillModal,setShowBillModal] = useState(false);

    useEffect(() => {
        getSalesType();
        getPaymentTypeInfo();
        getUpiTypeInfo();
        getCustomerTypeInfo();
    }, [])

    const getSalesType = async () => {
        try {
            let response = await apiGetSalesTypeInfo();
            setSalesType(response?.data || []);
        } catch (e) { }
    }



    const getPaymentTypeInfo = async () => {
        try {
            let response = await apiGetPaymentTypeInfo();
            setPaymentListInfo(response?.data || []);
        } catch (e) { }
    }

    const getUpiTypeInfo = async () => {
        try {
            let response = await apiGetUPITypeInfo();
            setUpiTypeInfo(response?.data || []);
        } catch (e) { }
    }

    const getCustomerTypeInfo = async () => {
        try {
            let response = await apiGetCustomerTypeInfo();
            setCustomerListInfo(response?.data || []);
        } catch (e) { }
    }

    if (!showDaybookModal) return null;



    const handleButtonClick = (setFieldValue) => {

        if (clickCount.length > 5) return;
        // intialValues[`paymentType${clickCount.length}`] = null;
        // setIntialValues(intialValues);
        setFieldValue(`paymentType${clickCount.length}`,null);
        setClickCount(prevCount => [...prevCount, clickCount.length]);
    };

    const handleRemoveFromList = (selectedItem,setFieldValue,valObj) => {
        let selectedVal = valObj?.[`paymentType${selectedItem}`];
        if(selectedVal === "UPI"){
            
            setFieldValue("upi_amount",null);
            setFieldValue("upi_type",null);
        }
        if(selectedVal === "Cash"){
            console.log("TEST")
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
        setFieldValue(`paymentType${selectedItem}`,null);
        // const updatedInitialValues = { ...intialValues };
        // delete updatedInitialValues[`paymentType${selectedItem}`];
        clickCount.splice(selectedItem, 1);
        setClickCount(JSON.parse(JSON.stringify(clickCount)));
        // setIntialValues(JSON.parse(JSON.stringify(updatedInitialValues)));
    }
// console.log("INTIALVALIES",intialValues)
    const handleSubmit = async (values) => {
        try {
            if(values.sales_type === 1 && Number(values.bill_value) != getTotalMoney(values)){
                setShowBillModal(true);
                return;
            }
            let newObj = JSON.parse(JSON.stringify(values));
            let customerType = customerListInfo.find((eachDoc) => eachDoc.Id === newObj.customer_type);
            let salesObj = salesType.find((eachDoc) => eachDoc.Id === newObj.sales_type);
            let upiObj = upiTypeInfo.find((eachItem) => eachItem.Id === newObj?.upi_type);

            newObj.bill_value = Number(newObj.bill_value);
            newObj.cash_amount = Number(newObj.cash_amount);
            newObj.credit_card_amount = Number(newObj.credit_card_amount);
            newObj.debit_card_amount = Number(newObj.debit_card_amount);
            newObj.bank_cheque_amount = Number(newObj.bank_cheque_amount);
            newObj.online_bank_amount = Number(newObj.online_bank_amount);
            newObj.upi_amount = Number(newObj.upi_amount);
            newObj.customer_type = customerType?.Type || "";
            newObj.sales_type = salesObj?.Type || "";
            newObj.sales_code = salesObj?.Code || "";
            newObj.upi_type = upiObj?.Type || "";


            let response = await apiStoreDayBookInfo([newObj]);
            if (response.message) {
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));

            }

        } catch (e) {

        }
    }

    const validatePaymentType = (value) => {
        let error;
        if (!value) {
            error = 'This Field is Required';
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
        let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This Field is Required' : null
        // let err =  !value ? 'This Field is Required' : null
        return err;

    }

    const validateUpiType = (value, allValues) => {
        const {
            paymentType0: P0, paymentType1: P1,
            paymentType2: P2, paymentType3: P3,
            paymentType4: P4, paymentType5: P5
        } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
        let error = (paymentTypeArr.includes("UPI") && !value) ? 'This Field is Required' : null
        return error;

    }


    return ( <>
        <Formik
            initialValues={initialObj}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values)
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
                            {
                                showSelectBox("Sale Type", "sales_type", "--Select Sale Type--", salesType, setFieldValue)
                            }
                            <AntdInput
                                text="Bill Number"
                                value='bill_no'
                                ph="Enter Bill Number"
                            />
                            {
                                showSelectBox("Party Code", "customer_type", "--Select PartyCode--", customerListInfo, setFieldValue)
                            }
                            <AntdInput
                                text="Bill Total Value"
                                value='bill_value'
                                ph="Enter Bill TotalValue"
                                showPrefix={true}
                                acceptOnlyNum={true}
                            />
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
                                                <AntdInput
                                                    text="Enter Amount"
                                                    value='upi_amount'
                                                    ph="Enter Amount"
                                                    showPrefix={true}
                                                    acceptOnlyNum={true}
                                                    validation={true}
                                                    validateField={(value) => validateInputField(value, values, "upi_amount")}
                                                />
                                                 {
                                                index != 0 && 
                                                <AiOutlineDelete style = {iconStyle} onClick = {()=>handleRemoveFromList(eachItem,setFieldValue,values)}/>
                                               }
                                            </div>
                                        }

                                        {
                                            values[`paymentType${eachItem}`] === "Cash" &&
                                            <div className="col-span-2  flex flex-row relative items-center">
                                                <AntdInput
                                                    text="Enter Amount"
                                                    value='cash_amount'
                                                    ph="Enter Amount"
                                                    showPrefix={true}
                                                    acceptOnlyNum={true}
                                                    validation={true}
                                                    validateField={(value) => validateInputField(value, values, "cash_amount")}
                                                />
                                                 {
                                                index != 0 && 
                                                <AiOutlineDelete style = {iconStyle} onClick = {()=>handleRemoveFromList(eachItem,setFieldValue,values)}/>
                                               }
                                            </div>


                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Bank" &&
                                            <AntdInput
                                                text="Enter Amount"
                                                value='online_bank_amount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                validation={true}
                                                acceptOnlyNum={true}
                                                validateField={(value) => validateInputField(value, values, "online_bank_amount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Bank" &&
                                            <AntdInput
                                                text="UTR Number"
                                                value='online_bank_trans_no'
                                                ph="Enter UTR Number"
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "online_bank_trans_no")}
                                            />

                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Bank" &&
                                            <div className="col-span-3  flex flex-row relative items-center">
                                                <AntdInput
                                                    text="Bank Name"
                                                    value='online_bank_name'
                                                    ph="Enter BankName"
                                                    validation={true}
                                                    validateField={(value) => validateInputField(value, values, "online_bank_name")}
                                                />
                                                {
                                                index != 0 && 
                                                <AiOutlineDelete style = {iconStyle} onClick = {()=>handleRemoveFromList(eachItem,setFieldValue,values)}/>
                                               }
                                            </div>


                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Cheque" &&
                                            <AntdInput
                                                text="Amount"
                                                value='bank_cheque_amount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                acceptOnlyNum={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "bank_cheque_amount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Cheque" &&
                                            <AntdInput
                                                text="Cheque Number"
                                                value='bank_cheque_no'
                                                ph="Enter CheckNumber"
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "bank_cheque_no")}
                                            />

                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Cheque" &&
                                            <div className="col-span-3  flex flex-row relative items-center">
                                                <AntdInput
                                                    text="Bank"
                                                    value='bank_cheque_name'
                                                    ph="Enter BankName"
                                                    validation={true}
                                                    validateField={(value) => validateInputField(value, values, "bank_cheque_name")}
                                                />
                                                {
                                                index != 0 && 
                                                <AiOutlineDelete style = {iconStyle} onClick = {()=>handleRemoveFromList(eachItem,setFieldValue,values)}/>
                                               }
                                            </div>
                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Credit Card" &&
                                            <div className="col-span-2  flex flex-row relative items-center">
                                                <AntdInput
                                                    text="Enter Amount"
                                                    value='credit_card_amount'
                                                    ph="Enter Amount"
                                                    showPrefix={true}
                                                    validation={true}
                                                    validateField={(value) => validateInputField(value, values, "credit_card_amount")}
                                                />
                                                {
                                                index != 0 && 
                                                <AiOutlineDelete style = {iconStyle} onClick = {()=>handleRemoveFromList(eachItem,setFieldValue,values)}/>
                                               }
                                            </div>


                                        }
                                        {
                                            values[`paymentType${eachItem}`] === "Debit Card" &&
                                            <div className="col-span-2  flex flex-row relative items-center">
                                                <AntdInput
                                                    text="Enter Amount"
                                                    value='debit_card_amount'
                                                    ph="Enter Amount"
                                                    showPrefix={true}
                                                    validation={true}
                                                    validateField={(value) => validateInputField(value, values, "debit_card_amount")}
                                                />
                                               {
                                                index != 0 && 
                                                <AiOutlineDelete style = {iconStyle} onClick = {()=>handleRemoveFromList(eachItem,setFieldValue,values)}/>
                                               }
                                            </div>
                                        }
                                    </div>
                                    ))
                                }

                                <hr style={{ border: "5px solid #F4F6F9" }} />
                                <ParagraphTag label="Advanced Bill Details" />
                                <div className="flex px-4 py-2 items-center">
                                    <AntdInput
                                        text="Advance Receipt Number"
                                        value='advance_receipt_no'
                                        ph="Enter AdvanceReceiptNumber"
                                    />
                                    <CButton className="h-44 mt-5 ml-10" >
                                        Verify
                                    </CButton>


                                </div>
                                {
                                    values.advance_receipt_no &&
                                    <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="flex flex-col">
                                            <p>Advanced Receipt Amount</p>
                                            <p>{"values.adva"}</p>
                                        </div>
                                        <div>
                                            <p>Customer Name</p>
                                            <p>{values.advance_customer_name}</p>
                                        </div>
                                        <AntdInput
                                            text="Amount"
                                            value='used_receipt_amount'
                                            ph="Enter Amount"
                                        />
                                    </div>
                                }


                            </>
                        }
                        <hr style={{ border: "5px solid #F4F6F9" }} />
                        <ParagraphTag label="Summary" />
                        <div className="flex flex-col px-4 py-2">
                            <p>Total Bill Amount</p>
                            <p>$ <span className="px-0.5">{values.bill_value || 0}</span></p>
                        </div>
                        {
                            values.sales_type === 1 &&
                            <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
                                <div className="flex flex-col">
                                    <p>Payment Type</p>
                                    {
                                        values.cash_amount && <p> Cash - {values.cash_amount}</p>
                                    }
                                    {
                                        values.online_bank_amount && <p> Bank- {values.online_bank_amount}</p>
                                    }

                                    {
                                        values.upi_amount && <p> Upi - {values.upi_amount}</p>
                                    }
                                    {
                                        values.bank_cheque_amount && <p> Cheque - {values.bank_cheque_amount}</p>
                                    }
                                    {
                                        values.credit_card_amount && <p> Credit Card - {values.credit_card_amount}</p>
                                    }
                                    {
                                        values.debit_card_amount && <p> Debit Card - {values.debit_card_amount}</p>
                                    }

                                </div>
                                <div>
                                    <p>Advanced Used Amount</p>
                                    <p>{values.used_receipt_amount}</p>
                                </div>
                                <div>
                                    <p> Pending Amount</p>
                                    <p>{Number(values.bill_value) - getTotalMoney(values)}</p>
                                </div>
                            </div>
                        }

                        <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24">
                            <CButton btnType="submit">
                                Save
                            </CButton>
                            <CButton onClick={() => dispatch(setShowAddBookPage(false))} type="cancel">
                                Cancel
                            </CButton>
                        </div>

                    </Form>
                )
            }}
            

        </Formik>
        <Modal openModal= {showBillModal} height = {250} width={350}>
        <p style={{ fontSize: 16, fontWeight: 500, color: "#959595", marginTop: 20 }}> Both the values Should match</p>
        <CButton 
            onClick={() => setShowBillModal(false)}
            style={{ position: 'absolute', bottom: 20 }}
        >
            Ok
        </CButton>

    </Modal>
    </>
    )
}

export default DayBookModal;

