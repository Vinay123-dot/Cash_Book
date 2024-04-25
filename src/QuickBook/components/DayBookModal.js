import React, { useState } from "react";
import { Input, Select, DatePicker } from "antd";
import { DepositType, DepostMode, PartyCode } from "../../Constants";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CButton from "../../components/ui/Button";
import { FaRupeeSign } from "react-icons/fa";
import { DaysArr, SaleType, PaymentsArray, UPIARRAY } from "../../Constants";
import AntdDatePicker from "../../components/ui/AntdDatePicker";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";



const validationSchema = Yup.object().shape({
    day: Yup.string().required('This field is required.'),
    saleType: Yup.string().required('This field is required.'),
    billNumber: Yup.string().required('This field is required.'),
    partyCode: Yup.string().required('This field is required.'),
    billTotalvalue: Yup.string().required('This field is required.'),
    advanceReceiptNum: Yup.string().required('This field is required.'),


});

const selectedValType = {
    "cashAmount": "0",
    "upiAmount": "1",
    "cardAmount": "2",
    "bankAmount": "3",
    "utrNumber": "3",
    "bankName": "3",
    "checkAmount": "4",
    "chequeNumber": "4",
    "chequeBankName": "4",
}

const initialObj = {
    day: null,
    saleType: null,
    billNumber: "",
    partyCode: null,
    billTotalvalue: "",
    cashAmount: "",
    upiType: null,
    upiAmount: "",
    cardAmount: "",
    bankAmount: "",
    utrNumber: "",
    bankName: "",
    checkAmount: "",
    chequeNumber: "",
    chequeBankName: "",
    advanceReceiptNum: "",
    paymentType0: null,
};


const DayBookModal = (props) => {

    const { showDaybookModal } = props;
    const dispatch = useDispatch();
    const [clickCount, setClickCount] = useState(1);
    const [intialValues, setIntialValues] = useState({ ...initialObj });

    if (!showDaybookModal) return null;





    const handleButtonClick = () => {

        if (clickCount > 4) return;
        intialValues[`paymentType${clickCount}`] = null;
        setIntialValues(intialValues);
        setClickCount(prevCount => prevCount + 1);
    };


    const handleSubmit = (values) => { console.log("temp", values) }

    const validatePaymentType = (value) => {
        let error;
        if (!value) {
            error = 'This Field is Required';
        }
        return error;
    }
    const validateInputField = (value, allValues, type) => {
        const { paymentType0: P0, paymentType1: P1, paymentType2: P2, paymentType3: P3, paymentType4: P4 } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4];
        let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This Field is Required' : null
        return err;

    }

    const validateUpiType = (value, allValues) => {
        const { paymentType0: P0, paymentType1: P1, paymentType2: P2, paymentType3: P3, paymentType4: P4 } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4];
        let error = (paymentTypeArr.includes("1") && !value) ? 'This Field is Required' : null
        return error;

    }

    return (
        <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                delete values["date"];
                handleSubmit(values)
            }}
            style={{ overflow: "auto" }}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => {
                return (
                    <Form>
                        <ParagraphTag label="Details" />
                        <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                            <AntdFormikSelect
                                labelText="Day"
                                name="day"
                                ph="--Select Day--"
                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                Arr={DaysArr}
                            />
                            <AntdFormikSelect
                                labelText="Sale Type"
                                name="saleType"
                                ph="--Select Sale Type--"
                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                Arr={SaleType}
                                error={errors.saleType && touched.saleType}
                            />
                            <AntdInput
                                text="Bill Number"
                                value='billNumber'
                                ph="Enter Bill Number"
                                error={errors.billNumber && touched.billNumber}
                            />

                            <AntdFormikSelect
                                labelText="Party Code"
                                name="partyCode"
                                ph="--Select PartyCode--"
                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                Arr={PartyCode}
                                error={errors.partyCode && touched.partyCode}
                            />
                            <AntdInput
                                text="Bill Total Value"
                                value='billTotalvalue'
                                ph="Enter Bill TotalValue"
                                showPrefix={true}
                                error={errors.billTotalvalue && touched.billTotalvalue}
                                acceptOnlyNum={true}
                            />
                        </div>
                        {
                            values.saleType === "0" &&
                            <>
                                <hr style={{ border: "5px solid #F4F6F9" }} />

                                <div className="flex items-center mt-5">
                                    <ParagraphTag label="Payment Details" />
                                    <CButton onClick={handleButtonClick}>Add</CButton>
                                </div>
                                {[...Array(clickCount)].map((_, index) => (

                                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2">
                                        <AntdFormikSelect
                                            labelText="Payment Type"
                                            name={`paymentType${index}`}
                                            ph="--Select PaymentType--"
                                            handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                            Arr={PaymentsArray}
                                            validation={true}
                                            validateField={validatePaymentType}
                                        />
                                        {
                                            values[`paymentType${index}`] === "0" &&
                                            <AntdInput
                                                text="Enter Amount"
                                                value='cashAmount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "cashAmount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "1" &&
                                            <AntdFormikSelect
                                                labelText="UPI Type"
                                                name="upiType"
                                                ph="--Select UPI Type--"
                                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                                Arr={UPIARRAY}
                                                validation={true}
                                                validateField={(value) => validateUpiType(value, values)}

                                            />
                                        }
                                        {
                                            values[`paymentType${index}`] === "1" &&
                                            <AntdInput
                                                text="Enter Amount"
                                                value='upiAmount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "upiAmount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "2" &&
                                            <AntdInput
                                                text="Enter Amount"
                                                value='cardAmount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "cardAmount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "3" &&
                                            <AntdInput
                                                text="Enter Amount"
                                                value='bankAmount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "bankAmount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "3" &&
                                            <AntdInput
                                                text="UTR Number"
                                                value='utrNumber'
                                                ph="Enter UTR Number"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "utrNumber")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "3" &&
                                            <AntdInput
                                                text="Bank Name"
                                                value='bankName'
                                                ph="Enter BankName"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "bankName")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "4" &&
                                            <AntdInput
                                                text="Amount"
                                                value='checkAmount'
                                                ph="Enter Amount"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "checkAmount")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "4" &&
                                            <AntdInput
                                                text="Cheque Number"
                                                value='chequeNumber'
                                                ph="Enter CheckNumber"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "chequeNumber")}
                                            />

                                        }
                                        {
                                            values[`paymentType${index}`] === "4" &&
                                            <AntdInput
                                                text="Bank Name"
                                                value='chequeBankName'
                                                ph="Enter BankName"
                                                showPrefix={true}
                                                validation={true}
                                                validateField={(value) => validateInputField(value, values, "chequeBankName")}
                                            />

                                        }
                                    </div>))
                                }

                                <hr style={{ border: "5px solid #F4F6F9" }} />
                                <ParagraphTag label="Advanced Bill Details" />
                                <div className="flex px-4 py-2 items-center">
                                    <AntdInput
                                        text="Advance Receipt Number"
                                        value='advanceReceiptNum'
                                        ph="Enter AdvanceReceiptNumber"
                                    />
                                    <CButton className="h-44 mt-5 ml-10">
                                        Verify
                                    </CButton>


                                </div>
                                <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="flex flex-col">
                                        <p>Advanced Receipt Amount</p>
                                        <p> 140500</p>
                                    </div>
                                    <div>
                                        <p>Customer Name</p>
                                        <p>Ravi</p>
                                    </div>
                                    <AntdInput
                                        text="Amount"
                                        value='advanceReceiptNum'
                                        ph="Enter Amount"
                                    />
                                </div>

                            </>
                        }
                        <hr style={{ border: "5px solid #F4F6F9" }} />
                        <ParagraphTag label="Summary" />
                        <div className="flex flex-col px-4 py-2">
                            <p>Total Bill Amount</p>
                            <p>${values.billTotalvalue}</p>
                        </div>
                        {
                            values.saleType === "0" &&
                            <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
                                <div className="flex flex-col">
                                    <p>Payment Type</p>
                                    {
                                        values.cardAmount && <p> Card- {values.cardAmount}</p>
                                    }
                                    {
                                        values.cashAmount && <p> Cash - {values.cashAmount}</p>
                                    }
                                    {
                                        values.bankAmount && <p> Bank- {values.bankAmount}</p>
                                    }

                                    {
                                        values.upiAmount && <p> Upi - {values.upiAmount}</p>
                                    }
                                    {
                                        values.checkAmount && <p> Cheque - {values.checkAmount}</p>
                                    }

                                </div>
                                <div>
                                    <p>Advanced Used Amount</p>
                                    <p>0</p>
                                </div>
                                <div>
                                    <p> Pending Amount</p>
                                    <p>0</p>
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
    )
}

export default DayBookModal;