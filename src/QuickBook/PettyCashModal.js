import React from "react";
import { Input, Modal, Select, Button } from "antd";
import { Options } from "../Constants";
import { horizontalLine } from "../commonStyles";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { btnClr } from "../commonStyles";

const { Option } = Select;
const { TextArea } = Input;

const DaysArr = [
    { label: 'Today', value: '0' },
    { label: 'Yesterday', value: '1' }
]

const cashTypes = [
    { label: 'Cash', value: '0' },
    { label: 'Credit', value: '1' }
];



const validationSchema = Yup.object().shape({
    seelctedDay: Yup.string().required('Day is required'),
    customerNum : Yup.string().required('Customer Name is required'),
    amount : Yup.string().required('Amount is required'),
    reason: Yup.string().required('Reason is required'),
});

const initialValues = {
    seelctedDay : '',
    customerNum : '',
    amount : '',
    reason: '',
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
const showTextArea = (text,value,ph) => (
    <div style={{width:500}}>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={TextArea} placeholder={ph} rows ={4}  />
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)


const PettyCashModal = (props) => {

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
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 100 }}>
                        {
                            showSelectBox("Day",'seelctedDay',"Select Day",DaysArr)
                        }
                        {
                            showInputBox('Customer Mobile Number','customerNum',"Enter Customer Mobile Number" )
                        }
                        {
                            showInputBox('Amount','amount',"Enter Amount" )
                        }
                        {
                            showTextArea('Details','reason',"Enter Details" )
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

export default PettyCashModal;