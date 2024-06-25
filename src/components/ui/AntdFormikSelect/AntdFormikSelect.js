import React,{useState} from "react";
import { Select } from "antd";
import { Field, ErrorMessage } from "formik";
import { useSelector } from 'react-redux';

const { Option } = Select;

const AntdFormikSelect = (props) => {
    const {labelText,name,ph,handleChange,Arr,error,validation = false,validateField,key,isDisabled = false} = props;
  
    const caseSensitiveFilterOption = (input, option) => {
        return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
    };

    if(Arr.length === 0) return null;


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
                        disabled = {isDisabled}
                        optionFilterProp = "children"
                        filterOption={caseSensitiveFilterOption}
                    >
                        {(Arr || []).map((eachOpt, i) => (
                            <Option key={i} value={eachOpt.id || eachOpt.Id}>
                                {eachOpt.name || eachOpt.category || eachOpt.value || eachOpt.Type || eachOpt.Terminal}
                            </Option>
                        ))}
                    </Select>
                )}
            </Field>
            <ErrorMessage name={name} component="div" style={{ color: 'red' }} className="text-start" />
        </div>

    )

}

export default AntdFormikSelect;