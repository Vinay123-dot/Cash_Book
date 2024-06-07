import React from "react";
import { Input } from "antd";
import { Field, ErrorMessage } from "formik";

const { TextArea } = Input;

const AntdInput = (props) => {
    const { 
        error,text,value , ph, 
        showPrefix = false,acceptOnlyNum = false,
        validation = false,disableInput  = false,
        validateField,showAddBefore = false } = props;
  
    return (
        <div className="flex flex-col w-full md:w-60">
            <label htmlFor={value} className="my-2 text-start">{text}</label>
            <Field 
                name={value} 
                as={TextArea} 
                placeholder={ph} 
                readOnly={disableInput}
                validate = {validation && validateField}
                
            />
            <ErrorMessage name={value} component="div" style={{ color: 'red' }}/>
        </div>

    )
}

export default AntdInput;

// prefix={flag && prefix} 