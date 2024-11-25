import { useDispatch,useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { apiGetRequestHistory } from "services/TransactionService";
import { setHistoryArr } from "../store/dataSlice";
import { compareDate } from "constants/app.constant";

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
        let newId = userType == 4 ? merchantId : uniqueId;
        let data = cloneDeep(reqHistoryData);
        data.key = newId;
        data.terminal_id = uniqueId;
        let response = await apiGetRequestHistory(data);
        const transformedData = (response?.data || []).map((item) => {
          return Object.keys(item).reduce((acc, key) => {
            const newKey = key.toLowerCase();
            acc[newKey] = item[key];
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
        let newId = userType == 4 ? merchantId : uniqueId;
        let data = {...obj};
        data.key = newId;
        data.terminal_id = uniqueId;
        let response = await apiGetRequestHistory(data);
        const transformedData = [];
        (response?.data || []).forEach((item) => {
          if(item.Isapproved === 1 && compareDate(item.Valid_Till)){
            transformedData.push(item.Request_Date);
          }
        });
        manageLoader(false);
        return transformedData;
      } catch (Err) {
        manageLoader(false);
        return [];
      }
    };

    return {
        viewRequestReports,
        fetchRequestedDates
    }
};

export default useFetchReqBook;