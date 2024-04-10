import React from "react";
import QuickBookHeader from "../QuickBook/components/QuickBookHeader";
import QuickTools from "../QuickBook/components/QuickBookTools";
import QuickBookTable from "../QuickBook/components/QuickBookTable";
import AdaptableCard from "../components1/shared/AdaptableCard";
import { injectReducer} from "../store/index";
import reducer from "./store/index";

injectReducer('quickbookStore',reducer)

const Quickbook = () => {
  return (
      <AdaptableCard className="h-full border-0 rounded-none" bodyClass="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-8 px-10 py-8 xl:py-4 ">
          <p className="text-black text-opacity-100 text-2xl font-bold leading-10 col-start-1 col-span-0 xl:col-span-2" >Cash Book</p>
          <QuickBookHeader />
        </div>
        <hr className="border border-[#F4F6F9]" />
        <AdaptableCard
          className="h-full pt-4 border-0 rounded-none"
          bodyClass="h-full p-0"
        >
          <QuickTools/>
          <QuickBookTable/>
        </AdaptableCard>
      </AdaptableCard>

  )

}

export default Quickbook;