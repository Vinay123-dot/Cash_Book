import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
// import PropTypes from "prop-types";
// import { cloneDeep } from "lodash";
// import Input from "components/ui/Input";
import QuickBookStatusFilter from "QuickBook/components/QuickBookStatusFilter";
// import { setReqPaymentData } from "../store/dataSlice";
import Button from "components/ui/NewButton";
import { DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
// import DatePicker from "components/ui/Datepicker";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";
// import { setReqHistoryData } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { setReqHistoryData } from "views/RequestBook/store/dataSlice";

const RequestHistoryHeader  = () => {

    const dispatch = useDispatch();
    const { 
        reqHistoryData 
    } = useSelector(state => state.requestBook.reqData);
    const { 
        dayInfoList,
        bookTypeList
    } = useSelector((state) => state.quickbookStore.state);

    const handleDateChange = (val) => {
      const newHistoryData = cloneDeep(reqHistoryData);
      newHistoryData.history_type = val?.historyType;
      newHistoryData.fromDate = val?.fromDate;
      newHistoryData.toDate = val?.toDate;
      dispatch(setReqHistoryData(newHistoryData));
    };

    const handleCashBookChange = (val) => {
       const newHistoryData = cloneDeep(reqHistoryData);
       let findObj = bookTypeList.find((eachDoc) => eachDoc.Id === val);
       newHistoryData.book_type = val;
       newHistoryData.book_name = findObj?.Type;
       dispatch(setReqHistoryData(newHistoryData));
    };

    const paymentFlag = () => !!(reqHistoryData.fromDate || reqHistoryData.toDate);
    const checkValues = () => !!(reqHistoryData.book_type && reqHistoryData.history_type);
    const getViewBtnCls = checkValues() ? ENABLED_STYLE : DISABLED_STYLE;
  

    return (
      <div className="realtive w-full gap-2 flex flex-row justify-start sm:justify-end flex-wrap">
        <div className="flex flex-col w-36">
            <AntdSelectFilter
              placeholder="Select Book Type"
              options={bookTypeList}
              onStatusChange={handleCashBookChange}
              value={reqHistoryData.book_type}
            />
          </div>
        <div className="flex flex-col w-36">
          <QuickBookStatusFilter
            isFromReqHistory = {paymentFlag()}
            onDateChange = {handleDateChange}
            message = {""}
            options = {dayInfoList}
          />
        </div>
        <div className="self-start">
          <Button
            type="button"
            className={getViewBtnCls}
            isDisabled={!checkValues()}
            // onClick={handleGetPartyCodeList}
          >
            View
          </Button>
        </div>
      </div>
    );
};

export default RequestHistoryHeader;

// RequestHistoryHeader.propTypes = {
//     handleGetPartyCodeList : PropTypes.func
// };