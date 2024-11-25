import React from "react";
import { useDispatch } from "react-redux";
import {
  apiGetBookTypeInfo,
  apiGetCustomerTypeInfo,
  apiGetDayInfo,
  apiGetDepositModeInfo,
  apiGetDepositTypeInfo,
  apiGetPaymentTypeInfo,
  apiGetPettyCashReason,
  apiGetSalesTypeInfo,
  apiGetTerminal,
  apiGetUPITypeInfo,
} from "services/TransactionService";
import {
  setBookTypeList,
  setDayInfoList,
  setAllTerminalsList,
  setReasonsList,
  setDepositTypeArray,
  setDepositModeArray,
  setPaymentTypeInfo,
  setUpiTypeInfo,
  setCustomerListInfo,
  setSalesType,
} from "QuickBook/store/stateSlice";

function useFetchMasterData() {

  const dispatch = useDispatch();
  const userType = localStorage.getItem("mType");
  const uniqueId = localStorage.getItem("uniqueId");
  const merchantId = localStorage.getItem("mId");
  
  const getBookTypeInfo = async () => {
    try {
      let response = await apiGetBookTypeInfo();
      dispatch(setBookTypeList(response?.data || []));
    } catch (e) {}
  };

  const getDayInfo = async () => {
    try {
      let response = await apiGetDayInfo();
      dispatch(setDayInfoList(response?.data || []));
    } catch (e) {}
  };

  const getOutletsList = async () => {
    let newId = userType == 4 ? uniqueId : merchantId;
    let response = await apiGetTerminal(newId);
    dispatch(setAllTerminalsList(response || []));
  };

  const getPettycashReasons = async () => {
    let response = await apiGetPettyCashReason(uniqueId);
    dispatch(setReasonsList(response || []));
  };

  const fetchDepositTypeList = async () => {
    try {
      let response = await apiGetDepositTypeInfo();
      dispatch(setDepositTypeArray(response?.data || []));
    } catch (e) {}
  };

  const fetchDepositModeList = async () => {
    try {
      let response = await apiGetDepositModeInfo();
      dispatch(setDepositModeArray(response?.data || []));
    } catch (e) {}
  };

  const fetchPaymentTypeInfo = async () => {
    try {
      let response = await apiGetPaymentTypeInfo();
      dispatch(setPaymentTypeInfo(response?.data || []));
    } catch (e) {}
  };

  const getUpiTypeInfo = async () => {
    try {
      let response = await apiGetUPITypeInfo();
      dispatch(setUpiTypeInfo(response?.data || []));
    } catch (e) {}
  };

  const getCustomerTypeInfo = async () => {
    try {
      let response = await apiGetCustomerTypeInfo();
      dispatch(setCustomerListInfo(response?.data || []));
    } catch (e) {}
  };

  const getsalesTypesInfo = async () => {
    try {
      let response = await apiGetSalesTypeInfo();
      dispatch(setSalesType(response?.data || []));
    } catch (e) {}
  };

  return {
    getOutletsList,
    getPettycashReasons,
    getBookTypeInfo,
    getDayInfo,
    fetchDepositTypeList,
    fetchDepositModeList,
    fetchPaymentTypeInfo,
    getUpiTypeInfo,
    getCustomerTypeInfo,
    getsalesTypesInfo,
  };
}

export default useFetchMasterData;
