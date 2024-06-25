import React, { useMemo, useState, useRef, useEffect,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PettyCashEditModal from "./PettyCashEditModal";
import EditDayBookFromDashboard from "./EditModeFromDashboard";
import EditAdvBookFromDashboard from './EditAdvanceBookFromDashboard';
import BankDepositEditModal from './BankDepositEditModal';
import { getToday, getYesterDay } from '../../../utils/dateFormatter';
import { HiOutlinePencil } from "react-icons/hi";
import { allPaymentTypes, getConvertedObj,selectedValType,
        advanceModalConObj,paymentCollectionConObj } from '../CompConstants';
import EditPaymentColFromDashboard from './EditPaymentColFromDashboard';




const HandleEditInvoice = (props) => {

    const { row } = props;
    const [seletedModalVal, setSelectedModalVal] = useState(null);
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
    const {
        salesType,
        customerListInfo,
        upiTypeInfo,
        allTerminalList,
        depositTypeList,
        depositModeList,
    } = useSelector(state => state.quickbookStore.state);


    const handleClickIcon = () => {
        setSelectedModalVal(cashbookData.book_type);
    }
    

    const convertToSmallPettyCashObj = (pObj) => {
        let newTemp = {
            id: pObj.Id || 0,
            date:  pObj.Date ||null,
            amount: pObj.Amount || null,
            petty_cash_details: pObj.Petty_Cash_Details || '',
        }
        return newTemp;
    }

    const convertToSmallBankDepositObj = (pObj) => {
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
    }
    const onCancelPettyCash = () => {
        console.log("test")
        setSelectedModalVal(null);
    }

    const createNewDaybookObj = (row) => {
        let paymentIndex = 0;
        let newCount = [];
        let newObj = {...getConvertedObj(row)};
        let  saleTypeObj = (salesType || []).find((eachDoc) => eachDoc.Type === newObj?.sales_type);
        newObj["sales_type"] = saleTypeObj?.Id || null;

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

    const createNewAdvanceBookObj = (row) => {
        let paymentIndex = 0;
        let newCount = [];
        let newObj = {...advanceModalConObj(row)};

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

    const createNewPaymentColObj = (row) => {
        let paymentIndex = 0;
        let newCount = [];
        let newObj = {...paymentCollectionConObj(row)};

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

    return (
        <>
            {
                ((row.Date === getToday() || row.Date === getYesterDay()) ) ?
                    <HiOutlinePencil
                        size={20}
                        style={{ color: "#5A87B2",width : 120,textAlign:'center' }}
                        onClick={handleClickIcon}
                    /> : null
            }
            {
                seletedModalVal === 4 &&
                <PettyCashEditModal
                    selectedPettyCashObj = {convertToSmallPettyCashObj(row)}
                    handleCancelPettyCash = {onCancelPettyCash}
                />
            }
            
            {
                seletedModalVal === 3 && 
                <EditDayBookFromDashboard
                    editDayBookObj = {createNewDaybookObj(row)}
                    handleCloseEditModal={onCancelPettyCash}
                /> 
            }
            {
                seletedModalVal === 1 && 
                <EditAdvBookFromDashboard
                    editDayBookObj = {createNewAdvanceBookObj(row)}
                    handleCloseEditModal={onCancelPettyCash}
                /> 
            }
             {
                seletedModalVal === 5 && 
                <EditPaymentColFromDashboard
                    editDayBookObj = {createNewPaymentColObj(row)}
                    handleCloseEditModal={onCancelPettyCash}
                /> 
            }

            {
                seletedModalVal === 2 &&
                <BankDepositEditModal
                    editDayBookObj = {convertToSmallBankDepositObj(row)}
                    handleCloseEditModal = {onCancelPettyCash}
                />
            }



        </>
    )
}

export default HandleEditInvoice;