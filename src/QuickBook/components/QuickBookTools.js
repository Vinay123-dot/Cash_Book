import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Input } from "antd";
import CButton from "components/ui/Button";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";
import {
  viewBtnPrefix,
  dwnBtnPrefix,
  searchPrefix
} from "Prefixes/QuickBookToolsPrefix";
import {
  setTableData,
  setFilterData,
  getTransactions,
  setOutletData,
  setCashBookData,
  setTransactionArray,
  setMainPageLoader
} from '../store/dataSlice';
import cloneDeep from 'lodash/cloneDeep';
import appConfig from "configs/app.config";
import QuickBookStatusFilter from "./QuickBookStatusFilter";
import { MERCHANT_ID } from "constants/app.constant";


const QuickBookTools = () => {

  const dispatch = useDispatch();
  const [outletList, setOutletList] = useState([]);
  const [daysList,setDaysList] = useState([]);
  const [errorMessage,setErrorMessage] = useState("");
  const [durationErrMsg,setDurationErrMsg] = useState("");
  const [terminalErrMsg,setTerminalErrMsg] = useState("");
  const tableData = useSelector((state) => state.quickbookStore.data.tableData);
  const filterData = useSelector((state) => state.quickbookStore.data.filterData);
  const outletData = useSelector((state) => state.quickbookStore.data.outletData);
  const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
  const bookTypeList = useSelector((state) => state.quickbookStore.state.bookTypeList);
  const { 
    dayInfoList,
    allTerminalList
  } = useSelector(state => state.quickbookStore.state);
  let userType = localStorage.getItem("mType");
  let uniqueId = localStorage.getItem("uniqueId");

  useEffect(() => {
    setDaysList(dayInfoList || []);
    setOutletList(allTerminalList || []);
  }, [dayInfoList,allTerminalList]);

 
  const handleView = async () => {
    const payload = cloneDeep(tableData);
    const newFilterData = cloneDeep(filterData);
    const newCashBookData = cloneDeep(cashbookData);
    const newOutletData = cloneDeep(outletData);

    if(newCashBookData?.book_type <= 0){
      setErrorMessage('Please select cashbook')
      return;
    }
  
    if (newFilterData?.history_type <= 0) {
        setDurationErrMsg('Please select duration')
        return;
    }
    if( userType === MERCHANT_ID && newOutletData?.terminal_id < 0) {
      setTerminalErrMsg('Please Select terminal')
      return;
    }
    setErrorMessage("");
    setDurationErrMsg("");
    setTerminalErrMsg("");
    const newTableData = cloneDeep(payload);
    let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
    let outletInStrng = (outletList || []).find((eachItem) => eachItem.Id === newOutletData.terminal_id);
    let newObj = { 
      ...newTableData, 
      ...newFilterData,
      ...newCashBookData,
      ...newOutletData,
      book_type:bookTypeInStrng?.Type,
      terminal_id: userType == 7? uniqueId : outletInStrng.Terminal ,
      key: uniqueId
      }
    dispatch(getTransactions(newObj));
  }


  const handleDateChange = (val) => {
    
    const newTableData = cloneDeep(tableData);
    newTableData.history_type = val?.historyType;
    newTableData.fromDate = val?.fromDate;
    newTableData.toDate = val?.toDate;
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newFilterData = cloneDeep(filterData);
    newFilterData.history_type = val?.historyType;
    dispatch(setFilterData(newFilterData));
    setDurationErrMsg("");
  }

  const handleOutletStatusChange = (val) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newOutletData = cloneDeep(outletData);
    newOutletData.terminal_id = val;
    dispatch(setOutletData(newOutletData));
    setTerminalErrMsg("");
  }

  const handleInputChange = (ev) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    newTableData.filter_value = ev.target.value;
    dispatch(setTableData(newTableData));
    setTerminalErrMsg("");
  }

  const handleCashBookChange = (val) => {
    dispatch(setTransactionArray());
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newCashbookData = cloneDeep(cashbookData);
    newCashbookData.book_type = val;
    dispatch(setCashBookData(newCashbookData));
    setErrorMessage("");
  }
  const handleDownload = async () => {
    const payload = cloneDeep(tableData);
    const newFilterData = cloneDeep(filterData);
    const newCashBookData = cloneDeep(cashbookData);
    const newOutletData = cloneDeep(outletData);

    if(newCashBookData?.book_type <= 0){
      setErrorMessage('Please select cashbook')
      return;
    }
  
    if (newFilterData?.history_type <= 0) {
        setDurationErrMsg('Please select duration')
        return;
    }
    if (userType == 4 && newOutletData?.terminal_id < 0) {
      setDurationErrMsg('Please select terminal')
      return;
  }
    setErrorMessage("");
    setDurationErrMsg("");
    setTerminalErrMsg("");
    const newTableData = cloneDeep(payload);
    let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
    let outletInStrng = (outletList || []).find((eachItem) => eachItem.Id === newOutletData.terminal_id);

    let newObj = { 
      ...newTableData, 
      ...newFilterData,
      ...newCashBookData,
      ...newOutletData,
      book_type:bookTypeInStrng?.Type,
      terminal_id: userType == 7 ? uniqueId : outletInStrng?.Terminal,
      key: uniqueId
      }
    
      getTransactionHistory(newObj);
  }

  const getTransactionHistory = async (allData) => {
    const { book_type, history_type,fromDate,toDate } = allData;
    let sendingTId = allData.terminal_id === "ALL" ? 0 : allData.terminal_id;
    const tId = userType == 4 ? sendingTId : uniqueId;
    dispatch(setMainPageLoader(true));
    let url;
    if(fromDate && toDate) {
      let hType = 0;
      url = `${appConfig.apiPrefix}/v21/book_type/download_book?book_type=${book_type}&history_type=${hType}&key=${uniqueId}&terminal_id=${tId}&start_date=${fromDate}&end_date=${toDate}`;
    }else{
      url = `${appConfig.apiPrefix}/v21/book_type/download_book?book_type=${book_type}&history_type=${history_type}&key=${uniqueId}&terminal_id=${tId}`;
    }
  

    try {
        const response = await fetch(url);
        if (!response.ok) {
          dispatch(setMainPageLoader(false));
            throw new Error('Network response was not ok');
        }

        // Read the response as a blob
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', book_type); // Specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the object URL after download
        URL.revokeObjectURL(blobUrl);

        // Disable loading state after download completes
        dispatch(setMainPageLoader(false));
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Disable loading state in case of error
        dispatch(setMainPageLoader(false));
    }
};


  const getBookTypeList = (booksArr,terminalObj) => {

    let temp = [];
    if(terminalObj.terminal_id == 0){
      temp = (booksArr || []).filter((eachItem) => eachItem.Id != 6);
    }else {
      temp = JSON.parse(JSON.stringify(booksArr));
    }
    return temp;
  }
  const getTerminalList = (terArr,bookObj) => {
    let temp = [];
    if(bookObj.book_type== 6){
      temp = (terArr || []).filter((eachItem) => eachItem.Id != 0);
    }else {
      temp = JSON.parse(JSON.stringify(terArr));
    }
    return temp;
  }

  return (
    <div className="xl:flex justify-between py-2 px-10">
      <div className={`grid grid-cols-1 md:grid-cols-3 ${userType == MERCHANT_ID ? 'lg:grid-cols-6' : 'lg:grid-cols-5'}`}>
        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Cash Book"
            options={getBookTypeList(bookTypeList,outletData)}
            onStatusChange={handleCashBookChange}
            value = {cashbookData.book_type}
          />
          <p className="text-base font-normal ml-2 mt-2 text-red-700">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col">
          <QuickBookStatusFilter
            onDateChange= {handleDateChange}
            message = {durationErrMsg}
            options={daysList}
          />
        </div>
        {
          userType === MERCHANT_ID &&
          <div className="flex flex-col">
            <AntdSelectFilter
              placeholder="Select Outlet"
              options={getTerminalList(outletList,cashbookData)}
              onStatusChange={handleOutletStatusChange}
              value = {outletData.terminal_id}
            />
            <p className="text-base font-normal ml-2 mt-2 text-red-700">
              {terminalErrMsg}
            </p>
          </div>
        }
        <div className="flex flex-col">
          <Input
            prefix={searchPrefix}
            placeholder="Search"
            className="w-full md:w-48 lg:w-44 h-10 mb-4 md:mb-0"
            onChange = {handleInputChange}
          />
        </div>
        <div className="flex flex-col">
        {
          cashbookData.book_type != 6 && 
          <CButton
            onClick={handleView}
            className="mr-5 w-40 h-9 rounded-md bg-[#5A87B2]"
          >
            {viewBtnPrefix} View
          </CButton>
        }
        </div>
        <div className="flex flex-col">
        <CButton onClick={handleDownload}>
          {dwnBtnPrefix} Download
        </CButton>
        </div>
        
       
      </div>
    </div>
  )
}

export default QuickBookTools;
