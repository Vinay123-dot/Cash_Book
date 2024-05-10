import React, { useEffect, useState } from "react";
import CButton from "../../components/ui/Button";
import AddBookPage from "./AddBookPage";
import Modal from "../../components/shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setCommonCashBalance,
} from '../store/stateSlice';
import SucessIcon from "../../assets/SucessIcon.png";
import { apiGetCommonOpeningBalance } from "../../services/TransactionService";

const Header = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => setShowModal(!showModal);
    let userType = localStorage.getItem("mType");
    const totalTxn = useSelector(state => state.quickbookStore.data.totalTxn)
    const showDataSavedModal = useSelector(state => state.quickbookStore.state.dataSavedModalOpen)
    const showAddBookPage = useSelector(state => state.quickbookStore.state.showAddBookPage);
    const commOpeningBal = useSelector(state => state.quickbookStore.state.commonCashBanalce);

    useEffect(() => {
        getCommonOpeningBalance();
    },[])
   

    const getCommonOpeningBalance = async() => {
        try{
            let data = {
                date: '2024-04-24',
                id : 7
            }
            let response = await apiGetCommonOpeningBalance(data);
            dispatch(setCommonCashBalance(response?.opening_balance));
        }catch(e){

        }
    }

    return (
        <>
            <div className="flex flex-col lg:ml-32 xl:ml-0">
                <label className="text-lg font-medium tracking-wide mb-1 opBalance">Opening Balance</label>
                <h4 className="text-2xl">₹{commOpeningBal}</h4>
            </div>
            {
                userType === "7" &&
                <CButton onClick={() => dispatch(setShowAddBookPage(true))} className="xl:col-span-1">
                    Add Book
                </CButton>
            }

            <AddBookPage openPage={showAddBookPage} />
            <Modal openModal= {showDataSavedModal} height = {250} width={350}>
                <img src={SucessIcon} style={{ width: 59, height: 59, marginTop: 20 }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "#959595", marginTop: 20 }}> Data Saved Sucessfully</p>
                <CButton 
                    onClick={() => dispatch(setDataSavedModal(false))}
                    style={{ position: 'absolute', bottom: 20 }}
                >
                    Ok
                </CButton>

            </Modal>
        </>
    )

}

export default Header;