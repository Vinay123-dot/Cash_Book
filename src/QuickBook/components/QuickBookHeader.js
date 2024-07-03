import React, { useEffect, useState } from "react";
import CButton from "../../components/ui/Button";
import AddBookPage from "./AddBookPage";
import Modal from "../../components/shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setCommonCashBalance,
    setRemainingCommonBalance,
    setPettyCashBalance,
    setPettyCashRemainingBalance,
    setMainPageLoader
} from '../store/stateSlice';
import SucessIcon from "../../assets/SucessIcon.png";
import { 
    apiGetTestCommonOpeningBalance, apiGetTestRemainingCashBalance,
    apiGetTestPettyCashCommonBalance,apiGetTestPettyCashRemainingBalance,
    apiGetCommonOpeningBalance, apiGetRemainingCashBalance,
    apiGetPettyCashCommonBalance,apiGetPettyCashRemainingBalance
} from "../../services/TransactionService";
import { getToday,getTomorrowDate } from "../../utils/dateFormatter";
import amountFormatter from "../../utils/amountFormatter";

const Header = () => {

    const dispatch = useDispatch();
    const {
        dataSavedModalOpen,showAddBookPage,commonCashBanalce,
        remainingCommonBalance
    } = useSelector(state => state.quickbookStore.state);
    const [allBalance,setAllBalance] = useState({
        mainBalance : 0 ,remBankBalance : 0
    })
    let userType = localStorage.getItem("mType");
    let uniqueId = localStorage.getItem("uniqueId");
  
    useEffect(() => {
        userType == 7 && getBankBalance();
     
    },[userType])

    useEffect(() => {
        setAllBalance({
            mainBalance : commonCashBanalce,
            remBankBalance : remainingCommonBalance
        })
    },[commonCashBanalce,remainingCommonBalance])

   

    const getBankBalance = async() => {
        try{
            dispatch(setMainPageLoader(true));
            const [openingBal,remBalance,pettyOpBal,pettyRembal] = await Promise.all([
                 apiGetTestCommonOpeningBalance({uniqueId,date:getToday()}),
                apiGetTestRemainingCashBalance({uniqueId,date:getToday()}),
                apiGetTestPettyCashCommonBalance({ uniqueId,date: getToday()}),
                apiGetTestPettyCashRemainingBalance({ uniqueId, date: getToday() })
            ]);
            dispatch(setCommonCashBalance(openingBal?.data?.opening_balance));
            dispatch(setRemainingCommonBalance(remBalance?.data?.opening_balance));
            dispatch(setPettyCashBalance(pettyOpBal?.data?.opening_balance));
            dispatch(setPettyCashRemainingBalance(pettyRembal?.data?.opening_balance));
            setAllBalance({
                mainBalance : openingBal?.data?.opening_balance,
                remBankBalance : remBalance?.data?.opening_balance
            })
            dispatch(setMainPageLoader(false));
        }catch(e){
            dispatch(setMainPageLoader(false));
        }
        
    }

    // const getBankBalance = async() => { //This one with async/await from api also
    //     try{
    //         dispatch(setMainPageLoader(true));
    //         const [openingBal,remBalance,pettyOpBal,pettyRembal] = await Promise.all([
    //              apiGetCommonOpeningBalance({uniqueId,date:getToday()}),
    //             apiGetRemainingCashBalance({uniqueId,date:getToday()}),
    //             apiGetPettyCashCommonBalance({ uniqueId,date: getToday()}),
    //             apiGetPettyCashRemainingBalance({ uniqueId, date: getToday() })
    //         ]);
    //         console.log("opem",openingBal)
    //         dispatch(setCommonCashBalance(openingBal?.opening_balance));
    //         dispatch(setRemainingCommonBalance(remBalance?.opening_balance));
    //         dispatch(setPettyCashBalance(pettyOpBal?.opening_balance));
    //         dispatch(setPettyCashRemainingBalance(pettyRembal?.opening_balance));
    //         setAllBalance({
    //             mainBalance : openingBal?.opening_balance,
    //             remBankBalance : remBalance?.opening_balance
    //         })
    //         dispatch(setMainPageLoader(false));
    //     }catch(e){
    //         dispatch(setMainPageLoader(false));
    //     }
        
    // }
   
   
    const handleClickInHeader = () => {
        dispatch(setDataSavedModal(false));
        getBankBalance();
    }

    return (
        <>
            {
                userType === "7" && <div className="flex flex-col lg:ml-32 xl:ml-0">
                    <label className="text-blue-600 text-lg font-medium tracking-wide mb-1">Opening Balance</label>
                    <p className="text-2xl">{amountFormatter(allBalance.mainBalance)}</p>
                </div>
            }
            {
                userType === "7" && <div className="flex flex-col lg:ml-32 xl:ml-0">
                    <label className="text-blue-600 text-lg font-medium tracking-wide mb-1">Remaining Balance</label>
                    <h4 className="text-2xl">{amountFormatter(allBalance.remBankBalance)}</h4>
                </div>
            }
            {
                userType === "7" &&
                <CButton onClick={() => dispatch(setShowAddBookPage(true))} className="xl:col-span-1">
                    Select Book
                </CButton>
            }

            <AddBookPage openPage={showAddBookPage} />
            <Modal openModal= {dataSavedModalOpen} height = {250} width={350}>
                <img src={SucessIcon} style={{ width: 59, height: 59, marginTop: 20 }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "#959595", marginTop: 20 }}> Data Saved Sucessfully</p>
                <CButton 
                    onClick={handleClickInHeader}
                    style={{ position: 'absolute', bottom: 20 }}
                >
                    Ok
                </CButton>

            </Modal>
        </>
    )

}

export default Header;