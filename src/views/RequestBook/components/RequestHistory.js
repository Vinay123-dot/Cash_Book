import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import classNames from "classnames";
import HistoryTable from "./HistoryTable";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";
import QuickBookStatusFilter from "QuickBook/components/QuickBookStatusFilter";
import { setHistoryArr, setReqHistoryData } from "../store/dataSlice";
import Button from "components/ui/NewButton";
import { apiDeleteRequestBook } from "services/TransactionService";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { setManageModal, setManageRequestModal } from "../store/stateSlice";
import useFetchReqBook from "./useFetchReqBook";

const RequestHistory = () => {

    const dispatch = useDispatch();
    const { viewRequestReports } = useFetchReqBook();
    const { bookTypeList,dayInfoList } = useSelector((state) => state.quickbookStore.state);
    const { reqHistoryData } = useSelector(state => state.requestBook.reqData);
    const userType = localStorage.getItem("mType");

    useEffect(() => {
      return () => dispatch(setReqHistoryData({}))
    },[])
    
  const handleDateChange = (val) => {
    const newHistoryData = cloneDeep(reqHistoryData);
    newHistoryData.history_type = val?.historyType;
    newHistoryData.fromDate = val?.fromDate;
    newHistoryData.toDate = val?.toDate;
    dispatch(setReqHistoryData(newHistoryData));
  }

  const handleCashBookChange = (val) => {
    const newHistoryData = cloneDeep(reqHistoryData);
    let findObj = bookTypeList.find((eachDoc) => eachDoc.Id === val);
    newHistoryData.book_type = val;
    newHistoryData.book_name = findObj?.Type
    dispatch(setReqHistoryData(newHistoryData));
  };
  const checkValues = () =>  !!(reqHistoryData.book_type && reqHistoryData.history_type);
  const manageLoader = (flag) => dispatch(setMainPageLoader(flag));



  const onDeleteReport = async(selectedId) => {
    try {
      manageLoader(true);
      let response = await apiDeleteRequestBook([selectedId]);
      dispatch(
        setManageModal({
          showErrModal: true,
          getRequestBook : true,
          ErrModalMsg: "The selected record is deleted sucessfully",
        })
      );
      manageLoader(false);
    } catch (Err) {
      dispatch(setHistoryArr([]));
      dispatch(
        setManageModal({
          showErrModal: false,
          ErrModalMsg: "",
        })
      );
      manageLoader(false);
    }
  }

  const onChangeStatus = (val) => {
    console.log("v",val)
  }

  const getViewBtnCls = 
    classNames(
      "relative shadow-lg text-white text-sm font-medium h-10 rounded-md w-36  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-r",
      !checkValues() &&
        "from-gray-500 to-gray-700  hover:from-gray-400 hover:to-gray-500  focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-not-allowed",
      checkValues() &&
        "from-green-500 to-green-700  hover:from-green-400 hover:to-green-500  focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
    );
    return (
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex-none pt-2 pr-4 flex space-x-4 justify-end">
          <div className="flex flex-col">
            <AntdSelectFilter
              placeholder="Select Book Type"
              options={bookTypeList}
              onStatusChange={handleCashBookChange}
              value={reqHistoryData.book_type}
            />
          </div>
          <div className="flex flex-col">
            <QuickBookStatusFilter
              isFromReqHistory={true}
              onDateChange={handleDateChange}
              message={""}
              options={dayInfoList}
              // disableMsg = {true}
            />
          </div>
    
          <Button
            className={getViewBtnCls}
            isDisabled={!checkValues()}
            onClick={viewRequestReports}
          >
            View
          </Button>
        </div>
    
        {/* Table Section */}
        <div className="flex-1 overflow-y-auto">
        <HistoryTable 
          handleChangeStatus = {onChangeStatus}
          handleDeleteReport={onDeleteReport} 
        />
        </div>
    
        {/* Footer Section */}
        <div className="flex-none px-4 flex justify-end items-center gap-5 h-[150px]">
          <Button
            className={classNames(
              "relative shadow-lg text-black text-sm font-medium h-10 rounded-md w-36 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-r",
              "focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer border-2 border-black"
            )}
            type="cancel"
            onClick = {() =>dispatch(setManageRequestModal(false))}
          >
            Cancel
          </Button>
          {
            userType != 7 &&
            <Button
              btnType="submit"
              className={classNames(
                "relative shadow-lg text-white text-sm font-medium h-10 rounded-md w-36 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-r",
                "from-[#5A87B2] to-[#5A87B2] hover:from-[#5A87B2] hover:to-[#5A87B2] focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
              )}
            >
              Save
            </Button>
          }
          
        </div>
      </div>
    );
};

export default RequestHistory;