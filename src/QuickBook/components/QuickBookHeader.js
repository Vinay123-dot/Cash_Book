import React, { useEffect } from "react";
import CButton from "../../components/ui/Button";
import AddBookPage from "./AddBookPage";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
} from '../store/stateSlice';
import amountFormatter from "../../utils/amountFormatter";
import ErrorModal from "../../components/ui/ErrorModal";
import useBankBalance from "../../assets/hooks/useBankBalance";

const Header = () => {

    const dispatch = useDispatch();
    const {
        dataSavedModalOpen,showAddBookPage,commonCashBanalce,remainingCommonBalance
    } = useSelector(state => state.quickbookStore.state);
  
    let userType = localStorage.getItem("mType");
    let uniqueId = localStorage.getItem("uniqueId");
    const { allBalance, getBankBalance } = useBankBalance(uniqueId);
  
    useEffect(() => {
        userType == 7 && getBankBalance();
     
    },[userType])


   

   
    const handleClickInHeader = () => {
        dispatch(setDataSavedModal(false));
        getBankBalance();
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  md:gap-8 px-10 py-2">
        <p className="text-black text-opacity-100 text-3xl font-bold leading-10">Cash Book</p>
            
            {
                userType === "7" && <div className="flex flex-col">
                    <label className="text-blue-600 text-xl font-medium tracking-wide mb-1">Opening Balance</label>
                    <p className="text-lg font-bold">{amountFormatter(commonCashBanalce)}</p>
                </div>
            }
            {
                userType === "7" && <div className="flex flex-col">
                    <label className="text-blue-600 text-xl font-medium tracking-wide mb-1">Remaining Balance</label>
                    <h4 className="text-lg font-bold">{amountFormatter(remainingCommonBalance)}</h4>
                </div>
            }
            {
                userType === "7" &&
                <CButton onClick={() => dispatch(setShowAddBookPage(true))}>
                    Select Book
                </CButton>
            }

            <AddBookPage openPage={showAddBookPage} />
            {
                dataSavedModalOpen && 
                <ErrorModal 
                    msg = "Data Saved Sucessfully."
                    handleCloseEModal = {handleClickInHeader}
                    showImage = {true}
                    imageType = "success"
                />
            }
        </div>
    )
}

export default Header;