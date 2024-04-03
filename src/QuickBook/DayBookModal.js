import React from "react";
import { Input, Modal, Select, Radio, Button } from "antd";
import { Options } from "../Constants";
import { horizontalLine } from "../commonStyles";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { btnClr } from "../commonStyles";

const { Option } = Select;

const DaysArr = [
    { label: 'Today', value: '0' },
    { label: 'Yesterday', value: '1' }
]

const cashTypes = [
    { label: 'Cash', value: '0' },
    { label: 'Credit', value: '1' }
];



const validationSchema = Yup.object().shape({
    billNum: Yup.string().required('BillNum is required'),
    sale : Yup.string().required('Sale is required'),
    day : Yup.string().required('Day is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
});

const initialValues = {
    day : '',
    sale : '',
    billNum : '',
    name: '',
    email: '',
    gender: '',
};

const showInputBox = (text,value,ph) => (
    <div style={{width:200}}>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={Input} placeholder={ph} />
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)

const showSelectBox = (title,value,ph,Arr) => (
    <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
        <label htmlFor={value}>{title}</label>
        <Field name={value} as={Select} placeholder={ph}>
            {Arr.map((eachOpt, i) => <Option value={eachOpt.value}>{eachOpt.label}</Option>)}
        </Field>
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)


const DayBookModal = (props) => {

    const handleSubmit = (values) => {
        console.log("v", values)
    }



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h3 style={{ color: "#5A87B2" }}>Details</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
                        {
                            showSelectBox("Day",'day',"Select Day",DaysArr)
                        }
                        <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
                            <label>Sale Type</label>
                            <Field name="sale">
                                {({ field }) => (
                                    <Radio.Group {...field}>
                                        {cashTypes.map(option => (
                                            <Radio key={option.value} value={option.value}>
                                                {option.label}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                )}
                            </Field>
                            <ErrorMessage name={"sale"} component="div" style={{ color: 'red' }} />
                        </div>
                        {
                            showInputBox('Bill Number','billNum',"Enter your Bill Number" )
                        }
                        {
                            showSelectBox("Day",'day',"Select Day",DaysArr)
                        }
                        {
                            showInputBox('Bill Total Value','billNum',"Enter your Bill Number" )
                        }

                    </div>

                    <hr style={horizontalLine} />

                    <h3 style={{ color: "#5A87B2" }}> Payment Details</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
                        {
                            showSelectBox("Day",'day',"Select Day",DaysArr)
                        }
                        {
                            showInputBox("Cash","cash","Enter your Bill Number")
                        }

                    </div>

                    <hr style={horizontalLine} />
                    <h3 style={{ color: "#5A87B2" }}>Advanced Bill Details</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
                        {
                            showInputBox("Advance Receipt Number","billNum","Enter your Bill Number")
                        }
                        {
                            showInputBox("Advance Receipt Amount","billNum","Enter your Bill Number")
                        }
                        {
                            showInputBox("Pending Bill","billNum","Enter your Bill Number")
                        }
                    </div>
                    <div style={{display:"flex",flexDirection:"row-reverse",gap:40,marginTop:20,position:"absolute",bottom:10,right:10}}>
                        
                    <Button style={btnClr} htmlType="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                    <Button htmlType="cancel" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    </div>

                </Form>
            )}

        </Formik>
    )
}

export default DayBookModal;