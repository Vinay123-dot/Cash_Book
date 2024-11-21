import React from "react";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";
import { getTotalMoneyInDayBook } from "../CompConstants";

const BillAmountModal = (props) => {
      const {
        billModal,handleCancelBillModal,valuesObj,
        handleSubmitBillModal,isFromPaymentCol = false
    } = props;
    let diffInAmount = Number(valuesObj.bill_value) - getTotalMoneyInDayBook(valuesObj);

    if(!billModal) return null;
  return (
    <div
      className="fixed w-screen h-screen flex justify-center items-center top-0 left-0"
      style={{ zIndex: 999, backgroundColor: "rgba(52, 52, 52, 0.6)" }}
    >
      <div className="relative w-DialogWidth min-h-modalHeight h-auto flex flex-col bg-white rounded-md animate-modalSlide justify-center  py-5">
        <div className="grow px-12 space-y-2">
          <p className="text-lg font-semibold text-[#959595]">
                {
                    isFromPaymentCol ? 
                    "Bill amount and payable amount not matching .Please check the given amount." :
                    "Bill amount and payable amount not matching .Do you want to continue?"
                }
            </p>
            <p className="w-full text-start  text-black">
                Bill amount : <span className="text-gray-500">{valuesObj.bill_value || 0}/-</span>
            </p>
            <p className="w-full text-start  text-black">
                Payable amount : <span className="text-gray-500">{getTotalMoneyInDayBook(valuesObj)}/-</span>
            </p>
            <p className="w-full text-start  text-black">
                Difference :  <span className="text-gray-500">{diffInAmount}/-</span>
            </p>
        </div>
      {
        !isFromPaymentCol ? 
        <div className="w-full py-4 flex justify-evenly">
        <button
          onClick={handleCancelBillModal}
          className="text-[#FFFFFF] text-md bg-orange-400 h-10 rounded-md w-36"
        >
          CANCEL
        </button>
        <button
          className="text-[#FFFFFF] text-md bg-green-500 h-10 w-36 rounded-md"
          onClick={handleSubmitBillModal}
        >
          OK
        </button>
      </div> : 
      <button
        className="text-[#FFFFFF] text-md bg-green-500 h-10 w-36 rounded-md self-center mb-2"
        onClick={handleCancelBillModal}
      >
        OK
      </button>

      }
       
        <HiX
          onClick={handleCancelBillModal}
          className="absolute -right-1.5 -top-2.5 bg-yellow-200 h-8 w-8 text-white rounded-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BillAmountModal;

BillAmountModal.propTypes = {
  handleCancelBillModal : PropTypes.func,
  handleSubmitBillModal : PropTypes.func,
  valuesObj : PropTypes.object,
  isFromPaymentCol : PropTypes.bool,
  billModal : PropTypes.bool,
};

BillAmountModal.defaultProps = {
  isFromPaymentCol : false
};
