import React, { useEffect } from "react";
import QuickBookHeader from "../QuickBook/components/QuickBookHeader";
import TransactionCount from "../QuickBook/components/TransactionCount";
import QuickBookTools from "../QuickBook/components/QuickBookTools";
import QuickBookTable from "../QuickBook/components/QuickBookTable";
import AdaptableCard from "../components/shared/AdaptableCard";
import { injectReducer } from "../store/index";
import reducer from "./store/index";
import PageNotFound from "../PageNotFound";
import { useSelector } from "react-redux";
import { DISABLED_TRANSACTION_COUNT_PAGES } from "../Constants";
import RequestBook from "views/RequestBook";
import Loader from "components/shared/Loader";
import useFetchMasterData from "utils/hooks/useFetchMasterApis";
import { USER_LIST } from "constants/app.constant";
import AddBookPage from "./components/AddBookPage";

injectReducer('quickbookStore', reducer);

const Quickbook = () => {

  const {
    getOutletsList,
    getPettycashReasons,
    getBookTypeInfo,
    getDayInfo,
    fetchDepositTypeList,
    fetchDepositModeList,
    fetchPaymentTypeInfo,
    getUpiTypeInfo,
    getCustomerTypeInfo,
    getsalesTypesInfo,
  } = useFetchMasterData();
  const {
    showAddBookPage
} = useSelector(state => state.quickbookStore.state);
  const { 
    mainPageLoader, 
    cashbookData 
  } = useSelector((state) => state.quickbookStore.data);
  const userType = localStorage.getItem("mType");

  useEffect(() => {
    if(USER_LIST.includes(userType)) {
      getOutletsList();
      getPettycashReasons();
      getBookTypeInfo();
      getDayInfo();
      fetchDepositTypeList();
      fetchDepositModeList();
      fetchPaymentTypeInfo();
      getUpiTypeInfo();
      getCustomerTypeInfo();
      getsalesTypesInfo();
    }
  },[userType])


  return !USER_LIST.includes(userType) ? (
    <PageNotFound />
  ) : (
    <AdaptableCard
      className="h-full overflow-hidden border-0 rounded-none"
      bodyClass="p-0"
    >
      <QuickBookHeader />
      {!DISABLED_TRANSACTION_COUNT_PAGES.includes(cashbookData.book_type) && (
        <TransactionCount />
      )}

      <hr className="border border-[#F4F6F9]" />
      <AdaptableCard
        className="h-full border-0 rounded-none"
        bodyClass="h-full p-0"
      >
        <QuickBookTools />
        <QuickBookTable />
      </AdaptableCard>
      <RequestBook />
      <AddBookPage openPage={showAddBookPage} />
      <Loader showLoading={mainPageLoader} />
    </AdaptableCard>
  );

};

export default Quickbook;