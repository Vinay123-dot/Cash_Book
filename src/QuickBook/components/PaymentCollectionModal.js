import React, { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CButton from "../../components/ui/Button";
import { DaysArr,selectedValType } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import PaymentSelect from "../../components/ui/PaymentSelect/PaymentSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import { AiOutlineDelete } from "react-icons/ai";
import {
    apiGetCustomerTypeInfo,
    apiGetPaymentTypeInfo,
    apiGetUPITypeInfo,
    apiStoreAdvancedBookInfo
} from "../../services/TransactionService";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import Loader from "../../components/shared/Loader";
import { getTotalMoneyInDayBook } from "./CompConstants";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { AdvanceBookIntialObj } from "../intialValuesFol";

const validationSchema = Yup.object().shape({
    date: Yup.string().required('This field is required.'),
    party_code: Yup.string().required('This field is required.'),
    party_name : Yup.string().required('This field is required.'),
    party_type: Yup.string().required('This field is required.'),
    customer_name : Yup.string().required('This field is required.'),
    phone_no : Yup.string().required('This field is required.'),
    bill_value : Yup.string().required('This field is required.'),


});
const iconStyle = { color: "red", width: 20, height: 20, position: "absolute", right: 10,bottom:5 };

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />

)



const PaymentCollectionModal = (props) => {

    const { showPaymentColModal, onCancel } = props;
    const dispatch = useDispatch();
    const [clickCount, setClickCount] = useState([0]);
    const [paymentListInfo, setPaymentListInfo] = useState([]);
    const [upiTypeInfo, setUpiTypeInfo] = useState([]);
    const [customerListInfo, setCustomerListInfo] = useState([]);
    const [showBillModal, setShowBillModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [validateModal,setValidateModal] = useState(true);
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        getPaymentTypeInfo();
        getUpiTypeInfo();
        getCustomerTypeInfo();
    }, [])

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

    if (!showPaymentColModal) return null;



    const handleButtonClick = (setFieldValue) => {

        if (clickCount.length > 5) return;
        setFieldValue(`paymentType${clickCount.length}`, null);
        setClickCount(prevCount => [...prevCount, clickCount.length]);
    };

    const handleRemoveFromList = (selectedItem, setFieldValue, valObj) => {
        setFieldValue(`paymentType${selectedItem}`, null);
        let selectedVal = valObj?.[`paymentType${selectedItem}`];
        if (selectedVal === "UPI") {

            setFieldValue("upi_amount", null);
            setFieldValue("upi_type", null);
        }
        if (selectedVal === "Cash") {
            console.log("TEST")
            setFieldValue("cash_amount", null);
        }
        if (selectedVal === "Bank") {
            setFieldValue("online_bank_amount", null);
            setFieldValue("online_bank_name", "");
            setFieldValue("online_bank_trans_no", "");
        }
        if (selectedVal === "Cheque") {
            setFieldValue("bank_cheque_amount", null);
            setFieldValue("bank_cheque_name", "");
            setFieldValue("bank_cheque_no", "");
        }
        if (selectedVal === "Credit Card") {
            setFieldValue("credit_card_amount", null)
        }
        if (selectedVal === "Debit Card") {
            setFieldValue("debit_card_amount", null)
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

    const handleSubmit = async (values,validateModal) => {
        try {
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = validateModal && (diffInAmount > 10 || diffInAmount < -10);
            console.log(",F",modalFlag)
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            setShowLoader(true);
            let newObj = JSON.parse(JSON.stringify(values));
            let convertedObj = convertTONumbers(newObj);

            convertedObj.key = uniqueId;

            let response = await apiStoreAdvancedBookInfo([convertedObj]);
            if (response.status === 200) {
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                setValidateModal(true);

            }
            setShowLoader(false);
        } catch (e) {
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


    return (<>
        <Formik
            initialValues={AdvanceBookIntialObj}
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
                            <AntdInput
                                text="Party Code"
                                value='party_code'
                                ph="Party Code"
                            />
                            <AntdInput
                                text="Party Name"
                                value='party_name'
                                ph="Party name"
                            />

                            {
                                showSelectBox("Party Type", "party_type", "--Select PartyType--", customerListInfo, setFieldValue)
                            }
                            <AntdInput
                                text="Amount"
                                value='bill_value'
                                ph="Enter Amount"
                                acceptOnlyNum={true}
                                showPrefix={true}
                            />
                            {
                                showSelectBox("Day", "date", "--Select Day--", DaysArr, setFieldValue)
                            }
                        </div>
                        <hr style={{ border: "5px solid #F4F6F9" }} />

                        <div className="flex items-center mt-5">
                            <ParagraphTag label="Payment Details" />
                            <CButton onClick={() => handleButtonClick(setFieldValue)}>Add</CButton>

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
                                    outputObj={values}
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
                                            index !== 0 &&
                                            <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
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
                                            index !== 0 &&
                                            <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
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
                                            index !== 0 &&
                                            <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
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
                                            index !== 0 &&
                                            <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
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
                                            index !== 0 &&
                                            <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
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
                                            index !== 0 &&
                                            <AiOutlineDelete style={iconStyle} onClick={() => handleRemoveFromList(eachItem, setFieldValue, values)} />
                                        }
                                    </div>
                                }
                            </div>
                        ))
                        }
                        <ShowPaymentTypes 
                            paymentValues = {values}
                            isFromAdvPayments = {false}
                        />
                        <BillAmountModal 
                            billModal = {showBillModal} 
                            valuesObj = {values}
                            handleCancelBillModal = {() =>{
                                setShowBillModal(false);
                                setValidateModal(false)
                            }}
                        />
                        <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                            <CButton btnType="submit">
                                Save
                            </CButton>
                            <CButton onClick={() => {
                                onCancel();
                                dispatch(setShowAddBookPage(false));
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
    </>
    )
}

export default PaymentCollectionModal;





