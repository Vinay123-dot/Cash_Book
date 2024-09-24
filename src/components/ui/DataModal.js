import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import CButton from "./Button";

const DataModal = (props) => {
  const {
    displayText,
    handleVerify,
    cancelBtnText = "REJECT",
    okBtnText = "VERIFY",
    handleCancel,
    displayOnlyInfo = false,
    handleClickOk
  } = props;
console.log("d",displayOnlyInfo)
  return (
    <div
      className="fixed w-screen h-screen flex justify-center items-center top-0 left-0"
      style={{ zIndex: 999, backgroundColor: "rgba(52, 52, 52, 0.6)" }}
    >
      <div className="relative w-DialogWidth min-h-modalHeight h-auto flex flex-col bg-white rounded-md animate-modalSlide">
        <div className="grow">
          <p className="text-lg font-semibold text-[#959595] py-6 px-8">
            {displayText}
          </p>
        </div>
      {
        !displayOnlyInfo ? 
        <div className="w-full py-4 flex justify-evenly">
        <button
          onClick={handleCancel}
          className="text-[#FFFFFF] text-md bg-orange-400 h-10 rounded-md w-36"
        >
          {cancelBtnText}
        </button>
        <button
          className="text-[#FFFFFF] text-md bg-green-500 h-10 w-36 rounded-md"
          onClick={handleVerify}
        >
          {okBtnText}
        </button>
      </div> : 
      <button
        className="text-[#FFFFFF] text-md bg-green-500 h-10 w-36 rounded-md self-center mb-2"
        onClick={handleClickOk}
      >
        OK
      </button>

      }
       
        <HiX
          onClick={handleCancel}
          className="absolute -right-1.5 -top-2.5 bg-yellow-200 h-8 w-8 text-white rounded-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DataModal;
