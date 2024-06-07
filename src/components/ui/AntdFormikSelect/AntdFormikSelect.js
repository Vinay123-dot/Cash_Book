import React,{useState} from "react";
import { Select } from "antd";
import { Field, ErrorMessage } from "formik";
import { useSelector } from 'react-redux';

const { Option } = Select;

const AntdFormikSelect = (props) => {
    const {labelText,name,ph,handleChange,Arr,error,validation = false,validateField,key,dValue} = props;
    let editedDaybookObj = useSelector(state => state.quickbookStore.state.editedDaybookObj);
    const [sVal,setSVal] = useState(editedDaybookObj[name] || null);

    if(Arr.length === 0) return null;

    
    const getSelectedVal = (val) => {
        let temp = (Arr || []).find((item)=> item.Id === val || item.Type === val);
        return temp?.Type  || null;
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
                            setSVal(selectedValue)
                            handleChange(name, selectedValue);
                        }}
                        value = {getSelectedVal(sVal)}
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