import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "components/ui/NewButton";
import { CANCEL_STYLE, DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import { setCancelButtonFunc } from "QuickBook/store/stateSlice";
// import { calculateAmount } from "./commonFunc";
// import { setClearAllPaymentPageFields } from "../store/dataSlice";

const RequestHistoryFooter = ({handleSavePaymentHistory}) => {
    
    const dispatch = useDispatch();
    const { paymentColArray } = useSelector(state => state.paymentBook.PaymentData);

    const getSelectedRecordsCount = () => {
        const selectedRecords = (paymentColArray || []).filter((item) => item.checked);
        return selectedRecords.length || 0;
    };

   
    const getDisabledStatus = () => {
        const findObj = (paymentColArray || []).find((eachDoc) => eachDoc.checked);
        return !! findObj?.checked ;
    };

    const getSaveBtnCls = !getDisabledStatus() ? DISABLED_STYLE : ENABLED_STYLE;

    const handleClickCancel = () => {
        // dispatch(setClearAllPaymentPageFields({}));
        dispatch(setCancelButtonFunc({}));
    }

    return (
      <div className="p-2 flex flex-col items-start md:items-center md:flex-row md:justify-between">
        <div className="w-full flex flex-row md:items-center gap-2">
          <p>
            Selected Records :{" "}
            <span className="text-base font-medium">
              {getSelectedRecordsCount()}
            </span>
          </p>
          <p>
            Amount :{" "}
            <span className="text-base font-medium">
              {" "}
              {/* {calculateAmount(paymentColArray)} */}
            </span>
          </p>
        </div>

        <div className="flex justify-end items-center gap-5 my-4">
          <Button
            className={CANCEL_STYLE}
            type="cancel"
            onClick={handleClickCancel}
          >
            Cancel
          </Button>
          <Button
            type="buttom"
            className={getSaveBtnCls}
            isDisabled={!getDisabledStatus()}
            onClick={handleSavePaymentHistory}
          >
            Save
          </Button>
        </div>
      </div>
    );
};

export default RequestHistoryFooter;

RequestHistoryFooter.propTypes = {
    handleSavePaymentHistory : PropTypes.func
}
