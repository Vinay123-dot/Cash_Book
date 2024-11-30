import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import { ErrorMessage } from "formik";
import moment from "moment";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { dateFormat } from "Constants";
import './customStyles.css';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const AntdDatePicker = (props) => {
  const { approvedDates } = useSelector(state => state.requestBook.reqData);
  const { ph,labelText,name,handleChange,isFromAdvance = false,disabled = false,value } = props;

  // const disabledDate = (current) => {
  //   const today = moment().startOf('day');
  //   console.log("t",today,"c",current);
  //   return current < today.subtract(2, 'days') || current > moment().endOf('day');
  // };

  const disabledDate = (current) => {
    const today = dayjs().startOf("day");

    const allowedDayjsDates = (approvedDates || []).map((date) =>
      dayjs(date, "YYYY-MM-DD").startOf("day")
    );

    // Check if the current date is in the allowed dates
    const isInAllowedDates = allowedDayjsDates.some((allowedDate) =>
      current.isSame(allowedDate, "day")
    );

    // Allow today, yesterday, day before yesterday, and specific allowed dates
    return !(
      (current.isSameOrAfter(today.subtract(2, "day")) &&
        current.isSameOrBefore(dayjs().endOf("day"))) ||
      isInAllowedDates
    );
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
        disabled = {disabled}
        popupClassName="custom-calendar"
        
      />
      <ErrorMessage name={name} component="div" style={{ color: 'red' }} className="text-start" />
    </div>

  )
}

export default AntdDatePicker;

AntdDatePicker.propTypes = {
  ph : PropTypes.string,
  labelText : PropTypes.string,
  name : PropTypes.string,
  value : PropTypes.string,
  handleChange : PropTypes.func,
  isFromAdvance : PropTypes.bool,
  disabled : PropTypes.bool
};

AntdDatePicker.defaultProps = {
  isFromAdvance : false,
  disabled : false
};

// prefix={flag && prefix} 