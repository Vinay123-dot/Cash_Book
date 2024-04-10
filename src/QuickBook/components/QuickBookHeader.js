import React, { useState } from "react";
import CButton from "../../ComponentsTest/Button";
import AddBookPage from "./AddBookPage";
import Modal from "../../ComponentsTest/Modal";
import { useSelector } from "react-redux";


const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const handleClick = () => setShowModal(!showModal);
    const totalTxn = useSelector(state => state.quickbookStore.data.totalTxn)
    // const totalTxn = useSelector(state => state)
    console.log("TT",totalTxn)
    return (
        <>
            <div className="flex flex-col lg:ml-32 xl:ml-0">
                <label className="text-lg font-medium tracking-wide mb-1 opBalance">Opening Balance</label>
                <h4 className="text-2xl">₹ 100,000,0</h4>
            </div>
            {/* <CButton onClick={handleClick} className ="lg:ml-32 bg-green-500" > */}
            <CButton onClick={handleClick} className = "xl:col-end-6 col-span-1">
                Add Book
            </CButton>
            <AddBookPage openPage = {showModal}/>
            <Modal/>
        </>
    )

}

export default Header;