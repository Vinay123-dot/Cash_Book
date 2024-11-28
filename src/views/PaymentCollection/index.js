import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "store";
import { setPaymentManageModal } from "./store/stateSlice";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { setReqPaymentData } from "./store/dataSlice";
import { setApprovedDates } from "views/RequestBook/store/dataSlice";
import useFetchMasterData from "utils/hooks/useFetchMasterApis";
import useFetchReqBook from "views/RequestBook/components/useFetchReqBook";
import PaymentPage from "./components/MainFile";
import requestPaymentBook from "./store/index";
import ErrorModal from "components/ui/ErrorModal";


injectReducer("paymentBook", requestPaymentBook);

const PaymentBook = () => {
    const dispatch = useDispatch();
    const { 
        getDayInfo,
        fetchPaymentTypeInfo,
        getCustomerTypeInfo
    } = useFetchMasterData();
    const { fetchRequestedDates } = useFetchReqBook();
    const { 
        PaymentModal, 
        PaymentModalMsg
    } = useSelector((state) => state.paymentBook.PaymentState);
    const { 
        dayInfoList,
        paymentTypeInfo,
        customerListInfo
    } = useSelector((state) => state.quickbookStore.state);

    useEffect(() => {
        fetchPaymentPageApi();
        getRequiredDates();
        return () => {
            dispatch(setReqPaymentData({}));
            dispatch(setApprovedDates([]));
        }
    }, []);

    const fetchPaymentPageApi = async () => {
        try {
            dispatch(setMainPageLoader(true));
            dayInfoList.length <= 0 && (await getDayInfo());
            paymentTypeInfo.length <= 0 && await fetchPaymentTypeInfo();
            customerListInfo.length <=0 && await getCustomerTypeInfo();
            dispatch(setMainPageLoader(false));
        } catch (Err) {
            dispatch(setMainPageLoader(false));
        }
    };

    const getRequiredDates = async() => {
        try{
           let response = await fetchRequestedDates({book_name : "Payment Collection"});
           dispatch(setApprovedDates(response || []));
        }catch(Err){

        }
    }

    const onEModalCancel = () => {
        dispatch(
            setPaymentManageModal({
                PaymentModal: false,
                PaymentModalMsg: "",
            })
        );
    };

    return (
        <>
            <PaymentPage/>
            {PaymentModal && (
                <ErrorModal 
                    msg={PaymentModalMsg} 
                    handleCloseEModal={onEModalCancel} 
                />
            )}
        </>
    );
};

export default PaymentBook;
