import React, { useState, useEffect } from "react";
import {Input, message } from 'antd';
import CButton from "../../components/ui/Button";
import AntdSelectFilter from "../../components/ui/AntdSelect/AntdSelect";
import { viewBtnPrefix, dwnBtnPrefix, searchPrefix } from "../../Prefixes/QuickBookToolsPrefix";
import useTransactionUpdate from "../../utils/hooks/useTransactionUpdate";
import {
  setTableData,
  setFilterData,
  getTransactions,
  setOutletData,
  setCashBookData,
  setTransactionsLoading,
  setTransactionArray
} from '../store/dataSlice';
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep';
import { 
  apiGetBookTypeInfo, 
  apiGetDayInfo, 
  apiGetTransactionHistory ,
  apiGetTerminal
} from "../../services/TransactionService";
import FileSaver from 'file-saver';
import { getFormatDate} from "../../utils/dateFormatter"
import appConfig from "../../configs/app.config";

const QuickBookTools = () => {

  const dispatch = useDispatch();

  const [outletList, setOutletList] = useState([]);
  const [daysList,setDaysList] = useState([]);
  const[bookTypeList,setBookTypeList] = useState([]);
  const [errorMessage,setErrorMessage] = useState("");
  const [durationErrMsg,setDurationErrMsg] = useState("");
  const [terminalErrMsg,setTerminalErrMsg] = useState("");
  const tableData = useSelector((state) => state.quickbookStore.data.tableData);
  const filterData = useSelector((state) => state.quickbookStore.data.filterData);
  const outletData = useSelector((state) => state.quickbookStore.data.outletData);
  const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
  let userType = localStorage.getItem("mType");
  let uniqueId = localStorage.getItem("uniqueId");


  useEffect(() => {
    userType === '4' && getOutletsList();
    getBookTypeInfo();
    getDayInfo();
  }, [userType]);

  
  const getBookTypeInfo = async() => {
    try{
      let response = await apiGetBookTypeInfo();
      setBookTypeList(response?.data || []);
    }catch(e){}
  }

  const getDayInfo = async() => {
    try{
      let response = await apiGetDayInfo();
      setDaysList(response?.data || []);
    }catch(e){}
  }

  const getOutletsList = async () => {
    let options = {
      Branch_Name : "ALL",Id : 0,Mobile_No : "91-9999999999",Sequence_No : "000",Terminal : "ALL"
    };
    let response = await apiGetTerminal(uniqueId);
    
    setOutletList([options,...response] || []);
  }
 
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
    if( userType == 4 && newOutletData?.terminal_id < 0) {
      setTerminalErrMsg('Please Select terminal')
      return;
    }
    setErrorMessage("");
    setDurationErrMsg("");
    setTerminalErrMsg("");
    const newTableData = cloneDeep(payload);
    let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
    let newObj = { 
      ...newTableData, 
      ...newFilterData,
      ...newCashBookData,
      ...newOutletData,
      book_type:bookTypeInStrng?.Type,
      terminal_id: userType == 7? uniqueId : newOutletData.terminal_id ,
      key: uniqueId
      }
    dispatch(getTransactions(newObj));
  }
  // const handleInputChange = (e) => {
  //   const {value : val} = e.target;
  //   const newTableData = cloneDeep(tableData)
  //   newTableData.searchData = val
  //   if (typeof val === 'string' && val.length > 1) {
  //     dispatch(setTableData(newTableData))
  //   }
  //   if (typeof val === 'string' && val.length === 0) {
  //     dispatch(setTableData(newTableData))
  //   }
  // }

  // const handleDateChange = (val) => {
  //   const newTableData = cloneDeep(tableData)
  //   newTableData.historyType = val?.historyType
  //   newTableData.fromDate = val?.fromDate
  //   newTableData.toDate = val?.toDate
  //   newTableData.pageNumber = 0
  //   dispatch(setTransactions({ historyType: newTableData.historyType }))
  //   dispatch(setTableData(newTableData))
  // }

  const handleTimeperiodChange = (val) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newFilterData = cloneDeep(filterData);
    newFilterData.history_type = val;
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
    let newObj = { 
      ...newTableData, 
      ...newFilterData,
      ...newCashBookData,
      ...newOutletData,
      book_type:bookTypeInStrng?.Type,
      terminal_id: userType == 7 ? uniqueId : newOutletData.terminal_id ,
      key: uniqueId
      }
      getTransactionHistory(newObj);
  }

  const getTransactionHistory = async (allData) => {
    const {book_type,history_type} = allData;
    const tId = userType == 4? 0 : uniqueId;
    // dispatch(setTransactionsLoading(true));
    let url = `${appConfig.apiPrefix}/v21/book_type/download_book?book_type=${book_type}&history_type=${history_type}&key=${uniqueId}&terminal_id=${tId}`;
   
    const link = document.createElement('a');
    link.href = url;
  // link.setAttribute('download', 'filename.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // setTimeout(() => dispatch(setTransactionsLoading(false)), 12000);

  
  };



  return (
    <div className="xl:flex justify-between py-4 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mb-10 md:mb-2">
        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Cash Book"
            options={bookTypeList}
            onStatusChange={handleCashBookChange}
            value = {cashbookData.book_type}
            message = {errorMessage}
          />
        </div>

        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Duration"
            options={daysList}
            onStatusChange={handleTimeperiodChange}
            value = {filterData.history_type}
            message = {durationErrMsg}
          />
        </div>
        {
          userType === "4" &&
          <div className="flex flex-col">
            <AntdSelectFilter
              placeholder="Select Outlet"
              options={outletList}
              onStatusChange={handleOutletStatusChange}
              value = {outletData.terminal_id}
              message = {terminalErrMsg}
            />
          </div>
        }
        {/* <div className="flex flex-col">
          <Input
            prefix={searchPrefix}
            placeholder="Search"
            className="w-full md:w-44"
            // onChange = {handleInputChange}
          />
        </div> */}
      </div>
      <CButton
        onClick={handleView}
        className="mr-5"
      >
        {viewBtnPrefix} View
      </CButton>
      <CButton onClick={handleDownload}>
        {dwnBtnPrefix} Download
      </CButton>
    </div>


  )



}

export default QuickBookTools;


  // const handleDownload = async () => {
  //   const payload1 = cloneDeep(tableData)
  //   const payload2 = cloneDeep(filterData)
  //   const payload3 = cloneDeep(outletData)
  //   const payload = { ...payload1, ...payload2, ...payload3 }
  //   if (payload?.historyType <= 0) {
  //     setMessage('Please select duration')
  //     return
  //   }
  //   payload.recordsPerPage = -1
  //   payload.pageNumber = 0
  //   await getTransactionHistory(payload)
  // }

  // const handleDownload = async () => {
  //   const payload = cloneDeep(tableData);
  //   console.log("pp",payload)
  
  //   // if (payload?.historyType <= 0) {
  //   //     setMessage('Please select duration')
  //   //     return
  //   // }
  //   const newTableData = cloneDeep(payload);
  //   const newFilterData = cloneDeep(filterData);
  //   const newCashBookData = cloneDeep(cashbookData);
  //   // const newOutletData = cloneDeep(outletData);
  //   let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
  //   getTransactionHistory({ ...newTableData, ...newFilterData,...newCashBookData,book_type:bookTypeInStrng?.Type})

  // }
