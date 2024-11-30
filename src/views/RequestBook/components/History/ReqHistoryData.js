
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import HistoryDataTable from "./HistoryDataTable";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import useFetchReqBook from "../useFetchReqBook";
import { setManageModal } from "views/RequestBook/store/stateSlice";
import { setHistoryArr } from "views/RequestBook/store/dataSlice";

const ReqHistoryData = () => {

    const dispatch = useDispatch();
    const {
      deleteRequestHistory,
      viewRequestReports
    } = useFetchReqBook();
    const { 
      historyArr 
    } = useSelector(state => state.requestBook.reqData);

    const manageLoader = (flag) => dispatch(setMainPageLoader(flag));

    const updateModalStatus = ({showErrModal = false,ErrModalMsg = ""}) => {
      manageLoader(false);
      dispatch(setManageModal({showErrModal, ErrModalMsg}));
    };

    const onSelectStatus = (id, field, selectedStatus) => {
      const updatedData = (historyArr || []).map((item) => {
        if (item.id === id) {
          return { ...item, [field]: selectedStatus};
        }
        return item;
      });
      dispatch(setHistoryArr(updatedData));
    };

    const onDeleteReport = async(selectedId) => {
    try {
      manageLoader(true);
      let response = await deleteRequestHistory([selectedId]);
      if(response?.statusCode === 200) {
        setTimeout(() => {
          viewRequestReports();
        },100);
      };
      updateModalStatus({
        showErrModal: response?.show,
        ErrModalMsg: response?.message,
      });
      response?.statusCode !== 200 && manageLoader(false);
    } catch (Err) {
      manageLoader(false);
    }
  };

  return (
    <div className="h-full overflow-auto">
      <HistoryDataTable
        requiredArr={historyArr}
        handleChangeStatus = {onSelectStatus}
        handleDeleteReport = {onDeleteReport}
      />
    </div>
  );
    
};

export default ReqHistoryData;