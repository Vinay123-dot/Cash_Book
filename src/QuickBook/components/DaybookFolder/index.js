import React from "react";
import MainDaybookPage from "./MainDaybookPage";
import { DaybookDataProvider } from "context/DaybookContext";

const Daybook =() => {
    return (
        <DaybookDataProvider>
            <MainDaybookPage/>
        </DaybookDataProvider>
    )
};

export default Daybook;