import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import AddNewReqBook from "./AddRequest/NewRequestBook";
import RequestHistory from "./History";
import useFetchMasterData from "utils/hooks/useFetchMasterApis";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import DrawerSlide from "components/shared/Drawer";

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