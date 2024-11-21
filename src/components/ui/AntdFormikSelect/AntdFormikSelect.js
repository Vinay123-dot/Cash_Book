import React from "react";
import { Select } from "antd";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

const { Option } = Select;

const AntdFormikSelect = (props) => {
    const {
      labelText,
      name,
      ph,
      handleChange,
      Arr = [],
      validation = false,
      validateField,
      isDisabled = false,
    } = props;
  
    const caseSensitiveFilterOption = (input, option) => {
        return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
    };

    if(Arr.length === 0) return null;
    
    return (
        <div className="flex flex-col w-full md:w-60">
            <label htmlFor={name} className="my-2 text-start text-black">{labelText}</label>
            <Field 
                name={name}
                validate = {validation && validateField}
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
                            <Option key={eachOpt.id} value={eachOpt.id || eachOpt.Id}>
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

AntdFormikSelect.propTypes = {
    labelText : PropTypes.string,
    name : PropTypes.string,
    ph : PropTypes.string,
    handleChange : PropTypes.func,
    Arr : PropTypes.array,
    validation : PropTypes.bool,
    validateField : PropTypes.func,
    isDisabled : PropTypes.bool
};

AntdFormikSelect.defaultProps = {
    Arr : [],
    validation : false,
    isDisabled : false
};