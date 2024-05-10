import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Select } from "antd";
import { HeaderSelectOptions } from "../../Constants";
import DayBookModal from "./DayBookModal";
import AdvanceBookModal from "./AdvanceBookModal";
import BankDepositModal from "./BankDepositModal";
import PettyCashModal from "./PettyCashModal";
import { apiGetPettyCashCommonBalance } from "../../services/TransactionService";
import { getToday } from "../../utils/dateFormatter";
import {
  setPettyCashBalance,
  setShowAddBookPage
} from '../store/stateSlice';
import CButton from "../../components/ui/Button";


const AddBookPage = (props) => {

  const {openPage} = props;
  
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);
  const pettyCash = useSelector(state => state.quickbookStore.state.pettyCashBalance);
  const bankBalance = useSelector(state => state.quickbookStore.state.commonCashBanalce);



  useEffect(() => {
    getPettyCashCommBalance();
},[])

const getPettyCashCommBalance = async() => {
    try{
        let today_date = getToday();
        let response = await apiGetPettyCashCommonBalance(today_date);
        dispatch(setPettyCashBalance(response?.opening_balance));
        // setPettyCash(response?.opening_balance);
    }catch(e){

    }
}
  
  if(!openPage) return null;

  const handleCancelSelectedVal = () => setSelectedValue(null);

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
        {
          selectedValue === 3 &&  
          <div className="flex flex-col">
          <h1 style={{ color: "#5A87B2" }}>Opening Balance</h1>
          <p>{pettyCash}</p>
        </div>
        }
        {
          selectedValue === 4 &&  
          <div className="flex flex-col">
          <h1 style={{ color: "#5A87B2" }}>Opening Balance</h1>
          <p>{bankBalance}</p>
        </div>
        }
      </div>

      <div className="w-100 h-full bg-white rounded-lg relative mx-3 mb-3 overflow-y-auto" >
 
        <PettyCashModal showPettyCash = {selectedValue === 3} onCancel ={handleCancelSelectedVal}/>
        <BankDepositModal showBankDeposit = {selectedValue === 4} onCancel ={handleCancelSelectedVal}/>
        <AdvanceBookModal showAdvanceBook = {selectedValue === 2} onCancel ={handleCancelSelectedVal}/>
        <DayBookModal  showDaybookModal = {selectedValue === 1} onCancel ={handleCancelSelectedVal}/>

      </div>
      {
        !selectedValue &&
        <div className=" absolute flex flex-row-reverse gap-10  bottom-10 right-10">
          <CButton 
            btnType = "submit" 
            isDisabled = {true}
          >
            Save
          </CButton>
          <CButton 
            onClick={() =>{
              setSelectedValue(null);
              dispatch(setShowAddBookPage(false))
            }}
            type="cancel"
          >
            Cancel
          </CButton>
        </div>
      }
    </div>
  )

}

export default AddBookPage;