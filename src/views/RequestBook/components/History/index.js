import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setHistoryArr, setReqHistoryData } from "../../store/dataSlice";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import useFetchReqBook from "../useFetchReqBook";
import useFetchMasterData from "utils/hooks/useFetchMasterApis";
import RequestHistoryHeader from "./RequestHistoryHeader";
import RequestHistoryFooter from "./RequestHistoryFooter";
import ReqHistoryData from "./ReqHistoryData";

const RequestHistory = () => {

    const dispatch = useDispatch();
    const { viewRequestReports } = useFetchReqBook();
    const { 
      getDayInfo,
      getBookTypeInfo,
      getOutletsList
    } = useFetchMasterData();
    const { 
      bookTypeList,
      dayInfoList,
      allTerminalList
    } = useSelector((state) => state.quickbookStore.state);

    useEffect(() => {
      fetchPaymentPageApi();
      return () => {
        dispatch(setReqHistoryData({}));
      }
    }, []);

    const fetchPaymentPageApi = async () => {
      try {
          dispatch(setMainPageLoader(true));
          dayInfoList.length <= 0 && await getDayInfo();
          bookTypeList.length <=0 && await getBookTypeInfo();
          allTerminalList.length <=0 && await getOutletsList();
          dispatch(setMainPageLoader(false));
      } catch (Err) {
          dispatch(setMainPageLoader(false));
      }
    };

    const onSaveRequestHistory = async() => {
      // try{
      //   mainLoader(true);
      //   const { given_date,payment_type,given_amount,bank_name,transaction_num } = reqPaymentData;
      //   let isRequiredFields = given_date && payment_type && given_amount;
        
      //   if ([BANK_ID, CHEQUE_ID].includes(payment_type)) {
      //     isRequiredFields = isRequiredFields && bank_name && transaction_num;
      //   };
        
      //   if(!isRequiredFields){
      //     updateModalStatus({
      //       PaymentModal: true,
      //       PaymentModalMsg: "Please fill the above fields to continue",
      //     });
      //     return;
      //   }
      
      //   let checkPaymentRange = calculateAmount(paymentColArray) > Number(reqPaymentData.given_amount);
      //   if(checkPaymentRange){
      //     updateModalStatus({
      //       PaymentModal: true,
      //       PaymentModalMsg: `The given amount should be lessthan or equal to ${amountFormatter(
      //         reqPaymentData.given_amount
      //       )}`,
      //     })
      //     return;
      //   }
      //   let updatedList = getUpdatedList();
      //   let response = await savePaymentReports(updatedList);
      //   if(response?.statusCode === 200) {
      //     dispatch(setClearAllPaymentPageFields({}));
      //     setTimeout(() => {
      //       viewPaymentReports();
      //     },100);
      //   };
      //   updateModalStatus({
      //     PaymentModal: response?.show,
      //     PaymentModalMsg: response?.message,
      //   });
      //   response?.statusCode !== 200 && mainLoader(false);
      // }catch(Err){
      //   mainLoader(false);
      // }
    };
  
    
   
    return (
      <div className="h-full flex flex-col p-2 overflow-auto">

        <div className="flex-none"> {/* header button section */}
          <RequestHistoryHeader/>
        </div>
        
        <div className="flex-grow overflow-hidden min-h-48 h-auto md:min-h-0 mt-2">
          <ReqHistoryData/>
        </div>
        <div className="flex-none"> {/* footer button section */}
          <RequestHistoryFooter 
            handleSavePaymentHistory={onSaveRequestHistory} 
          />
        </div>
        
      </div>
    );
};

export default RequestHistory;