import React,{useContext, useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import AddDaybook from "./AddDaybook";
import UploadInvoice from "./UploadInvoiceModal";
import { DaybookDataContext } from "../../../context/DaybookContext";
import Loader from "../../../components/shared/Loader";
import ErrorModal from "../../../components/ui/ErrorModal";
import { 
    apiGetCustomerTypeInfo, 
    apiGetDayBookExcelData, 
    apiGetPaymentTypeInfo, 
    apiGetSalesTypeInfo, 
    apiGetUPITypeInfo 
} from "../../../services/TransactionService";
import DaybookExcel from "./DaybookExcel";
import { getConvertedObj } from "../CompConstants";
import { INDEPENDENTWORKSHOP, slicedCustomerTypeObj,INDEPENDENT_WORKSHOP } from "../../../constants/app.constant";

const MainDaybookPage = () => {

    const { 
        showdayBookFields,
        showUploadInvoice
    } = useSelector(state => state.quickbookStore.state);
    const {daybooKData,setDaybookData} = useContext(DaybookDataContext);

    useEffect(() => {
        fetchReqTypesInDayBook();
    },[])


    const fetchReqTypesInDayBook = async() => {
        try{
            // setDaybookData((prev) => ({...prev,showDaybookLoader : true}));
            const [salesList,paymentArray,upiArray,customerArr] = await Promise.all([
                apiGetSalesTypeInfo(),apiGetPaymentTypeInfo(),
                apiGetUPITypeInfo(),apiGetCustomerTypeInfo()
            ]);
            setDaybookData((prev) => (
                {
                    ...prev,
                    salesType : salesList?.data || [],
                    paymentListInfo : paymentArray?.data || [],
                    upiTypeInfo : upiArray?.data || [],
                    customerListInfo : customerArr?.data || [],

                })
            )
        }catch(e){
            setDaybookData((prev) => ({...prev,showDaybookLoader : false})); //add again after check
        }
    }


    const onEModalCancel = () => {
        setDaybookData({
            ...daybooKData,
            showErrorModal : false,
            errorMessage : ""

        })
    };

    return(
        <>
        {
            showdayBookFields && <AddDaybook/>
        }
        {
            showUploadInvoice && <UploadInvoice/>
        }
        <DaybookExcel/>
        {
            daybooKData.showErrorModal && 
            <ErrorModal 
                msg = {daybooKData.errorMessage} 
                handleCloseEModal = {onEModalCancel}
            />
        }
        <Loader 
            showLoading = {daybooKData.showDaybookLoader}
        />
        
        </>
    )
};

export default MainDaybookPage;