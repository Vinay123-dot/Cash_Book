import React, {useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import AntdSelectFilter from 'components/ui/AntdSelect/AntdSelect';
import { getFormatDate } from "utils/dateFormatter";
import dayjs from 'dayjs';

const {RangePicker} = DatePicker;

const QuickBookStatusFilter = (props) => {
    const { onDateChange, message,options } = props

    const tableData = useSelector((state) => state.quickbookStore.data.tableData);
    const [isDateRange,setIsDateRange] = useState(false);

    const onStatusFilterChange = (selected) => {
        if (selected === 6) {
            setIsDateRange(true);
            return;
        }
        onDateChange?.({
            historyType: selected,
            fromDate: "",
            toDate : ""
            // toDate: getTodayDate(),
        })
    }

    const handleDate = (date, dateStrings) => {
      onDateChange?.({
        historyType: 6,
        fromDate: dateStrings?.[0],
        toDate: dateStrings?.[1],
      });
      setIsDateRange(false);
    };

    const getCustomData = (obj) => {
        let temp = getFormatDate(obj?.fromDate) +' - ' + getFormatDate(obj?.toDate);
        return obj.fromDate && obj.toDate ? temp : null
    }
    const disabledDate = (current) => {
        return current && current >= dayjs().add(1, 'day').startOf('day');
    };

    return (
        <>
        {
            isDateRange ?  
                <RangePicker 
                open={true}
                className='h-10'
                onChange = {handleDate}
                disabledDate={disabledDate}
            /> :
            <AntdSelectFilter
                placeholder="Select Duration"
                // options={daysList}
                options = {options}
                onStatusChange={onStatusFilterChange}
                value = {tableData.history_type}
                message = {message}
                customData = {getCustomData(tableData)}
            />
        }
        </>
    )
}

export default QuickBookStatusFilter

QuickBookStatusFilter.propTypes = {
    onDateChange : PropTypes.func, 
    message : PropTypes.string,
    options : PropTypes.array,
};