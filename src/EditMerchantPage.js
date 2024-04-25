import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Select, DatePicker } from "antd";
import CButton from "./components/ui/Button";

const showInputBox = (text, value, ph, flag) => (
    <div className="flex flex-col w-full md:w-56">
        <label htmlFor={value}>{text}</label>
        <Field name={value} as={Input} placeholder={ph} style={{
      border: 'none',
      borderRadius: 0,
      borderBottom: '1px solid #d9d9d9',
      paddingBottom: '5px', // Optional: Adjust the padding as needed
      width: '100%',
      boxSizing: 'border-box',
    }}/>
        <ErrorMessage name={value} component="div" style={{ color: 'red' }} />
    </div>
)

const showUploadBox = () => {
    return (
        <div className="flex flex-col">
            <h2>upload image or logo</h2>
            <div className="flex items-center">
                <span className="w-7 h-8 border bg-[#D9D9D9] p-10 mr-5 rounded-md" />

                <CButton style={{ width: 80, height: 30 }}>
                    Upload
                </CButton>
            </div>

        </div>
    )
}



const EditMerchantPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isDropdownFocused, setIsDropdownFocused] = useState(false);

    const handleDropdownFocus = () => {
      setIsDropdownFocused(true);
    };
  
    const handleDropdownBlur = () => {
      setIsDropdownFocused(false);
    };

    const handleInputFocus = () => {
      setIsInputFocused(true);
    };
  
    const handleInputBlur = () => {
      setIsInputFocused(false);
    };
    return ( 
    <div style={{ height:"100vh",width:"100vw"}}>
        <div className = "shadow-lg m-12 ">
        <Formik
            
        // initialValues={initialValues}
        // validationSchema={validationSchema}
        // onSubmit={handleSubmit}
    >
        {({ isSubmitting, values, setFieldValue }) => {
            console.log("v", values)
            return (
                <Form>
                    <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Details</h1>
                    <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-4 py-2">

                        <div className={`input-container ${isInputFocused ? 'input-focused' : ''}`}>

                            <label className="input-label">Name</label>
                            <input
                                type="text"
                                className="input-field"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder=" "
                            />
                        </div>
      {/* <div className={`dropdown-container ${isDropdownFocused ? 'dropdown-focused' : ''}`}>
        <select
          className={`dropdown-field ${isDropdownFocused ? 'dropdown-focused' : ''}`}
          onFocus={handleDropdownFocus}
          onBlur={handleDropdownBlur}
        >
          <option value="" disabled selected hidden>Choose an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <label className="dropdown-label">Select an option</label>
      </div> */}
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                       
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showUploadBox()
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                     
                     

                    </div>
                    <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Business Details</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-4 py-2">
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                         {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                         {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                     
                     

                    </div>
                    <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Owner Details</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-4 py-2">
                        {
                            showUploadBox()
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                         {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showUploadBox()
                        }
                        {
                            showUploadBox()
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                    </div>
                    <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Bank Details</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-4 py-2">
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                         {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                        {
                            showInputBox('Bill Number', 'amount', "Enter Amount")
                        }
                    </div>
                    <h1 style={{ color: "#5A87B2" }} className="px-4 pt-2">Bank Details</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-4 py-2">
                        {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }
                         {
                            showUploadBox()
                        }

                       
                    </div>
                   
                        <button style={{color:"whitesmoke",backgroundColor:"blue",height:"40px"}} className="w-12">Testing</button>

                </Form>
            )
        }}

    </Formik>

        </div>
      
        </div>
        
    )
}

export default EditMerchantPage;