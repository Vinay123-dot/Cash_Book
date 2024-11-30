import { useDispatch,useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { apiDeleteRequestBook, apiGetRequestHistory } from "services/TransactionService";
import { setHistoryArr, setRequestedDates } from "../store/dataSlice";
import { compareDate, FAILED, MERCHANT_ID, SUCCESS } from "constants/app.constant";

const useFetchReqBook = () => {

    const dispatch = useDispatch();
    const { reqHistoryData } = useSelector(state => state.requestBook.reqData);
    const manageLoader = (flag) => dispatch(setMainPageLoader(flag));
    
    const uniqueId = localStorage.getItem("uniqueId");
    const userType = localStorage.getItem("mType");
    const merchantId = localStorage.getItem("mId");

    const viewRequestReports = async () => {
      try {
        manageLoader(true);
        let newId = userType == MERCHANT_ID ? merchantId : uniqueId;
        let data = cloneDeep(reqHistoryData);
        data.key = newId;
        data.terminal_id = userType == MERCHANT_ID ? reqHistoryData.terminal_id : uniqueId;
        let response = await apiGetRequestHistory(data);
        const transformedData = (response?.data || []).map((item) => {
          return Object.keys(item).reduce((acc, key) => {
            const newKey = key.toLowerCase();
            acc[newKey] = item[key];
            acc["isapproved_dummy"] = item["Isapproved"];
            return acc;
          }, {});
        });
        dispatch(setHistoryArr(transformedData || []));
        manageLoader(false);
      } catch (Err) {
        dispatch(setHistoryArr([]));
        manageLoader(false);
      }
    };

    const fetchRequestedDates = async (obj) => {
      try {
        manageLoader(true);
        let newId = userType === MERCHANT_ID ? merchantId : uniqueId;
        let data = {...obj};
        data.key = newId;
        data.terminal_id = uniqueId;
        let response = await apiGetRequestHistory(data);
        const transformedData = [],totalData = [];
        (response?.data || []).forEach((item) => {
          totalData.push(item);
          if(compareDate(item.Valid_Till) && item.Isapproved === 1){
            transformedData.push(item.Request_Date);
          };
        });
        dispatch(setRequestedDates(totalData));
        manageLoader(false);
        return transformedData;
      } catch (Err) {
        manageLoader(false);
        dispatch(setRequestedDates([]));
        return [];
      }
    };

    const deleteRequestHistory = async(givenId) => {
      try{
          let response = await apiDeleteRequestBook(givenId);
          return {
            show : true,
            message : response.status === 200 ? "The selected record is deleted sucessfully." : 'Unable to delete record',
            status : response.status === 200  ?  SUCCESS : FAILED,
            statusCode : response.status
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
        viewRequestReports,
        fetchRequestedDates,
        deleteRequestHistory
    }
};

export default useFetchReqBook;