import React, { useState } from "react";
import CButton from "../../components/ui/Button";
import AddBookPage from "./AddBookPage";
import Modal from "../../components/shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage
} from '../store/stateSlice';
import SucessIcon from "../../assets/SucessIcon.png";

const Header = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => setShowModal(!showModal);
    let userType = localStorage.getItem("mType");
    const totalTxn = useSelector(state => state.quickbookStore.data.totalTxn)
    const showAddBookPage = useSelector(state => state.quickbookStore.state.showAddBookPage)

    // const totalTxn = useSelector(state => state)
    // console.log("TT",totalTxn)

    return (
        <>
            <div className="flex flex-col lg:ml-32 xl:ml-0">
                <label className="text-lg font-medium tracking-wide mb-1 opBalance">Opening Balance</label>
                <h4 className="text-2xl">₹ 100,000,0</h4>
            </div>
            {
                userType === "7" &&
                <CButton onClick={() => dispatch(setShowAddBookPage(true))} className="xl:col-end-6 col-span-1">
                    Add Book
                </CButton>
            }

            <AddBookPage openPage={showAddBookPage} />
            <Modal>
                <img src={SucessIcon} style={{ width: 59, height: 59, marginTop: 20 }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "#959595", marginTop: 20 }}> Data Saved Sucessfully</p>
                <CButton style={{ position: 'absolute', bottom: 10 }}>
                    Ok
                </CButton>

            </Modal>
        </>
    )

}

export default Header;