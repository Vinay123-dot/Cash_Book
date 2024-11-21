import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { Field, ErrorMessage } from "formik";
import RupeePrefix from "Prefixes/RupeeSign";

const AntdInput = (props) => {
    const { 
        text,value , ph, 
        showPrefix = false,acceptOnlyNum = false,
        validation = false,disableInput  = false,
        validateField,showAddBefore = false,
        showAddBeforeValue ="" ,maxLen = 200,forMobileNum = false,
        } = props;
  
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
                    if (!/^\d+$/.test(event.key) && acceptOnlyNum && forMobileNum) {
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

AntdInput.propTypes = {
    text : PropTypes.string,
    value : PropTypes.string , 
    ph : PropTypes.string, 
    showPrefix : PropTypes.bool,
    acceptOnlyNum : PropTypes.bool,
    validation : PropTypes.bool,
    disableInput : PropTypes.bool,
    validateField : PropTypes.func,
    showAddBefore : PropTypes.bool,
    showAddBeforeValue : PropTypes.string ,
    maxLen : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([undefined]),
    ]),
    forMobileNum : PropTypes.bool,
}

AntdInput.defaultProps = {
    showPrefix : false,
    acceptOnlyNum : false,
    validation : false,
    disableInput : false,
    showAddBefore : false,
    showAddBeforeValue : "",
    maxLen : 200,
    forMobileNum : false,
}