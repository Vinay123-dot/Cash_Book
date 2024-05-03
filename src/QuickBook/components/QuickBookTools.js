import React, { useState, useEffect } from "react";
import {Input } from 'antd';
import CButton from "../../components/ui/Button";
import AntdSelectFilter from "../../components/ui/AntdSelect/AntdSelect";
import { viewBtnPrefix, dwnBtnPrefix, searchPrefix } from "../../Prefixes/QuickBookToolsPrefix";
import useTransactionUpdate from "../../utils/hooks/useTransactionUpdate";
import {
  setTableData,
  setFilterData,
  getTransactions,
  setOutletData,
  setCashBookData
} from '../store/dataSlice';
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep';
import { apiGetBookTypeInfo, apiGetDayInfo } from "../../services/TransactionService";

const QuickBookTools = () => {

  const dispatch = useDispatch();
  const { getTerminalList } = useTransactionUpdate();

  const [outletList, setOutletList] = useState([]);
  const [daysList,setDaysList] = useState([]);
  const[bookTypeList,setBookTypeList] = useState([]);
  const tableData = useSelector((state) => state.quickbookStore.data.tableData);
  const filterData = useSelector((state) => state.quickbookStore.data.filterData);
  // const outletData = useSelector((state) => state.quickbookStore.data.outletData);
  const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
  let userType = localStorage.getItem("mType");


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
    let options = [{ value: 0, label: "All" }];
    let response = await getTerminalList();
    response?.data?.listObj.map((data) => {
      options.push({ value: data?.id, label: data?.value.split(" ").pop() })
    })
    setOutletList(options);
  }


  const handleView = async () => {
    const payload = cloneDeep(tableData);
    console.log("pp",payload)
  
    // if (payload?.historyType <= 0) {
    //     setMessage('Please select duration')
    //     return
    // }
    const newTableData = cloneDeep(payload);
    const newFilterData = cloneDeep(filterData);
    const newCashBookData = cloneDeep(cashbookData);
    // const newOutletData = cloneDeep(outletData);
    let bookTypeInStrng = bookTypeList.find((eachDoc)=>eachDoc.Id === newCashBookData.book_type);

    // dispatch(getTransactions({ ...newTableData, ...newFilterData, ...newOutletData }))
    dispatch(getTransactions({ ...newTableData, ...newFilterData,...newCashBookData,book_type:bookTypeInStrng?.Type}));
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
    dispatch(setFilterData(newFilterData))
  }

  // const handleOutletStatusChange = (val) => {
  //   const newTableData = cloneDeep(tableData);
  //   newTableData.pageNumber = 0;
  //   dispatch(setTableData(newTableData));
  //   const newOutletData = cloneDeep(outletData);
  //   newOutletData.terminalID = val;
  //   dispatch(setOutletData(newOutletData));
  // }

  const handleCashBookChange = (val) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newCashbookData = cloneDeep(cashbookData);
    newCashbookData.book_type = val;
    dispatch(setCashBookData(newCashbookData));
  }

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

  // const handleView = async () => {
  //   const payload = cloneDeep(tableData)
  //   if (payload?.historyType <= 0) {
  //     setMessage('Please select duration')
  //     return
  //   }
  //   const newTableData = cloneDeep(payload)
  //   const newFilterData = cloneDeep(filterData)
  //   // const newOutletData = cloneDeep(outletData)
  //   dispatch(getTransactions({ ...newTableData, ...newFilterData, ...newOutletData }))
  // }

  return (
    <div className="xl:flex justify-between py-4 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mb-10 md:mb-2">
        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Cash Book"
            options={bookTypeList}
            onStatusChange={handleCashBookChange}
            value = {cashbookData.book_type}
          />
        </div>

        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Duration"
            options={daysList}
            onStatusChange={handleTimeperiodChange}
            value = {filterData.history_type}
          />
        </div>
        {/* {
          userType === "4" &&
          <div className="flex flex-col">
            <AntdSelectFilter
              placeholder="Select Outlet"
              options={outletList}
              onStatusChange={handleOutletStatusChange}
              value = {outletData.terminalID}
            />
          </div>
        } */}
        <div className="flex flex-col">
          <Input
            prefix={searchPrefix}
            placeholder="Search"
            className="w-full md:w-44"
            // onChange = {handleInputChange}
          />
        </div>
      </div>
      <CButton
        onClick={handleView}
        className="mr-5"
      >
        {viewBtnPrefix} View
      </CButton>
      <CButton onClick={() => console.log("clicked Download")}>
        {dwnBtnPrefix} Download
      </CButton>
    </div>


  )



}

export default QuickBookTools;