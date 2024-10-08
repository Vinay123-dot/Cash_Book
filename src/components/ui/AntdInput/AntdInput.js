import React from "react";
import { Input } from "antd";
import { Field, ErrorMessage } from "formik";
import RupeePrefix from "../../../Prefixes/RupeeSign";



const AntdInput = (props) => {
    const { 
        error,text,value , ph, 
        showPrefix = false,acceptOnlyNum = false,
        validation = false,disableInput  = false,
        validateField,showAddBefore = false,
        showAddBeforeValue ="" ,maxLen = 200,forMobileNum = false,
        handleChange} = props;
  
    return (
        <div className="flex flex-col w-full md:w-60">
            <label htmlFor={value} className="my-2 text-start text-black">{text}</label>
            <Field 
                name={value} 
                as={Input} 
                placeholder={ph} 
                readOnly={disableInput}
                addonBefore= {showAddBefore &&showAddBeforeValue}
                // error={error}
                prefix = {showPrefix && RupeePrefix}                
                onKeyPress={(event) => {                    
                    if (!/^[0-9.]+$/.test(event.key) && acceptOnlyNum && !forMobileNum) {
                        event.preventDefault()
                    }
                    if (!/^[0-9]+$/.test(event.key) && acceptOnlyNum && forMobileNum) {
                        event.preventDefault()
                    }
                }}
                validate = {validation && validateField}
                maxLength={maxLen}
                
            />
            <ErrorMessage name={value} component="div" style={{ color: 'red', }} className="text-start"/>
        </div>

    )
}

export default AntdInput;

// prefix={flag && prefix} 