import React from "react";
import { DepositType, DepositMode } from "../../Constants";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdInput from "../../components/ui/AntdInput";
import AntdDatePicker from "../../components/ui/AntdDatePicker";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import { AdvanceBookValidations } from "../../Validations";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage
  } from '../store/stateSlice';
  import ParagraphTag from "../../constants/PTag";


const initialValues = {
    receiptNum: "",
    date: "",
    dateString : "",
    depositMode: null,
    customerName: '',
    customerMobileNumber: '',
    remAmount: '',
    depositType: null,
};

const AdvanceBookModal = (props) => {
    const { showAdvanceBook } = props;
    const dispatch = useDispatch();
    if (!showAdvanceBook) return null;

    const handleSubmit = (values) => {
        console.log("v", values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={AdvanceBookValidations}
            onSubmit={(values, { setSubmitting }) => {
                delete values["date"];
                handleSubmit(values)
            }}
           style={{overflow:"auto"}}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => {
                return (
                    <Form>
                        <ParagraphTag  label = "Details"/>
                        <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">

                            <AntdInput
                                text="Receipt Number"
                                value='receiptNum'
                                ph="Enter Amount"
                                error={errors.receiptNum && touched.receiptNum}
                            />
                            <AntdDatePicker
                                labelText="Date"
                                name='date'
                                ph="Select Date"
                                handleChange={(name, value,dateString) => {
                                    setFieldValue(name, value)
                                    setFieldValue("dateString",dateString)
                                }}
                                error={errors.date && touched.date}
                            />
                            <AntdFormikSelect
                                labelText="Customer Type"
                                name="depositMode"
                                ph="Select Type"
                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                Arr={DepositMode}
                                error={errors.depositMode && touched.depositMode}
                            />

                            <AntdInput
                                text="Customer Name"
                                value='customerName'
                                ph="Enter CustomerName"
                                error={errors.customerName && touched.customerName}
                            />
                            <AntdInput
                                text="Customer MobileNumber"
                                value='customerMobileNumber'
                                ph="Enter Customer MobileNumber"
                                error={errors.customerMobileNumber && touched.customerMobileNumber}
                            />
                            <AntdInput
                                text="Amount"
                                value='remAmount'
                                ph="Enter Remaining Amount"
                                showPrefix={true}
                                error={errors.remAmount && touched.remAmount}
                            />
                        </div>
                        <hr style={{ border: "5px solid #F4F6F9" }} />
                        <ParagraphTag  label = "Payment Details"/>
                        <div className="gap-10 px-4 py-6">
                        <AntdFormikSelect
                            labelText="Payment Type"
                            name="depositType"
                            ph="Select Type"
                            handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                            Arr={DepositType}
                            error={errors.depositType && touched.depositType}
                        />
                        </div>
                       
                        <div className="flex flex-row-reverse gap-10 px-4 xl:pt-10">
                            <CButton btnType="submit">
                                Save
                            </CButton>
                            <CButton onClick={() =>dispatch(setShowAddBookPage(false))} type="cancel">
                                Cancel
                            </CButton>
                        </div>

                    </Form>
                )
            }
            }

        </Formik>
    )
}

export default AdvanceBookModal;