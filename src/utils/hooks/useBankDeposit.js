import { getStatusOfCurrentDate } from "Constants";
import { DEPOSIT_ID, ORDER_CANCEL_ID, PARTIALLY_REFUNDED, statusArr, WITHDRAW_ID } from "constants/app.constant";
import React from "react";
import { useSelector } from "react-redux";
import { apiGetDepositModeInfo, apiGetDepositTypeInfo, apiGetReturnType, apiGetSalesTypeInfo, apiStoreBankDepositInfo, apiVerifyAdvancedBookReceipt, apiVerifyReturnOrder } from "services/TransactionService";


function useBankDeposit(){

    const allTerminals = useSelector(state => state.quickbookStore.state.allTerminalList);
    const commOpeningBal = useSelector(state => state.quickbookStore.state.commonCashBanalce);
    const remCommOpeningBal = useSelector(state => state.quickbookStore.state.remainingCommonBalance);
    let uniqueId = localStorage.getItem("uniqueId");

    const fetchRequiredData = async() => {
        try{
            const [
              depositTypeResponse,
              depositModeResponse,
              returnTypeResponse,
              saleTypeResponse
            ] = await Promise.all([
              apiGetDepositTypeInfo(),
              apiGetDepositModeInfo(),
              apiGetReturnType(),
              apiGetSalesTypeInfo()
            ]);
            let splicedObj = (depositTypeResponse?.data || []).splice(3,1);
            (depositTypeResponse?.data || []).forEach((eachDoc) => {
                eachDoc.Type = eachDoc.Id === 3 ? eachDoc.Type+'/'+splicedObj?.[0].Type :eachDoc.Type;
                
            });
            return{
                depostList : depositTypeResponse?.data,
                depositModeList : depositModeResponse?.data || [],
                returnTypeArr : returnTypeResponse?.data || [],
                saleTypeArr  : saleTypeResponse?.data || []
            }
           
        }catch(e){

        }
    };

    const verifyReturnOrder = async(info) => {
        try{
            let response = await apiVerifyReturnOrder(info);
            console.log("res",response)
            return {
                ErrModal : !!statusArr.includes(response?.Status),
                ErrMsg : statusArr.includes(response?.Status) && "This receipt number is already used",
                responseData : response || {}
            }
        }catch(Err){
            return {
                ErrModal : false,
                ErrMsg : Err?.response?.data?.detail || "",
                responseData : {}
            }
        }
    };

    const verifyAdvanceReceipt = async(data) => {
        try{
            let response = await apiVerifyAdvancedBookReceipt(data);
            return {
                ErrModal : !!statusArr.includes(response?.Status),
                ErrMsg : statusArr.includes(response?.Status) && "This receipt number is already used",
                advanceReceiptData : response || {}
            }
            
        }catch(Err){
            return {
                ErrModal : false,
                ErrMsg : Err?.response?.data?.detail || "",
                advanceReceiptData : {}
            }
        }
    };

    const StoreBankDepositInfo = async (values) => {
      try{
          let newObj = JSON.parse(JSON.stringify(values));
          newObj.amount = Number(newObj.amount);
          newObj.total_receipt_amount = Number(newObj.total_receipt_amount);
          if(newObj.amount > remCommOpeningBal) {
                return {
                    ErrMsg : "Given amount should be less than or equal to the remaining opening balance",
                    ErrModal : true,
                    Loader : false
                };
          };
          let isDateFlag = getStatusOfCurrentDate(newObj.date);
          let isCondFlag = (newObj.type == WITHDRAW_ID && !isDateFlag) ||newObj.type == DEPOSIT_ID || (newObj.type == ORDER_CANCEL_ID && !isDateFlag);

          if(isCondFlag && newObj.amount > commOpeningBal) {
                return {
                    ErrMsg : `Given amount should be less than or equal to the opening balance . ${newObj.type == DEPOSIT_ID ?"":"As you selected previous date."}`,
                    ErrModal : true,
                    Loader : false
                };
            }
          if(newObj.total_receipt_amount > 0){
              newObj.type = (newObj.amount === newObj.total_receipt_amount) ? ORDER_CANCEL_ID : PARTIALLY_REFUNDED;
          }
          if(newObj.store_id) {
              let dummyObj = (allTerminals || []).find((eachDoc) => eachDoc.Id === newObj.store_id);
              newObj.store_id = dummyObj.Terminal || newObj.store_id
          }
          newObj.key = uniqueId;
          let response = await apiStoreBankDepositInfo([newObj]);
          return {
            ErrModal : false,
            Loader : false,
            Message : response.message
        };
       
      }catch(e){
      }
    };

    return {
        fetchRequiredData,
        verifyAdvanceReceipt,
        verifyReturnOrder,
        StoreBankDepositInfo
    }
};

export default useBankDeposit;