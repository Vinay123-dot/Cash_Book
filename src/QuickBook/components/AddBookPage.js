import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { HeaderSelectOptions } from "../../Constants";
import DayBookModal from "./DayBookModal";
import AdvanceBookModal from "./AdvanceBookModal";
import BankDepositModal from "./BankDepositModal";
import PettyCashModal from "./PettyCashModal";
import { apiGetCommonOpeningBalance, apiGetPettyCashCommonBalance } from "../../services/TransactionService";
import { getToday, getTomorrowDate } from "../../utils/dateFormatter";
import {
  setPettyCashBalance,
  setShowAddBookPage,
  setCommonCashBalance,
  setShowDayBookFields,
  setShowUploadInvoice
} from '../store/stateSlice';
import CButton from "../../components/ui/Button";


const AddBookPage = (props) => {

  const { openPage } = props;

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const pettyCash = useSelector(state => state.quickbookStore.state.pettyCashBalance);
  const bankBalance = useSelector(state => state.quickbookStore.state.commonCashBanalce);
  let uniqueId = localStorage.getItem("uniqueId");
  let userType = localStorage.getItem("mType");

  const handleChange = (value) => setSelectedValue(value);

  useEffect(() => {
    userType == 7 && getPettyCashCommBalance();
  }, [userType])

  const getPettyCashCommBalance = async () => {
    try {
      let response = await apiGetPettyCashCommonBalance({ uniqueId });
      dispatch(setPettyCashBalance(response?.opening_balance));
    } catch (e) {

    }
  }
  // const handleCancelSelectedVal = useCallback(() => {
  //   console.log("CALLBACk");
  //   // Handle cancel logic
  //   setSelectedValue(null);
  //   getCommonOpeningBalance();
  // }, []);

  if (!openPage) return null;

  const handleCancelSelectedVal = () => {
    setSelectedValue(null);
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
  }

  const showDayBookButtons = () => (
    <div className="flex md:flex-row-reverse gap-10  bottom-10 right-10">
      <CButton onClick={() => handleManagePages(true)}>
        Add new
      </CButton>
      <CButton onClick={() => handleManagePages(false)}>
        Upload file
      </CButton>
    </div>
  )

  return (
    <div className="fixed inset-0 flex  flex-col  z-50" style={{ backgroundColor: "#e5e7eb" }}>
      <div className="grid grid-cols-1  m-3 items-center p-4  gap-4 bg-white rounded-lg md:grid-cols-2">
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
          selectedValue === 3 && userType == 7 &&
          <div className="flex flex-col">
            <h1 style={{ color: "#5A87B2" }}>Opening Balance</h1>
            <p>{pettyCash}</p>
          </div>
        }
        {
          selectedValue === 4 && userType == 7 &&
          <div className="flex flex-col">
            <h1 style={{ color: "#5A87B2" }}>Opening Balance</h1>
            <p>{bankBalance}</p>
          </div>
        }
        {
          selectedValue === 1 && showDayBookButtons()
        }
      </div>

      <div className="w-100 h-full bg-white rounded-lg relative mx-3 mb-3 overflow-y-auto" >

        <PettyCashModal showPettyCash={selectedValue === 3} onCancel={handleCancelSelectedVal} />
        <BankDepositModal showBankDeposit={selectedValue === 4} onCancel={handleCancelSelectedVal} />
        <AdvanceBookModal showAdvanceBook={selectedValue === 2} onCancel={handleCancelSelectedVal} />
        <DayBookModal showDaybookModal={selectedValue === 1} onCancel={handleCancelSelectedVal} />

      </div>
      {
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