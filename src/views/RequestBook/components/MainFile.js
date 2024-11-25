import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "components/shared/Modal";
import Navbar from "./Navbar";
import AddNewReqBook from "./NewRequestBook";
import RequestHistory from "./RequestHistory";
import useFetchMasterData from "utils/hooks/useFetchMasterApis";
import { setMainPageLoader } from "QuickBook/store/dataSlice";

const MainFile = () => {

    const dispatch = useDispatch();
    const {
        getBookTypeInfo,
        getDayInfo,
      } = useFetchMasterData();
    const { 
        bookTypeList,
        dayInfoList
    } = useSelector((state) => state.quickbookStore.state);
    const { 
            manageRequestModal,
            activeTab 
        } = useSelector(state => state.requestBook.reqState);
    
    useEffect(() => {
        fetchRequiredApi();
    },[]);

    const fetchRequiredApi = async() => {
        try{
            dispatch(setMainPageLoader(true));
            bookTypeList.length <= 0 && await getBookTypeInfo();
            dayInfoList.length <= 0 && await getDayInfo();
            dispatch(setMainPageLoader(false));
        }catch(Err){
            dispatch(setMainPageLoader(false));
        }
    }

    return (
        <Modal openModal={manageRequestModal} height={"90%"} width={"90%"}  ai = {null}>
            <Navbar/>
            {
                activeTab === 0 && <AddNewReqBook/>
            }
            {
                activeTab === 1 && <RequestHistory/>
            }
        </Modal>
    )
};

export default MainFile;