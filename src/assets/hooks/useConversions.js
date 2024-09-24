import React from "react";
import { useSelector } from "react-redux";
import { advanceModalConObj, allPaymentTypes, getConvertedObj, paymentCollectionConObj } from "../../QuickBook/components/CompConstants";
import { selectedValType } from "../../Constants";
import { INDEPENDENT_WORKSHOP, INDEPENDENTWORKSHOP } from "constants/app.constant";
function useConversions() {

    const {
        salesType,
        customerListInfo,
        upiTypeInfo,
        allTerminalList,
        depositTypeList,
        depositModeList,
        reasonsList
    } = useSelector(state => state.quickbookStore.state);

    const convertToSmallPettyCashObj = ({pObj}) => {
        let newTemp = {
          id: pObj.Id || 0,
          date: pObj.Date || null,
          amount: pObj.Amount || null,
          petty_cash_details: pObj.Petty_Cash_Details || "",
          petty_cash_extra_details: pObj.Petty_Cash_Extra_Details || "",
        };
        if (typeof newTemp.petty_cash_details === "string") {
          let findedObj = (reasonsList || []).find(
            (eachItem) => eachItem.Type === newTemp.petty_cash_details
          );
          newTemp.petty_cash_details = findedObj?.Id || null;
        }
      
        return newTemp;
    };

    
    const convertToSmallBankDepositObj = ({pObj}) => {
        let newObj = {
            id: pObj.Id || 0,
            deposit_mode : pObj.Deposit_Mode || null,
            store_id : pObj.Store_Id || null,
            advance_receipt_no : pObj.Advance_Receipt_No || "",
            remaining_balance : pObj.Remaining_Balance || null,
            date : pObj.Date || null,
            type : pObj.Type || null,
            reason : pObj.Reason || "",
            bill_number : pObj.Bill_Number ||  "",
            amount : pObj.Amount || "",
            total_receipt_amount : null,
            receipt_status : ""
        };
        if (typeof newObj.store_id === 'string') {
            let findedObj = (allTerminalList || []).find((eachItem) => eachItem.Terminal === newObj.store_id);
            newObj.store_id = findedObj?.Id || null;
        } 
        
        if (typeof newObj.deposit_mode === 'string') {
            let findedObj = (depositModeList || []).find((eachItem) => eachItem.Type === newObj.deposit_mode);
            newObj.deposit_mode = findedObj?.Id || null;
        } 
        if (typeof newObj.type === 'string') {
            let findedObj = (depositTypeList || []).find((eachItem) => eachItem.Type === newObj.type);
            newObj.type = findedObj?.Id || null;
        } 
        return newObj;
    };

    const createNewDaybookObj = ({pObj}) => {
        let paymentIndex = 0;
        let newCount = [];
        let newObj = {...getConvertedObj(pObj)};
        let  saleTypeObj = (salesType || []).find((eachDoc) => eachDoc.Type === newObj?.sales_type);
        newObj["sales_type"] = saleTypeObj?.Id || null;

        if (typeof newObj.customer_type === 'string') {
            // let findedObj = (customerListInfo || []).find((eachItem) => eachItem.Type === newObj.customer_type);
            // newObj.customer_type = findedObj?.Id || null;
            let findedObj;
            if(newObj.customer_type === INDEPENDENTWORKSHOP){
                findedObj = (customerListInfo || []).find((eachItem) => eachItem.Type === INDEPENDENT_WORKSHOP);
            }else{
               findedObj = (customerListInfo || []).find((eachItem) =>eachItem.Type === newObj.customer_type);
            };
            newObj.customer_type = findedObj?.Id || null;
        } 
        
        if (typeof newObj.upi_type === 'string') {
            let findedObj = (upiTypeInfo || []).find((eachItem) => eachItem.Type === newObj.upi_type);
            newObj.upi_type = findedObj?.Id || null;
        } 
        
        for (let key in newObj) {
            if ( allPaymentTypes.includes(key) && newObj[key] > 0) {
                newObj[`paymentType${paymentIndex}`] = selectedValType[key];
                newCount.push(paymentIndex);
              paymentIndex++;
            }
        }
        newObj.PaymentCountArr = newCount;
        return newObj;
        
    };

    const createNewAdvanceBookObj = ({pObj}) => {
        let paymentIndex = 0;
        let newCount = [];
        let newObj = {...advanceModalConObj(pObj)};

        if (typeof newObj.customer_type === 'string') {
            let findedObj = (customerListInfo || []).find((eachItem) => eachItem.Type === newObj.customer_type);
            newObj.customer_type = findedObj?.Id || null;
        } 
        
        if (typeof newObj.upi_type === 'string') {
            let findedObj = (upiTypeInfo || []).find((eachItem) => eachItem.Type === newObj.upi_type);
            newObj.upi_type = findedObj?.Id || null;
        } 
        
        for (let key in newObj) {
            if ( allPaymentTypes.includes(key) && newObj[key] > 0) {
                newObj[`paymentType${paymentIndex}`] = selectedValType[key];
                newCount.push(paymentIndex);
                paymentIndex++;
            }
        }
        newObj.PaymentCountArr = newCount;
        return newObj;
        
    };

    const createNewPaymentColObj = ({pObj}) => {
        let paymentIndex = 0;
        let newCount = [];
        let newObj = {...paymentCollectionConObj(pObj)};

        if (typeof newObj.customer_type === 'string') {
            let findedObj = (customerListInfo || []).find((eachItem) => eachItem.Type === newObj.customer_type);
            newObj.customer_type = findedObj?.Id || null;
        } 
        
        if (typeof newObj.upi_type === 'string') {
            let findedObj = (upiTypeInfo || []).find((eachItem) => eachItem.Type === newObj.upi_type);
            newObj.upi_type = findedObj?.Id || null;
        } 
        
        for (let key in newObj) {
            if ( allPaymentTypes.includes(key) && newObj[key] > 0) {
                newObj[`paymentType${paymentIndex}`] = selectedValType[key];
                newCount.push(paymentIndex);
              paymentIndex++;
            }
        }
        newObj.PaymentCountArr = newCount;
        return newObj;
        
    }

    return {
        convertToSmallPettyCashObj,
        convertToSmallBankDepositObj,
        createNewDaybookObj,
        createNewAdvanceBookObj,
        createNewPaymentColObj
    };
}

export default useConversions;
