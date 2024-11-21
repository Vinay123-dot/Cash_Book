import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Select } from "antd";
import DaybookPage from "./DaybookFolder";
import AdvanceBookModal from "./AdvanceBookModal";
import BankDeposit from "./BankDeposit";
import PettyCashModal from "./PettyCashModal";
import PaymentCollectionModal from "./PaymentCollectionModal";
import {
  setShowAddBookPage,
  setShowDayBookFields,
  setShowUploadInvoice,
  setSelectedBookType
} from '../store/stateSlice';
import CButton from "components/ui/Button";
import amountFormatter from "utils/amountFormatter";
import {
  ADVANCEBOOK_ID,
  BANKDEPOSIT_ID,
  DAYTRANSACTIONS_ID,
  PAYMENTCOLLECTION_ID,
  PETTYCASH_ID,
} from "constants/app.constant";

const { Option } = Select;
const AddBookPage = (props) => {

  const { openPage } = props;

  const dispatch = useDispatch();
  const {
    pettyCashBalance : pettyCash,
    commonCashBanalce : bankBalance,
    remainingCommonBalance : remainingOpeningBal,
    pettyCashRemBal : pettyCashRem,
    bookTypeList,
    selectedBookType
  } = useSelector(state => state.quickbookStore.state);
  let userType = localStorage.getItem("mType");

  const handleChange = (value) => dispatch(setSelectedBookType(value));

  if (!openPage) return null;


  const handleManagePages = (flag) => {
    dispatch(setShowDayBookFields(flag));
    dispatch(setShowUploadInvoice(!flag));
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

  const caseSensitiveFilterOption = (input, option) => {
    return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
  };
  
  return (
    <div className="fixed inset-0 flex  flex-col  z-50" style={{ backgroundColor: "#e5e7eb"}}>
      <div className = {getHeaderCName(selectedBookType)}>
        <Select
          showSearch
          style={{ width: 220, height: 40 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={caseSensitiveFilterOption}
          onChange={handleChange}
        >
          {(bookTypeList || []).filter((eachDoc)=>eachDoc.Id != 6).map((eachOpt, i) => (
            <Option key={eachOpt.Id} value={eachOpt.Id}>
              {eachOpt.Type}
            </Option>
          ))}
        </Select>

        {
          userType == 7 && [2,4].includes(selectedBookType) &&
          <div className="flex flex-col">
            <label htmlFor = "open_bal" className="text-blue-600 text-lg font-medium tracking-wide mb-1">Opening Balance</label>
            <p id="open_bal" className="text-2xl">{amountFormatter(selectedBookType === 4 ? pettyCash : bankBalance)}</p>
          </div>
        }
        {
          userType == 7 && [2,4].includes(selectedBookType) && 
          <div className="flex flex-col">
            <label  htmlFor = "rem_bal" className="text-blue-600 text-lg font-medium tracking-wide mb-1">Remaining Balance</label>
            <p id = "rem_bal" className="text-2xl">{amountFormatter(selectedBookType === 4 ? pettyCashRem : remainingOpeningBal)}</p>
          </div>
        }
        {
          selectedBookType === 3 && showDayBookButtons()
        }
      </div>

      <div className=" mx-3 bg-white rounded-lg relative  h-[calc(100vh-7rem)]">
        {
          selectedBookType === ADVANCEBOOK_ID && <AdvanceBookModal/>
        }
        {
          selectedBookType === BANKDEPOSIT_ID && <BankDeposit/>
        }
        {
          selectedBookType === DAYTRANSACTIONS_ID && <DaybookPage/>
        }
        {
          selectedBookType === PETTYCASH_ID && <PettyCashModal/>
        }
        {
          selectedBookType === PAYMENTCOLLECTION_ID && <PaymentCollectionModal/>
        }
        

      </div>
      {
        !selectedBookType &&
        <div className= "absolute flex flex-row-reverse gap-10  bottom-10 right-10">
          <CButton
            btnType="submit"
            isDisabled={true}
          >
            Save
          </CButton>
          <CButton
            onClick={() => {
              dispatch(setSelectedBookType(null));
              dispatch(setShowAddBookPage(false));
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

AddBookPage.propTypes = {
  openPage : PropTypes.bool.isRequired,
};