import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import SucessIcon from "../../../assets/SucessIcon.png";

const ErrorModal = (props) => {
  const {
    msg = "",
    handleCloseEModal,
    showImage = false,
    imageType = "success"

  } = props;

  return (
    <div
      className="fixed w-screen h-screen flex justify-center items-center top-0 left-0"
      style={{ zIndex: 999, backgroundColor: "rgba(52, 52, 52, 0.6)" }}
    >
      <div className="relative w-DialogWidth min-h-modalHeight h-auto flex flex-col bg-white rounded-md animate-modalSlide">
        {/* This div will grow to occupy the available space */}
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          {showImage && (
            <img 
              src={SucessIcon} 
              className="s-10 mb-4" 
            />
          )}
          <p className="text-lg font-semibold text-[#959595] mb-6 text-center">
            {msg}
          </p>
        </div>
  
        {/* Button stays at the bottom */}
        <div className="flex justify-center mb-4">
          <button
            className="text-white text-md bg-green-500 h-10 w-36 rounded-md"
            onClick={handleCloseEModal}
          >
            OK
          </button>
        </div>
  
        <HiX
          onClick={handleCloseEModal}
          className="absolute -right-1.5 -top-3 bg-yellow-200 h-8 w-8 text-white rounded-2xl cursor-pointer"
        />
      </div>
    </div>
  );

};

export default ErrorModal;
