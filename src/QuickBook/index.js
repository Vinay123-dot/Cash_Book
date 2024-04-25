import React from "react";
import QuickBookHeader from "../QuickBook/components/QuickBookHeader";
import QuickBookTools from "../QuickBook/components/QuickBookTools";
import QuickBookTable from "../QuickBook/components/QuickBookTable";
import AdaptableCard from "../components/shared/AdaptableCard";
import { injectReducer} from "../store/index";
import reducer from "./store/index";
import PageNotFound from "../PageNotFound";

injectReducer('quickbookStore',reducer);

const Quickbook = () => {
  let userType = localStorage.getItem("mType");

  console.log("USERTYPE",userType)
  // const handleClick = () => {
  //   const url = 'https://merchants.swinkpay-fintech.com/mosv1/signin?redirectUrl=/transactions'; // Replace this with your desired URL
  //   window.location.href = url; // Opens the URL in the same tab
  // };

  return  !userType ?  <PageNotFound/> :
      <AdaptableCard className="h-full overflow-hidden border-0 rounded-none" bodyClass="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-8 px-10 py-8 xl:py-4 ">
          <p className="text-black text-opacity-100 text-2xl font-bold leading-10 col-start-1 col-span-0 xl:col-span-2" >Cash Book</p>
          <div>
      {/* <button onClick={handleClick}>Open Link</button> */}
    </div>
          <QuickBookHeader />
        </div>
        <hr className="border border-[#F4F6F9]" />
        <AdaptableCard
          className="h-full pt-4 border-0 rounded-none"
          bodyClass="h-full p-0"
        >
          <QuickBookTools/>
          <QuickBookTable/>
        </AdaptableCard>
      </AdaptableCard>

  

}

export default Quickbook;