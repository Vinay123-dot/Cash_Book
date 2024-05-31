import React, { useEffect, useState } from "react";
import QuickBookHeader from "../QuickBook/components/QuickBookHeader";
import QuickBookTools from "../QuickBook/components/QuickBookTools";
import QuickBookTable from "../QuickBook/components/QuickBookTable";
import AdaptableCard from "../components/shared/AdaptableCard";
import { injectReducer } from "../store/index";
import reducer from "./store/index";
import PageNotFound from "../PageNotFound";
import Loader from "../components/shared/Loader";
import { useSelector } from "react-redux";

injectReducer('quickbookStore', reducer);

const userList = ["4", "7"];

const Quickbook = () => {
  let userType = localStorage.getItem("mType");
  const mainPageLoader = useSelector(state => state.quickbookStore.state.mainPageLoader);
 
  return !userList.includes(userType) ? <PageNotFound /> :
    <AdaptableCard className="h-full overflow-hidden border-0 rounded-none" bodyClass="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  md:gap-8 px-10 py-8">
        <p className="text-black text-opacity-100 text-2xl font-bold leading-10 col-start-1 col-span-0 xl:col-span-1">Cash Book</p>
     
        <QuickBookHeader/>
      </div>
      <hr className="border border-[#F4F6F9]" />
      <AdaptableCard
        className="h-full pt-4 border-0 rounded-none"
        bodyClass="h-full p-0"
      >
        <QuickBookTools />
        <QuickBookTable />
      </AdaptableCard>
      <Loader showLoading = {mainPageLoader}/>
    </AdaptableCard>



}

export default Quickbook;