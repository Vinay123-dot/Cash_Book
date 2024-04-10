import React from "react";
import { Input, Select, DatePicker } from "antd";
import { DepositType, DepostMode } from "../../Constants";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CButton from "../../ComponentsTest/Button";
import { FaRupeeSign } from "react-icons/fa";

const { Option } = Select;

const showDatePicker = (text, value, ph) => (
    <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={DatePicker} placeholder={ph} />
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)


const validationSchema = Yup.object().shape({
    depositType: Yup.string().required('Deposit type is required'),
    date: Yup.string().required('Date is required'),
    amount: Yup.string().required('Amount is required'),
    remAmount: Yup.string().required('Remaining amout is required'),
    depositMode: Yup.string().required('Deposit Mode is required'),
});

const initialValues = {
    depositType: null,
    date: '',
    amount: '',
    remAmount: '',
    depositMode: ''
};
const prefix = (
    <FaRupeeSign
        style={{
            fontSize: 12,
        }}
    />
);

const showInputBox = (text, value, ph, flag) => (
    <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={Input} placeholder={ph} prefix={flag && prefix} />
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)




const AdvanceBookModal = (props) => {
    const { showAdvanceBook } = props;

    if (!showAdvanceBook) return null;

    // const handleChange = (value) => initialValues.depositType = value;
    const handleSelectChange = (name, value, setFieldValue) => {
        setFieldValue(name, value);
    };

    const showSelectBox = (title, value, ph, Arr, handleChange, values, setFieldValue, flag) => (
        <div style={{ display: "flex", flexDirection: "column", width: 200 }} className={flag ? "px-4 py-2" : "p-0"}>
            <label htmlFor={value}>{title}</label>
            <Field name={value}>
                {({ field }) => (
                    <Select
                        {...field}
                        placeholder={ph}
                        onChange={(selectedValue) => {
                            handleChange(value, selectedValue, setFieldValue);
                            field.onChange(selectedValue);
                        }}
                    >
                        {Arr.map((eachOpt, i) => (
                            <Option key={i} value={eachOpt.value}>
                                {eachOpt.label}
                            </Option>
                        ))}
                    </Select>
                )}
            </Field>
            <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
        </div>
    )


    const handleSubmit = (values) => {
    }



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values, setFieldValue }) => {
                console.log("v", values)
                return (
                    <Form>
                        <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Details</h1>
                        <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2">
                            {
                                showSelectBox("Receipt Number", 'receiptNum', "Select Type", DepositType, handleSelectChange, values, setFieldValue)
                            }
                            {
                                showDatePicker('Date', 'date', "Select Date")
                            }

                            {
                                showSelectBox("Customer Type", 'depositMode', "Select Type", DepostMode, handleSelectChange, values, setFieldValue)
                            }
                            {
                                showInputBox('Customer Name', 'amount', "Enter Amount")
                            }
                            {
                                showInputBox('Customer MobileNumber', 'amount', "Enter Amount")
                            }
                            {
                                showInputBox('Amount', 'remAmount', "Enter Remaining Amount", true)
                            }

                        </div>
                        <hr style={{ border: "5px solid #F4F6F9" }} />
                        <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Payment Details</h1>
                        {
                            showSelectBox("Payment Type", 'depositMode', "Select Type", DepostMode, handleSelectChange, values, setFieldValue, true)
                        }
                        
                        <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24">
                            <CButton>
                                Save
                            </CButton>
                            <CButton onClick={() => console.log("C")} type="cancel">
                                Cancel
                            </CButton>
                        </div>

                    </Form>
                )
            }}

        </Formik>
    )
}

export default AdvanceBookModal;