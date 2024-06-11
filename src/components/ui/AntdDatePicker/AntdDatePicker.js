import React from "react";
import { DatePicker } from "antd";
import { Field, ErrorMessage } from "formik";

const dateFormat = 'YYYY-MM-DD';

const AntdDatePicker = (props) => {
    const { error,ph,labelText,name,handleChange } = props;
    return (
        <div className="flex flex-col w-full md:w-60">
        <label htmlFor={"test"}>{labelText}</label>
        <Field 
          name={name}
          error={error}
        >
          {({ field, form }) => (
            <DatePicker
              {...field}
              id= {name}
              format = {dateFormat}
              // selected={name}
              onChange={(date, dateString) => handleChange(name,date,dateString)}
              placeholderText= {ph}
            />
          )}
        </Field>
        <ErrorMessage name={name} component="div" style={{ color: 'red' }} className="text-start"/>
      </div>

    )
}

export default AntdDatePicker;

// prefix={flag && prefix} 