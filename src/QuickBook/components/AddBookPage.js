import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import DayBookModal from "./DayBookModal";
import AdvanceBookModal from "./AdvanceBookModal";
import BankDepositModal from "./BankDepositModal";
import PettyCashModal from "./PettyCashModal";
import PaymentCollectionModal from "./PaymentCollectionModal";
import { apiGetCommonOpeningBalance } from "../../services/TransactionService";
import { getToday, getTomorrowDate } from "../../utils/dateFormatter";
import {
  setShowAddBookPage,
  setCommonCashBalance,
  setShowDayBookFields,
  setShowUploadInvoice,
} from '../store/stateSlice';
import CButton from "../../components/ui/Button";

const { Option } = Select;
const AddBookPage = (props) => {

  const { openPage } = props;

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [showBtnsForDbook,setShowBtnsForDBook] = useState(true);
  const {
    pettyCashBalance : pettyCash,
    commonCashBanalce : bankBalance,
    remainingCommonBalance : remainingOpeningBal,
    pettyCashRemBal : pettyCashRem,
    bookTypeList
  } = useSelector(state => state.quickbookStore.state);
  let uniqueId = localStorage.getItem("uniqueId");
  let userType = localStorage.getItem("mType");

  const handleChange = (value) => setSelectedValue(value);

  if (!openPage) return null;

  const handleCancelSelectedVal = () => {
    setSelectedValue(null);
    setShowBtnsForDBook(true);
    getCommonOpeningBalance();
  };


  const getCommonOpeningBalance = async () => {
    try {
      let response = await apiGetCommonOpeningBalance({ uniqueId, date: getToday() });
      dispatch(setCommonCashBalance(response?.opening_balance));
    } catch (e) {}
  }

  const handleManagePages = (flag) => {
    dispatch(setShowDayBookFields(flag));
    dispatch(setShowUploadInvoice(!flag));
    setShowBtnsForDBook(false);
  }

  const showDayBookButtons = () => (
    <div className="flex md:flex-row-reverse gap-10  bottom-10 right-10">
      <CButton onClick={() => handleManagePages(false)}>
        Upload file
      </CButton>
      <CButton onClick={() => handleManagePages(true)}>
        Add new
      </CButton>
    </div>
  )

  const getHeaderCName = (sValue) => {
    let dVal = `grid grid-cols-1  m-3 items-center p-4  gap-4 bg-white rounded-lg ${[2,4].includes(sValue)?"md:grid-cols-3":"md:grid-cols-2"}`
    return dVal;
  }

  return (
    <div className="fixed inset-0 flex  flex-col  z-50" style={{ backgroundColor: "#e5e7eb" }}>
      <div className = {getHeaderCName(selectedValue)}>
        <Select
          showSearch
          style={{ width: 220, height: 40 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.children ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.children ?? '').toLowerCase().localeCompare((optionB?.children ?? '').toLowerCase())
          }
          onChange={handleChange}
        >
          {(bookTypeList || []).filter((eachDoc)=>eachDoc.Id != 6).map((eachOpt, i) => (
            <Option key={eachOpt.Id} value={eachOpt.Id}>
              {eachOpt.Type}
            </Option>
          ))}
        </Select>

        {
          userType == 7 && [2,4].includes(selectedValue) &&
          <div className="flex flex-col">
            <h1 style={{ color: "#5A87B2" }}>Opening Balance</h1>
            <p>{selectedValue === 4 ? pettyCash : bankBalance}</p>
          </div>
        }
        {
          userType == 7 && [2,4].includes(selectedValue) && 
          <div className="flex flex-col">
            <h1 style={{ color: "#5A87B2" }}>Remaining Balance</h1>
            <p>{selectedValue === 4 ? pettyCashRem : remainingOpeningBal}</p>
          </div>
        }
        {
          selectedValue === 3 && showDayBookButtons()
        }
      </div>

      <div className="w-100 h-full bg-white rounded-lg relative mx-3 mb-3 overflow-y-auto">

        <PettyCashModal showPettyCash={selectedValue === 4} onCancel={handleCancelSelectedVal} />
        <BankDepositModal showBankDeposit={selectedValue === 2} onCancel={handleCancelSelectedVal} />
        <AdvanceBookModal showAdvanceBook={selectedValue === 1} onCancel={handleCancelSelectedVal} />
        <DayBookModal 
          showDaybookModal={selectedValue === 3} 
          onCancel={handleCancelSelectedVal} 
        />
        <PaymentCollectionModal showPaymentColModal = {selectedValue === 5} onCancel={handleCancelSelectedVal} />

      </div>
      {
        // (!selectedValue || selectedValue === 3) && showBtnsForDbook &&
        !selectedValue &&
        <div className= "absolute flex flex-row-reverse gap-10  bottom-10 right-10">
          <CButton
            btnType="submit"
            isDisabled={true}
          >
            Save
          </CButton>
          <CButton
            onClick={() => {
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