import React, { useState, useEffect } from "react";
import { Select, Input } from 'antd';
import { Options } from "../../Constants";
import CButton from "../../components/ui/Button";
// import Input from "../../components/ui/Input";
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
import { CashBookFilter, TimePeriod } from "../../constants/options.constant";





const QuickBookTools = () => {

  const dispatch = useDispatch()
  const { getTerminalList } = useTransactionUpdate();

  const [outletList, setOutletList] = useState([]);
  let userType = localStorage.getItem("mType");
  const tableData = useSelector((state) => state.quickbookStore.data.tableData);
  const filterData = useSelector((state) => state.quickbookStore.data.filterData);
  const outletData = useSelector((state) => state.quickbookStore.data.outletData);
  const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);

console.log("CASHBook",cashbookData)
  useEffect(() => {
    userType === '4' && getOutletsList();
  }, [userType]);

  const getOutletsList = async () => {
    let options = [{ value: 0, label: "All" }];
    let response = await getTerminalList();
    response?.data?.listObj.map((data) => {
      options.push({ value: data?.id, label: data?.value.split(" ").pop() })
    })
    setOutletList(options);
  }


  const handleView = async () => {
    const payload = cloneDeep(tableData)
    // if (payload?.historyType <= 0) {
    //     setMessage('Please select duration')
    //     return
    // }
    const newTableData = cloneDeep(payload)
    const newFilterData = cloneDeep(filterData)
    const newOutletData = cloneDeep(outletData)
    
    dispatch(getTransactions({ ...newTableData, ...newFilterData, ...newOutletData }))
  }
  const handleInputChange = (e) => {
    const {value : val} = e.target;
    const newTableData = cloneDeep(tableData)
    newTableData.searchData = val
    if (typeof val === 'string' && val.length > 1) {
      dispatch(setTableData(newTableData))
    }
    if (typeof val === 'string' && val.length === 0) {
      dispatch(setTableData(newTableData))
    }
  }

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
    newFilterData.status = val
    dispatch(setFilterData(newFilterData))
  }

  const handleOutletStatusChange = (val) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newOutletData = cloneDeep(outletData);
    newOutletData.terminalID = val;
    dispatch(setOutletData(newOutletData));
  }

  const handleCashBookChange = (val) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageNumber = 0;
    dispatch(setTableData(newTableData));
    const newCashbookData = cloneDeep(cashbookData);
    newCashbookData.cId = val;
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
  //   const newOutletData = cloneDeep(outletData)
  //   dispatch(getTransactions({ ...newTableData, ...newFilterData, ...newOutletData }))
  // }

  return (
    <div className="xl:flex justify-between py-4 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mb-10 md:mb-2">
        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Cash Book"
            options={CashBookFilter}
            onStatusChange={handleCashBookChange}
            value = {cashbookData.cId}
          />
        </div>

        <div className="flex flex-col">
          <AntdSelectFilter
            placeholder="Select Duration"
            options={TimePeriod}
            onStatusChange={handleTimeperiodChange}
            value = {filterData.status}
          />
        </div>
        {
          userType === "4" &&
          <div className="flex flex-col">
            <AntdSelectFilter
              placeholder="Select Outlet"
              options={outletList}
              onStatusChange={handleOutletStatusChange}
              value = {outletData.terminalID}
            />
          </div>
        }
        <div className="flex flex-col">
          <Input
            prefix={searchPrefix}
            placeholder="Search"
            className="w-full md:w-44"
            onChange = {handleInputChange}
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