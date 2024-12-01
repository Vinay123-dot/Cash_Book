import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CButton from "components/ui/Button";
import AddBookPage from "./AddBookPage";
import amountFormatter from "utils/amountFormatter";
import ErrorModal from "components/ui/ErrorModal";
import useBankBalance from "assets/hooks/useBankBalance";
import {
    setShowAddBookPage,
    setDataSavedModal
} from '../store/stateSlice';
import { TERMINAL_ID } from "constants/app.constant";
import { setManageRequestModal } from "views/RequestBook/store/stateSlice";


const Header = () => {

    const dispatch = useDispatch();
    const {
        dataSavedModalOpen,showAddBookPage,commonCashBanalce,remainingCommonBalance
    } = useSelector(state => state.quickbookStore.state);
  
    let userType = localStorage.getItem("mType");
    let uniqueId = localStorage.getItem("uniqueId");
    const { getBankBalance } = useBankBalance(uniqueId);
  
    useEffect(() => {
        userType === TERMINAL_ID && getBankBalance();
     
    },[userType])

    const handleClickInHeader = () => {
        dispatch(setDataSavedModal(false));
        getBankBalance();
    }

    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  md:gap-8 px-10 py-2">
    //     <p className="text-black text-opacity-100 text-3xl font-bold leading-10">Cash Book</p>
            
    //         {
    //             userType === TERMINAL_ID && <div className="flex flex-col">
    //                 <label  htmlFor="open_bal"  className="text-blue-600 text-xl font-medium tracking-wide mb-1">Opening Balance</label>
    //                 <p  id="cash_bal" className="text-lg font-bold">{amountFormatter(commonCashBanalce)}</p>
    //             </div>
    //         }
    //         {
    //             userType === TERMINAL_ID && <div className="flex flex-col">
    //                 <label htmlFor="rem_bal" className="text-blue-600 text-xl font-medium tracking-wide mb-1">Remaining Balance</label>
    //                 <h4 id="rem_bal" className="text-lg font-bold">{amountFormatter(remainingCommonBalance)}</h4>
    //             </div>
    //         }
    //         <div className="flex space-x-4 items-center">
    //             {
    //                 userType === TERMINAL_ID &&
    //                 <CButton onClick={() => dispatch(setShowAddBookPage(true))}>
    //                     Select Book
    //                 </CButton>
    //             }
    //             <CButton 
    //                 className = "col-span-3"
    //                 onClick={() => dispatch(setManageRequestModal(true))}>
    //                 Request Book
    //             </CButton>
    //         </div>
            
    //         {
    //             dataSavedModalOpen && 
    //             <ErrorModal 
    //                 msg = "Data Saved Sucessfully."
    //                 handleCloseEModal = {handleClickInHeader}
    //                 showImage = {true}
    //                 imageType = "success"
    //             />
    //         }
    //     </div>
    // )
    return (
      <>
        <div className="flex flex-col md:flex-row md:justify-between px-10 py-2">
          <p className="text-black text-opacity-100 text-3xl font-bold leading-10">
            Cash Book
          </p>

          {userType === TERMINAL_ID && (
            <>
             <div className="flex flex-col">
              <label
                htmlFor="open_bal"
                className="text-blue-600 text-xl font-medium tracking-wide mb-1"
              >
                Opening Balance
              </label>
              <p id="cash_bal" className="text-lg font-bold">
                {amountFormatter(commonCashBanalce)}
              </p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="rem_bal"
                className="text-blue-600 text-xl font-medium tracking-wide mb-1"
              >
                Remaining Balance
              </label>
              <h4 id="rem_bal" className="text-lg font-bold">
                {amountFormatter(remainingCommonBalance)}
              </h4>
            </div>
            </>
           
          )}
        
          <div className="flex space-x-4 items-center">
            {userType === TERMINAL_ID && (
              <CButton onClick={() => dispatch(setShowAddBookPage(true))}>
                Select Book
              </CButton>
            )}
            <CButton
              className="col-span-3"
              onClick={() => dispatch(setManageRequestModal(true))}
            >
              Request Book
            </CButton>
          </div>
        </div>

        {dataSavedModalOpen && (
          <ErrorModal
            msg="Data Saved Sucessfully."
            handleCloseEModal={handleClickInHeader}
            showImage={true}
            imageType="success"
          />
        )}
      </>
    );
}

export default Header;