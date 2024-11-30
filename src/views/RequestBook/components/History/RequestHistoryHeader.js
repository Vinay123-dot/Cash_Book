import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import { setReqHistoryData } from "views/RequestBook/store/dataSlice";
import QuickBookStatusFilter from "QuickBook/components/QuickBookStatusFilter";
import Button from "components/ui/NewButton";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";
import useFetchReqBook from "../useFetchReqBook";
import { MERCHANT_ID } from "constants/app.constant";

const RequestHistoryHeader  = () => {

    const dispatch = useDispatch();
    const { 
      viewRequestReports
    } = useFetchReqBook();
    const { 
        reqHistoryData 
    } = useSelector(state => state.requestBook.reqData);
    const { 
        dayInfoList,
        bookTypeList,
        allTerminalList
    } = useSelector((state) => state.quickbookStore.state);
    let userType = localStorage.getItem("mType");

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

    const handleOutletStatusChange = (val) => {
      const newHistoryData = cloneDeep(reqHistoryData);
      newHistoryData.terminal_id = val;
      dispatch(setReqHistoryData(newHistoryData));
   };

    const paymentFlag = () => !!(reqHistoryData.fromDate || reqHistoryData.toDate);
    const checkValues = () => !!(reqHistoryData.book_type && reqHistoryData.history_type);
    const getViewBtnCls = checkValues() ? ENABLED_STYLE : DISABLED_STYLE;
  

    return (
      <div className="realtive w-full gap-2 flex flex-row justify-start sm:justify-end flex-wrap">
        <div className="flex flex-col w-40">
            <AntdSelectFilter
              placeholder="Select Book Type"
              options={bookTypeList}
              onStatusChange={handleCashBookChange}
              value={reqHistoryData.book_type}
            />
          </div>
        <div className="flex flex-col w-40">
          <QuickBookStatusFilter
            isFromReqHistory = {paymentFlag()}
            onDateChange = {handleDateChange}
            message = {""}
            options = {dayInfoList}
          />
        </div>
        {
          userType === MERCHANT_ID &&
          <div className="flex flex-col w-40">
            <AntdSelectFilter
              placeholder="Select Outlet"
              options={allTerminalList}
              onStatusChange={handleOutletStatusChange}
              value = {reqHistoryData.terminal_id}
            />
          </div>
        }
        <div className="self-start">
          <Button
            type="button"
            className={getViewBtnCls}
            isDisabled={!checkValues()}
            onClick={viewRequestReports}
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