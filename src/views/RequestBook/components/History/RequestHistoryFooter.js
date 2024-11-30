import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "components/ui/NewButton";
import { CANCEL_STYLE, DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import { TERMINAL_ID } from "constants/app.constant";
import { setClearAllHistoryFields } from "views/RequestBook/store/dataSlice";
import { setManageRequestModal } from "views/RequestBook/store/stateSlice";


const RequestHistoryFooter = ({handleSavePaymentHistory}) => {
    
    const dispatch = useDispatch();
    const { historyArr } = useSelector(state => state.requestBook.reqData);
    const userType = localStorage.getItem("mType");

    const getDisabledStatus = () => {
        const findObj = (historyArr || []).find((eachDoc) => eachDoc.isapproved === 1);
        return findObj ;
    };

    const getSaveBtnCls = !getDisabledStatus() ? DISABLED_STYLE : ENABLED_STYLE;

    const handleClickCancel = () => {
      dispatch(setManageRequestModal(false));
      dispatch(setClearAllHistoryFields({}));
    }

    return (
      <div className="p-2 flex flex-col items-start md:items-center md:flex-row md:justify-end">
        <div className="flex justify-end items-center gap-5 my-4">
          <Button
            className={CANCEL_STYLE}
            type="cancel"
            onClick={handleClickCancel}
          >
            Cancel
          </Button>
          {/* {
            userType != TERMINAL_ID &&
            <Button
              type="buttom"
              className={getSaveBtnCls}
              isDisabled={!getDisabledStatus()}
              onClick={handleSavePaymentHistory}
            >
              Save
            </Button>
          } */}
          
        </div>
      </div>
    );
};

export default RequestHistoryFooter;

RequestHistoryFooter.propTypes = {
    handleSavePaymentHistory : PropTypes.func
}
