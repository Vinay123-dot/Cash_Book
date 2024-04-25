import React from "react";
import { Input } from "antd";
import { Field, ErrorMessage } from "formik";
import RupeePrefix from "../../../Prefixes/RupeeSign";



const AntdInput = (props) => {
    const { error,text,value , ph, showPrefix = false,acceptOnlyNum = false,validation = false,validateField } = props;
  
    return (
        <div className="flex flex-col w-full md:w-60">
            <label htmlFor={value}>{text}</label>
            <Field 
                name={value} 
                as={Input} 
                placeholder={ph} 
                error={error}
                prefix = {showPrefix && RupeePrefix}
                onKeyPress={(event) => {
                    if (!/^[0-9.]+$/.test(event.key) && acceptOnlyNum) {
                        event.preventDefault()
                    }
                }}
                validate = {validation && validateField}
                
            />
            <ErrorMessage name={value} component="div" style={{ color: 'red' }}/>
        </div>

    )
}

export default AntdInput;

// prefix={flag && prefix} 