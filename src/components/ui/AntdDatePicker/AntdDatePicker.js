import React from "react";
import { DatePicker } from "antd";
import { Field, ErrorMessage } from "formik";
import moment from "moment";
import dayjs from "dayjs";
import {dateFormat } from "../../../Constants";
import './customStyles.css';

const AntdDatePicker = (props) => {
  const { error,ph,labelText,name,handleChange,isFromAdvance = false,value } = props;

  const disabledDate = (current) => {
    const today = moment().startOf('day');
    return current < today.subtract(2, 'days') || current > moment().endOf('day');
  };

  const disabledDateForABModal = (current) => {
    const startDate = moment('2024-01-01').startOf('day');
    const endDate = moment().endOf('day');
    return current < startDate || current > endDate;
  };

  return (
    <div className="flex flex-col w-full md:w-60 mt-1">
      <label htmlFor={"test"} className="text-start mb-3 text-black">{labelText}</label>
      <DatePicker
        id={name}
        format={dateFormat}
        disabledDate={isFromAdvance ? disabledDateForABModal : disabledDate}
        value={value ? dayjs(value, dateFormat) : null}
        onChange={handleChange}
        placeholderText={ph}
        popupClassName="custom-calendar"
        
      />
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} className="text-start" />
    </div>

  )
}

export default AntdDatePicker;

// prefix={flag && prefix} 