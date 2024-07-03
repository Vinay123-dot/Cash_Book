import React, { useEffect, useState } from "react";
import QuickBookHeader from "../QuickBook/components/QuickBookHeader";
import QuickBookTools from "../QuickBook/components/QuickBookTools";
import QuickBookTable from "../QuickBook/components/QuickBookTable";
import AdaptableCard from "../components/shared/AdaptableCard";
import { injectReducer } from "../store/index";
import reducer from "./store/index";
import PageNotFound from "../PageNotFound";
import Loader from "../components/shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { 
  apiGetBookTypeInfo,
  apiGetDayInfo,
  apiGetTerminal,
  apiGetPettyCashReason,
  apiGetDepositTypeInfo,
  apiGetDepositModeInfo,
  apiGetPaymentTypeInfo,
  apiGetUPITypeInfo,
  apiGetCustomerTypeInfo,
  apiGetSalesTypeInfo
} from "../services/TransactionService";
import { 
  setBookTypeList,
  setDayInfoList,
  setOutletsList ,
  setReasonsList,
  setDepositTypeArray,
  setDepositModeArray,
  setPaymentTypeInfo,
  setUpiTypeInfo,
  setCustomerListInfo,
  setSalesType
} from "./store/stateSlice";


injectReducer('quickbookStore', reducer);

const userList = ["4", "7"];

const Quickbook = () => {

  const dispatch = useDispatch();
  const mainPageLoader = useSelector(state => state.quickbookStore.state.mainPageLoader);
  let uniqueId = localStorage.getItem("uniqueId");
  let userType = localStorage.getItem("mType");
  let merchantId = localStorage.getItem("mId");

  useEffect(() => {

    if(userList.includes(userType)) {
      getOutletsList();
      getPettycashReasons();
      getBookTypeInfo();
      getDayInfo();
      fetchDepositTypeList();
      fetchDepositModeList();
      fetchPaymentTypeInfo();
      getUpiTypeInfo();
      getCustomerTypeInfo();
      getsalesTypesInfo();
    }

  },[userType])

  const getBookTypeInfo = async() => {
    try{
      let response = await apiGetBookTypeInfo();
      dispatch(setBookTypeList(response?.data || []));
    }catch(e){}
  }
  
  const getDayInfo = async() => {
    try{
      let response = await apiGetDayInfo();
      dispatch(setDayInfoList(response?.data || []));
    }catch(e){}
  }

  const getOutletsList = async () => {
    // let options = {
    //   Branch_Name : "ALL",Id : 0,Mobile_No : "91-9999999999",Sequence_No : "000",Terminal : "ALL"
    // };
    let newId = userType == 4 ? uniqueId : merchantId;
    let response = await apiGetTerminal(newId);
    dispatch(setOutletsList(response || []));
  }

  const getPettycashReasons = async () => {
    let response = await apiGetPettyCashReason(uniqueId);
    dispatch(setReasonsList(response || []));
  }


  const fetchDepositTypeList = async () => {
    try{
      let response = await apiGetDepositTypeInfo();
      dispatch(setDepositTypeArray(response?.data || []));
    }catch(e){}
  }

  const fetchDepositModeList = async () => {
    try{
      let response = await apiGetDepositModeInfo();
      dispatch(setDepositModeArray(response?.data || []));
    }catch(e){}
  }

  const fetchPaymentTypeInfo = async () => {
    try {
      let response = await apiGetPaymentTypeInfo();
      dispatch(setPaymentTypeInfo(response?.data || []));
    }catch(e){

    }
  }

  const getUpiTypeInfo = async () => {
    try {
        let response = await apiGetUPITypeInfo();
        dispatch(setUpiTypeInfo(response?.data || []));
    } catch (e) { }
  }

  const getCustomerTypeInfo = async () => {
    try {
        let response = await apiGetCustomerTypeInfo();
        dispatch(setCustomerListInfo(response?.data || []));
    } catch (e) { }
  }

  const getsalesTypesInfo = async () => {
    try {
      let response = await apiGetSalesTypeInfo();
      dispatch(setSalesType(response?.data || []));
    }catch(e){

    }
  }

 
  return !userList.includes(userType) ? <PageNotFound /> :
    <AdaptableCard className="h-full overflow-hidden border-0 rounded-none" bodyClass="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  md:gap-8 px-10 py-4">
        <p className="text-black text-opacity-100 text-2xl font-bold leading-10 col-start-1 col-span-0 xl:col-span-1">Cash Book</p>
     
        <QuickBookHeader/>
      </div>
      <hr className="border border-[#F4F6F9]" />
      <AdaptableCard
        className="h-full pt-4 border-0 rounded-none"
        bodyClass="h-full p-0"
      >
        <QuickBookTools />
        <QuickBookTable />
      </AdaptableCard>
      <Loader showLoading = {mainPageLoader}/>
    </AdaptableCard>



}

export default Quickbook;