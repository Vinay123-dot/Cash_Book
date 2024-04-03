import React from "react";
import Header from "./QuickBookHeader";
import QuickTools from "./QuickBookTools";
import QuickBookTable from "./QuickBookTable";


const Quickbook = () => {
    return (
      <div>
        <Header/>
        <QuickTools/>
        <QuickBookTable/>
      </div>
    ) 

}

export default Quickbook;