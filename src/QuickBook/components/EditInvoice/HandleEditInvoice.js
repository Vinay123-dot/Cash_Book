import React, { useMemo, useState, useRef, useEffect,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PettyCashEditModal from "./PettyCashEditModal";
import EditDayBookFromDashboard from "./EditModeFromDashboard";
import EditAdvBookFromDashboard from './EditAdvanceBookFromDashboard';
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
        upiTypeInfo
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
        {/* {
                    <HiOutlinePencil
                        size={20}
                        style={{ color: "#5A87B2",width : 120,textAlign:'center' }}
                        onClick={handleClickIcon}
                    /> 
            } */}
        
            {
                (row.Date === getToday() || row.Date === getYesterDay()) ?
                    <HiOutlinePencil
                        size={20}
                        style={{ color: "#5A87B2",width : 120,textAlign:'center' }}
                        onClick={handleClickIcon}
                    /> : null
            }

            <PettyCashEditModal
                showEditPettyCash = {seletedModalVal === 4}
                selectedPettyCashObj = {convertToSmallPettyCashObj(row)}
                handleCancelPettyCash = {onCancelPettyCash}
            />
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




        </>
    )
}

export default HandleEditInvoice;