import React from "react";
import { DepositType, DepositMode } from "../../Constants";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdDatePicker from "../../components/ui/AntdDatePicker";
import AntdInput from "../../components/ui/AntdInput";
import { BankDepositTypeValidations } from "../../Validations";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage
  } from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";

const initialValues = {
    depositType: null,
    date: '',
    amount: '',
    remAmount: '',
    depositMode: null,
    receiptNumber: '',
    resAmount: '',
    reason: ''
};

const BankDepositModal = (props) => {
    const { showBankDeposit } = props;
    const dispatch = useDispatch();
    if (!showBankDeposit) return null;

    const handleSubmit = (values) => {
        console.log("submitted_values", values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={BankDepositTypeValidations}
            onSubmit={(values, { setSubmitting }) => {
                delete values["date"];
                handleSubmit(values)
            }}
            style={{ overflow: "auto" }}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => {
                return (
                    <Form>
                         <ParagraphTag  label = "Details"/>
                        <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                            <AntdFormikSelect
                                labelText="Type"
                                name="depositType"
                                ph="Select Type"
                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                Arr={DepositType}
                            />
                            <AntdDatePicker
                                labelText="Date"
                                name='date'
                                ph="Select Date"
                                handleChange={(name, value, dateString) => {
                                    setFieldValue(name, value)
                                    setFieldValue("dateString", dateString)
                                }}
                            />
                            <AntdInput
                                text={values.depositType !== "2" ? "Amount" : "Receipt Number"}
                                value={values.depositType !== "2" ? 'amount' : 'receiptNumber'}
                                ph={values.depositType !== "2" ? "Enter Amount" : "Enter Receipt Number"}
                                showPrefix={values.depositType !== "2"}
                            />
                            {
                                values.depositType === "1" &&
                                <AntdFormikSelect
                                    labelText="Deposit Mode"
                                    name="depositMode"
                                    ph="--- Select Deposit Mode---"
                                    handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                    Arr={DepositMode}
                                />
                            }
                            <AntdInput
                                text={values.depositType === "2" ? "Receipt Amount" : "Remaing Amount"}
                                value={values.depositType === "2" ? 'resAmount' : 'remAmount'}
                                ph={values.depositType === "2" ? "Enter Receipt Amount" : "Enter Remaining Amount"}
                                showPrefix={true}
                            />
                            {
                                values.depositType === "2" &&
                                <AntdInput
                                text={"Reason"}
                                value={'reason'}
                                ph={"Enter Reason"}
                            />
                            }
                            
                        </div>
                        <div className="relative flex flex-row-reverse gap-10 mt-20 xl:absolute bottom-10 right-10">
                            <CButton btnType="submit">
                                Save
                            </CButton>
                            <CButton onClick={() =>  dispatch(setShowAddBookPage(false))}type="cancel">
                                Cancel
                            </CButton>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default BankDepositModal;
