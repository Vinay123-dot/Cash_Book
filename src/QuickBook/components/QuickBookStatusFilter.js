import React, {useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import AntdSelectFilter from 'components/ui/AntdSelect/AntdSelect';
import { getFormatDate } from "utils/dateFormatter";
import dayjs from 'dayjs';

const {RangePicker} = DatePicker;

const QuickBookStatusFilter = (props) => {
    const { onDateChange, message,options,isFromReqHistory = false,isFromPayments = false } = props

    const { tableData } = useSelector((state) => state.quickbookStore.data);
    const { reqHistoryData } = useSelector(state => state.requestBook.reqData);
    const { reqPaymentData } = useSelector(state => state.paymentBook.PaymentData);
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

    const getValuesOfFilter = () => {
        if(isFromReqHistory){
            return reqHistoryData.historyType
        }else if(isFromPayments){
            return reqPaymentData.historyType
        }else{
            return tableData.history_type;
        }
    };
    
    const displayMessage = () => {
      let customData = getCustomData(
        isFromReqHistory
          ? reqHistoryData
          : isFromPayments
          ? reqPaymentData
          : tableData
      );
      if (customData) {
        return (
          <span className="text-blue-400 text-base font-normal ml-2">
            {customData}
          </span>
        );
      } else if (message) {
        return (
          <span className="text-base font-normal ml-2 mt-2 text-red-700">
            {message}
          </span>
        );
      }
    };

    return (
      <>
        {isDateRange ? (
          <RangePicker
            open={true}
            className="h-10"
            onChange={handleDate}
            disabledDate={disabledDate}
          />
        ) : (
          <>
          <AntdSelectFilter
            placeholder="Select Duration"
            // options={daysList}
            options={options}
            onStatusChange={onStatusFilterChange}
            value={getValuesOfFilter()}
          />
            {
              displayMessage()
            }
          </>
        )}
      </>
    );
}

export default QuickBookStatusFilter

QuickBookStatusFilter.propTypes = {
    onDateChange : PropTypes.func, 
    message : PropTypes.string,
    options : PropTypes.array,
    isFromReqHistory : PropTypes.bool,
    isFromPayments : PropTypes.bool
};

QuickBookStatusFilter.defaultProps = {
    isFromReqHistory : false,
    isFromPayments : false
};