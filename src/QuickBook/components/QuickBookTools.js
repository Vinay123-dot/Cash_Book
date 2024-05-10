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
  apiGetTerminalList
} from "../../services/TransactionService";
import FileSaver from 'file-saver';
import { getFormatDate} from "../../utils/dateFormatter"

const QuickBookTools = () => {

  const dispatch = useDispatch();
  const { getTerminalList } = useTransactionUpdate();

  const [outletList, setOutletList] = useState([]);
  const [daysList,setDaysList] = useState([]);
  const[bookTypeList,setBookTypeList] = useState([]);
  const [errorMessage,setErrorMessage] = useState("");
  const [durationErrMsg,setDurationErrMsg] = useState("");
  const tableData = useSelector((state) => state.quickbookStore.data.tableData);
  const filterData = useSelector((state) => state.quickbookStore.data.filterData);
  // const outletData = useSelector((state) => state.quickbookStore.data.outletData);
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
    // let options = [{ value: 0, label: "All" }];
    let response = await apiGetTerminalList();
    // response?.data?.listObj.map((data) => {
    //   options.push({ value: data?.id, label: data?.value.split(" ").pop() })
    // })
    setOutletList(response?.data || []);
  }


  const handleView = async () => {
    const payload = cloneDeep(tableData);
    const newFilterData = cloneDeep(filterData);
    const newCashBookData = cloneDeep(cashbookData);

    if(newCashBookData?.book_type <= 0){
      setErrorMessage('Please select cashbook')
      return;
    }
  
    if (newFilterData?.history_type <= 0) {
      console.log("TEST")
        setDurationErrMsg('Please select duration')
        return;
    }
    setErrorMessage("");
    setDurationErrMsg("");
    const newTableData = cloneDeep(payload);
    // const newFilterData = cloneDeep(filterData);
    // const newOutletData = cloneDeep(outletData);
    let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
    let newObj = { 
      ...newTableData, 
      ...newFilterData,
      ...newCashBookData,
      book_type:bookTypeInStrng?.Type,
      terminal_id:uniqueId,
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

  // const handleOutletStatusChange = (val) => {
  //   const newTableData = cloneDeep(tableData);
  //   newTableData.pageNumber = 0;
  //   dispatch(setTableData(newTableData));
  //   const newOutletData = cloneDeep(outletData);
  //   newOutletData.terminalID = val;
  //   dispatch(setOutletData(newOutletData));
  // }

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
  const handleDownload = async () => {
    const payload = cloneDeep(tableData);
    const newFilterData = cloneDeep(filterData);
    const newCashBookData = cloneDeep(cashbookData);

    if(newCashBookData?.book_type <= 0){
      setErrorMessage('Please select cashbook')
      return;
    }
  
    if (newFilterData?.history_type <= 0) {
      console.log("TEST")
        setDurationErrMsg('Please select duration')
        return;
    }
    setErrorMessage("");
    setDurationErrMsg("");
    const newTableData = cloneDeep(payload);
    // const newFilterData = cloneDeep(filterData);
    // const newOutletData = cloneDeep(outletData);
    let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
    let newObj = { 
      ...newTableData, 
      ...newFilterData,
      ...newCashBookData,
      book_type:bookTypeInStrng?.Type,
      terminal_id:uniqueId,
      key: uniqueId
      }
      getTransactionHistory(newObj);
  }

  const getTransactionHistory = async (values) => {
    try {
     
        const resp = await apiGetTransactionHistory(values,uniqueId);
        if (resp.data) {
          console.log("resData",resp)
            dispatch(setTransactionsLoading(true))
            let data = new Blob([resp.data], {
                type: 'application/vnd.ms-excel;charset=charset=utf-8',
                // type: 'application/vnd.ms-excel'
            })

            FileSaver.saveAs(
                data,
                `Transaction_Report_${getFormatDate(
                    new Date(),
                    'DD_MM_YYYY_HH_mm_ss'
                )}.xls`
            )
            // const blob = new Blob([resp.data], {
            //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            // });
            // FileSaver.saveAs(
            //   blob,
            //   `Transaction_Report_${getFormatDate(new Date(), 'DD_MM_YYYY_HH_mm_ss')}.xlsx`
            // );
            setTimeout(() => dispatch(setTransactionsLoading(false)), 50)
            return {
                status: 'success',
                message: '',
            }
        }
    } catch (errors) {
        setTimeout(() => dispatch(setTransactionsLoading(false)), 50)
        return {
            status: 'failed',
            message:
                errors?.response?.data?.error?.errorMessage ||
                errors.toString(),
        }
    }
}


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