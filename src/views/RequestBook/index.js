import React from "react";
import { useDispatch,useSelector } from "react-redux";
import ReqBookFile from "./components/MainFile";
import { injectReducer } from "store";
import requestBookReducer from "./store/index";
import ErrorModal from "components/ui/ErrorModal";
import { setManageModal } from "./store/stateSlice";
import useFetchReqBook from "./components/useFetchReqBook";

injectReducer("requestBook", requestBookReducer);

const RequestBook = () => {
  
  const dispatch = useDispatch();
  const { viewRequestReports } = useFetchReqBook();
  const { showErrModal, ErrModalMsg,getRequestBook } = useSelector(
    (state) => state.requestBook.reqState
  );

  const onEModalCancel = () => {
    if(getRequestBook){
      viewRequestReports();
    }
    dispatch(
      setManageModal({
        showErrModal: false,
        ErrModalMsg: "",
      })
    );
  };

  return (
    <>
      <ReqBookFile />
      {showErrModal && (
        <ErrorModal 
          msg={ErrModalMsg} 
          handleCloseEModal={onEModalCancel} 
        />
      )}
    </>
  );
};

export default RequestBook;
