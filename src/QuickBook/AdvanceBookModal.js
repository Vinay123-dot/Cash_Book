import React from "react";
import { Input, Modal, Select, Radio, Button,DatePicker } from "antd";
import { Options } from "../Constants";
import { horizontalLine } from "../commonStyles";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { btnClr } from "../commonStyles";
import { FaRupeeSign } from "react-icons/fa";

const { Option } = Select;



const CustomerArr = [
    { label : 'TRADERS',value : 'TRADERS'},
    { label : 'INDEPENDENTWORKSHOP',value : 'INDEPENDENTWORKSHOP'},
    { label : 'WALK-IN CUSTOMER',value : 'WALK-IN CUSTOMER'},
    { label : 'MASS',value : 'MASS'},
    { label : 'CO-DEALER',value : 'CO-DEALER'},
    { label : 'CO-DISTRIBUTOR',value : 'CO-DISTRIBUTOR'},
]


const validationSchema = Yup.object().shape({
    receiptNum : Yup.string().required('Receipt Number is required'),
    date : Yup.string().required('Date is required'),
    customerType: Yup.string().required('Customer Type is Required'),
    customerName : Yup.string().required('Customer Name is Required'),
    customerNum : Yup.string().required('Customer Mobile Number is required'),
    amount: Yup.string().required('Amount is required'),
});

const prefix = (
    <FaRupeeSign
      style={{
        fontSize: 12,
      }}
    />
  );

const initialValues = {
    receiptNum : '',
    date : '',
    customerType : '',
    customerName : '',
    customerNum : '',
    amount : '',
};

const showInputBox = (text,value,ph,showIcon) => (
    <div style={{width:200}}>
        <label htmlFor={value}>{text}<span style={{color:"red",height:20,width:10}}>*</span> </label>
        <Field name={value} as={Input} placeholder={ph} prefix={showIcon && prefix} />
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)
const showDatePicker = (text,value,ph) => (
    <div style={{display: "flex", flexDirection: "column", width:200}}>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={DatePicker} placeholder={ph} />
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


const AdvanceBookModal = (props) => {

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
                    <h3 style={{ color: "#5A87B2",}}>Details</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 100 }}>
                        {
                            showInputBox('Receipt Number','receiptNum',"Enter Receipt Number" )
                        }
                        {
                            showDatePicker('Date','date',"Select Date" )
                        }
                        {
                            showSelectBox("Customer Type",'customerType',"Select Customer",CustomerArr)
                        }
                        {
                            showInputBox('Customer Name','customerName',"Enter Customer Name" )
                        }
                        {
                            showInputBox('Customer Mobile Number','customerNum',"Enter Customer MobileNumner" )
                        }
                        {
                            showInputBox('Amount','amount',"Enter Amount",true )
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

export default AdvanceBookModal;