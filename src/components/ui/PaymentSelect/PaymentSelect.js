import React from "react";
import { Select } from "antd";
import { Field, ErrorMessage } from "formik";

const { Option } = Select;

const PaymentSelect = (props) => {
    const {labelText,name,ph,handleChange,Arr,error,validation = false,validateField,key,outputObj} = props;

    if(Arr.length === 0) return null;

    const getPaymentsArr = (selectedObj) => {
        const { 
            paymentType0:P0, paymentType1:P1, paymentType2: P2,
            paymentType3: P3, paymentType4: P4, paymentType5: P5
        } = outputObj;
        const pArr = [P0,P1,P2,P3,P4,P5];
        // Check if paymentType0 is undefined or null, and handle it
        const paymentTypeArr = pArr.filter(p => p !== undefined && p !== null);
    
        // Check if selectedObj.Id is not in paymentTypeArr
        return !paymentTypeArr.includes(selectedObj.Type);
    }
    return (
        <div className="flex flex-col w-full md:w-60">
            <label htmlFor={name} className="my-2 text-start">{labelText}</label>
            <Field 
                name={name} 
                error={error}
                validate = {validation && validateField}
                key = {key}
            >
                {({ field }) => (
                    <Select
                        {...field}
                        placeholder={ph}
                        onChange={(selectedValue) => {
                            handleChange(name, selectedValue);
                        }}
                    >
                        {(Arr || []).map((eachOpt, i) => {
                            let isShowLabel = getPaymentsArr(eachOpt);
                            if(isShowLabel){
                                return (
                                    <Option key={eachOpt.Id} value={eachOpt.Type}>
                                        {eachOpt.Type}
                                    </Option>
                                )
                            }
                        })}
                    </Select>
                )}
            </Field>
            <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
        </div>

    )

}

export default PaymentSelect;