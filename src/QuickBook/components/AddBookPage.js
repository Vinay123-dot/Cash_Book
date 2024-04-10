import React, { useState } from "react";
import { Select } from "antd";
import { HeaderSelectOptions } from "../../Constants";
import DayBookModal from "./DayBookModal";
import AdvanceBookModal from "./AdvanceBookModal";
import BankDepositModal from "./BankDepositModal";
import PettyCashModal from "./PettyCashModal";

const AddBookPage = (props) => {

  const {openPage} = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);
  
  if(!openPage) return null;

  return (
    <div className="fixed inset-0 flex  flex-col  z-50" style={{ backgroundColor: "#e5e7eb" }}>
      <div className="grid grid-cols-2  w-100 h-20 m-3 items-center p-4  gap-4 bg-white rounded-lg" >
        <Select
          showSearch
          style={{ width: 220, height: 40 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={handleChange}
          options={HeaderSelectOptions}

        />
        <div className="flex flex-col">
          <h1 style={{ color: "#5A87B2" }}>Opening Balance</h1>
          <p>100,000,0</p>
        </div>

      </div>

      <div className="w-100 h-full bg-white rounded-lg relative mx-3 mb-3 overflow-y-auto" >
 
        <PettyCashModal showPettyCash = {selectedValue === 3}/>
        <BankDepositModal showBankDeposit = {selectedValue === 4}/>
        <AdvanceBookModal showAdvanceBook = {selectedValue === 2}/>
        <DayBookModal  showDaybookModal = {selectedValue === 1}/>

      </div>






    </div>
  )

}

export default AddBookPage;