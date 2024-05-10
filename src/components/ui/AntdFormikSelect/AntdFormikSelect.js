import React from "react";
import { Select } from "antd";
import { Field, ErrorMessage } from "formik";

const { Option } = Select;

const AntdFormikSelect = (props) => {
    const {labelText,name,ph,handleChange,Arr,error,validation = false,validateField,key} = props;

    if(Arr.length === 0) return null;
    return (
        <div className="flex flex-col w-full md:w-60">
            <label htmlFor={name} className="my-2">{labelText}</label>
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
                        {(Arr || []).map((eachOpt, i) => (
                            <Option key={i} value={eachOpt.id || eachOpt.Id}>
                                {eachOpt.name || eachOpt.category || eachOpt.value || eachOpt.Type}
                            </Option>
                        ))}
                    </Select>
                )}
            </Field>
            <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
        </div>

    )

}

export default AntdFormikSelect;