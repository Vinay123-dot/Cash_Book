import { useDispatch,useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { apiGetPaymentHistory, apiStorePaymentCollectionInfo } from "services/TransactionService";
import { setPaymentColArr } from "../store/dataSlice";
import { FAILED, INDEPENDENT_WORKSHOP, INDEPENDENTWORKSHOP, MERCHANT_ID, SUCCESS } from "constants/app.constant";

const usePaymentReports = () => {

    const dispatch = useDispatch();
    const { 
      reqPaymentData
    } = useSelector(state => state.paymentBook.PaymentData);
    const { 
      customerListInfo
    } = useSelector((state) => state.quickbookStore.state);
    const manageLoader = (flag) => dispatch(setMainPageLoader(flag));
    
    const uniqueId = localStorage.getItem("uniqueId");
    const userType = localStorage.getItem("mType");
    const merchantId = localStorage.getItem("mId");

    const getCustomerId = (cType) => {
      let findedObj;
      if (cType === INDEPENDENTWORKSHOP) {
        findedObj = (customerListInfo || []).find(
          (eachItem) => eachItem.Type === INDEPENDENT_WORKSHOP
        );
      } else {
        findedObj = (customerListInfo || []).find(
          (eachItem) => eachItem.Type === cType
        );
      }
      return findedObj?.Id || null;
    };

    const viewPaymentReports = async () => {
      try {
        manageLoader(true);
        // dispatch(setPaymentColArr([]));
        let newId = userType == MERCHANT_ID ? merchantId : uniqueId;
        let data = cloneDeep(reqPaymentData);
        data.key = newId;
        data.terminal_id = uniqueId;
        let response = await apiGetPaymentHistory(data);
        const transformedData = (response?.data || []).map((item) => {
          return Object.keys(item).reduce((acc, key) => {
            const newKey = key.toLowerCase();
            acc[newKey] = item[key];
            acc["input_amount"] = "";
            acc["customer_type"] = typeof item["Customer_Type"] === 'string' ? getCustomerId(item["Customer_Type"]) : item["Customer_Type"];
           
            return acc;
          }, {});
        });
        dispatch(setPaymentColArr(transformedData || []));
        manageLoader(false);
      } catch (Err) {
        dispatch(setPaymentColArr([]));
        manageLoader(false);
      }
    };

    const savePaymentReports = async(selectedArr) => {
      try{
          let response = await apiStorePaymentCollectionInfo(selectedArr);
          return {
            show : true,
            message : response.message,
            status : response.message ?  SUCCESS : FAILED,
            statusCode : response.message ? 200 : 500
          }
      }catch(Err){
        return {
          show : true,
          message : Err?.response?.data?.detail || "Failed to submit data.Please Check the details again",
          status : FAILED,
          statusCode : 422
        }
      }
    };

    return {
        viewPaymentReports,
        savePaymentReports
    }
};

export default usePaymentReports;