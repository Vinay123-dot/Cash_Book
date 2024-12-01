import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import AddNewReqBook from "./AddRequest/NewRequestBook";
import RequestHistory from "./History";
import useFetchMasterData from "utils/hooks/useFetchMasterApis";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import DrawerSlide from "components/shared/Drawer";
import { MERCHANT_ID, TERMINAL_ID } from "constants/app.constant";
import { setActiveTab } from "../store/stateSlice";

const MainFile = () => {

    const dispatch = useDispatch();
    const {
        getBookTypeInfo,
        getDayInfo,
        getOutletsList
      } = useFetchMasterData();
    const { 
        bookTypeList,
        dayInfoList,
        allTerminalList
    } = useSelector((state) => state.quickbookStore.state);
    const { 
            manageRequestModal,
            activeTab 
    } = useSelector(state => state.requestBook.reqState);
    const userType = localStorage.getItem("mType");
    
    useEffect(() => {
        fetchRequiredApi();
        dispatch(setActiveTab(userType === TERMINAL_ID ? 0 : 1))
    },[]);

    const fetchRequiredApi = async() => {
        try{
            dispatch(setMainPageLoader(true));
            bookTypeList.length <= 0 && await getBookTypeInfo();
            dayInfoList.length <= 0 && await getDayInfo();
            (allTerminalList.length <= 0 && userType === MERCHANT_ID && await getOutletsList());
            dispatch(setMainPageLoader(false));
        }catch(Err){
            dispatch(setMainPageLoader(false));
        }
    };

    return (
        <DrawerSlide 
            openDrawer = {manageRequestModal}
            drawerWidth= {activeTab === 0 && "45%"}
            title = {activeTab === 0? "New Request" : "History" }
        >
            <Navbar/>
            {
                activeTab === 0 && <AddNewReqBook/>
            }
            {
                activeTab === 1 && <RequestHistory/>
            }
        </DrawerSlide>
    )
};

export default MainFile;