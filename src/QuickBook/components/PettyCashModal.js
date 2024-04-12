import React from "react";
import { Input, Select} from "antd";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CButton from "../../components/ui/Button";
import { FaRupeeSign } from "react-icons/fa";

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

const prefix = (
    <FaRupeeSign
      style={{
        fontSize: 12,
      }}
    />
  );

const validationSchema = Yup.object().shape({
    seelctedDay: Yup.string().required('Day is required'),
    remAmount : Yup.string().required('Remaining Amount is required'),
    amount : Yup.string().required('Amount is required'),
    reason: Yup.string().required('Reason is required'),
});

const initialValues = {
    seelctedDay : '',
    remAmount : '',
    amount : '',
    reason: '',
};

const showInputBox = (text,value,ph) => (
    <div style={{width:200}}>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={Input} placeholder={ph} prefix = {prefix} />
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
    <div>
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={TextArea} placeholder={ph} rows ={4}  />
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)


const PettyCashModal = (props) => {
    const { showPettyCash } = props;

    const handleSubmit = (values) => {
        console.log("v", values)
    }

    if(!showPettyCash) return null;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h1 style={{ color: "#5A87B2" ,marginBottom:20,padding:"4px"}}>Details</h1>
                    {/* <div style={{ display: "flex", flexWrap: "wrap", gap: 100 }}> */}
                    <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-10">
                        {
                            showSelectBox("Day",'seelctedDay',"Select Day",DaysArr)
                        }
                        {
                            showInputBox('Amount','amount',"Enter Amount",true )
                        }
                        {
                            showInputBox('Remaining Amount','remAmount',"Enter Remaining Amount",true)
                        }
                        
                        {
                            showTextArea('Details','reason',"Enter Details" )
                        }

                    </div>


                   
                    {/* <div style={{display:"flex",flexDirection:"row-reverse",gap:40,marginTop:20,position:"absolute",bottom:10,right:10}}> */}
                    <div className="flex flex-row-reverse gap-10 mt-20 xl:absolute bottom-10 right-10">
                    <CButton  >
                Save
            </CButton>
            <CButton onClick={()=> console.log("C")} type = "cancel">
                Cancel
            </CButton> 
                    </div>

                </Form>
            )}

        </Formik>
    )
}

export default PettyCashModal;