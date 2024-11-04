import React, { useContext, useState } from "react";
import { convertToNormalFormat } from "../../../utils/dateFormatter";
import RupeePrefix from "../../../Prefixes/RupeeSign";
import { DaybookDataContext } from "../../../context/DaybookContext";
import { getTotalMoneyInDayBook } from "../CompConstants";
import CButton from "../../../components/ui/Button";
import { apiVerifyAdvancedBookReceipt } from "../../../services/TransactionService";
import { statusArr } from "../../../constants/app.constant";

const CTable = (props) => {

  const { data, handleClickCheckbox, handleInputChange } = props;
  const { daybooKData,setDaybookData } = useContext(DaybookDataContext);
  const [verifyBtnLdng,setVerifyBtnLdng] = useState(false);
  const [selectedItem,setSelectedItem] =  useState({});
  let uniqueId = localStorage.getItem("uniqueId");

  const showInputBox = ({ id, label, val, field, chkFlag, keyNum,acceptAll = false ,disabled = false,disabledIcon = false}) => (
    <div key={id + keyNum} className="w-24 relative">
      <label className="font-bold text-xs">{label}</label>
      <div className="flex border border-gray-300">
        {
          !disabledIcon && <p className="self-center">{RupeePrefix}</p>
        }
        
        <input
          type="text"
          value={val}
          disabled = {disabled}
          onChange={(e) => {
            handleInputChange(id, field, e.target.value);
          }}
          onKeyDown={(event) => {
            if (!acceptAll) {
              if (
                !/^[0-9.]$/.test(event.key) &&
                event.key !== "Backspace" &&
                event.key !== "Delete" &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
              ) {
                event.preventDefault();
              }
            }
          }}
          readOnly={chkFlag}
          className="border-none w-full pl-1 focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );

  
  const handleVerifyAdvanceMoney = async(allVal) => {
    const {advance_receipt_no,id} = allVal;
    try {
        if(!advance_receipt_no) {
          setDaybookData((prev) => ({
            ...prev,
            showErrorModal : true,
            errorMessage : "Please enter receipt number.",
          }));
          return ;
        }
        let findAdvanceObj = daybooKData.receiptsArray.find((eachObj) => eachObj.receipt_no === advance_receipt_no);
        if(findAdvanceObj){
          setDaybookData((prev) => ({
            ...prev,
            showErrorModal : true,
            errorMessage : `${advance_receipt_no} is already used.`,
          }));
          return;
        }
            setSelectedItem(allVal);
            setVerifyBtnLdng(true);
            const data = {
                key : uniqueId,
                id : advance_receipt_no
            };
        let response = await apiVerifyAdvancedBookReceipt(data);
        response && checkStatus(response,id);
        
    }catch(Err){
        setDaybookData((prev) => ({
          ...prev,
          showErrorModal : true,
          errorMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
        }));
        setVerifyBtnLdng(false);
    }
  };

  const handleRemoveAdvanceInputs = (selectedDoc) => {
    const { id } = selectedDoc;
    const updatedData = (daybooKData.excelArray || []).map((item) => {
      if (item.id === id) {
        return { ...item, 
                ["advance_customer_name"]: "",
                ["remaining_balance"] : 0,
                ["advance_receipt_amount"] : 0,
                ["advance_receipt_no"] : ''
               };
      }
      return item;
    });
    
       let filteredReiceiptArray = daybooKData.receiptsArray.filter((eachItem) => eachItem.receipt_id !== id);
        setDaybookData((prev) => ({
          ...prev,
          excelArray: updatedData,
          receiptsArray : filteredReiceiptArray
        }));
  }

  const checkStatus = (Response,Id) => {

    if(statusArr.includes(Response?.Status)){
      setVerifyBtnLdng(false);
      setDaybookData((prev) => ({
        ...prev,
        showErrorModal :  true,
        errorMessage : "This receipt number is already used",
      }));
      return;
    }
    setDaybookData((prev) =>({
      ...prev,
      receiptsArray : [...daybooKData.receiptsArray, {receipt_no :Response.Receipt_No,receipt_id:Id}]
    }))
    // setReceiptsArray((prev) => ([...prev,]));
    
    const updatedData = (daybooKData.excelArray || []).map((item) => {
        if (item.id === Id) {
          return { ...item, 
                  ["advance_customer_name"]: Response?.Customer_Name,
                  ["remaining_balance"] : Response?.Remaining_Balance || 0
                 };
        }
        return item;
      });
      setDaybookData((prev) => ({
        ...prev,
        excelArray: updatedData
      }));
      setVerifyBtnLdng(false);
  };

  return (
    <>
    <div className="mx-4 mt-4 rounded-lg overflow-x-auto h-full">
      <table className="min-w-[800px] w-full text-left border-collapse">
        {/* Table Header */}
        <thead className="bg-slate-200">
          <tr>
            <th className="p-2">Sl No.</th>
            <th className="p-2">Bill Date</th>
            <th className="p-2">Bill No.</th>
            <th className="p-2">Party Code</th>
            <th className="p-2">Party Name</th>
            <th className="p-2">Bill Amount</th>
            <th className="p-2">Customer Type</th>
          </tr>
        </thead>
  
        {/* Table Body */}
        <tbody>
          {(data || []).map((eachDoc, index) => {
          return(
            <React.Fragment key={eachDoc.id}>
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer w-5 h-5 mr-2"
                      checked={eachDoc.checked}
                      onChange={() => handleClickCheckbox(eachDoc)}
                    />
                    {index + 1}
                  </div>
                </td>
                <td className="p-2">{convertToNormalFormat(eachDoc.date)}</td>
                <td className="p-2">{eachDoc.bill_no}</td>
                <td className="p-2">{eachDoc.party_code}</td>
                <td className="p-2">{eachDoc.party_name}</td>
                <td className="p-2">{eachDoc.bill_value}</td>
                <td className="p-2">{eachDoc.displayedCusType}</td>
              </tr>
  
              {/* Input fields row */}
              <tr className="border-b">
                <td colSpan="7" className="p-2">
                  <div className="flex space-x-4">
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 3, label: "Cash", val: eachDoc.cash_amount, field: "cash_amount", chkFlag: eachDoc.checked })
                    }
                    {
                      showInputBox({ id: eachDoc.id ,keyNum: 4, label: "UPI", val: eachDoc.upi_amount, field: "upi_amount", chkFlag: eachDoc.checked })
                    }
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 8, label: "Card", val: eachDoc.credit_card_amount, field: "credit_card_amount", chkFlag: eachDoc.checked })
                    }
                    <div className="flex items-center self-start">
                      {
                        showInputBox({ id: eachDoc.id,keyNum: 11, label: "Receipt Number", val: eachDoc.advance_receipt_no, field: "advance_receipt_no", chkFlag: eachDoc.checked,acceptAll : true,disabled :eachDoc.remaining_balance ? true : false,disabledIcon : true })
                      }
                      <CButton
                        className="ml-2 self-end"
                        style={{ width: 60, height: 26 }}
                        isLoading={eachDoc.id === selectedItem.id && verifyBtnLdng}
                        isDisabled={!eachDoc.advance_receipt_no ||(eachDoc.id === selectedItem.id && verifyBtnLdng)}
                        onClick={() => {
                          eachDoc.remaining_balance ? 
                          handleRemoveAdvanceInputs(eachDoc) :
                          handleVerifyAdvanceMoney(eachDoc)
                        }}
                      >
                        {
                          eachDoc.remaining_balance ? "Remove" : "Verify"
                        }
                      </CButton>
                    </div>
                    <div className="self-start  w-24">
                      <label className="font-bold text-xs">Receipt Amount</label>
                      <div>{eachDoc.remaining_balance || 0}</div>
                    </div>
                    <div>
                      {
                        showInputBox(
                          { 
                            id: eachDoc.id ,keyNum : 12, label: "Using Amount", 
                            val: eachDoc.advance_receipt_amount, field: "advance_receipt_amount", 
                            chkFlag: eachDoc.checked,disabled : !eachDoc.remaining_balance ? true : false 
                          }
                        )
                      }
                    </div>
                    {
                      showInputBox({ id: eachDoc.id ,keyNum: 5, label: "Bank", val: eachDoc.online_bank_amount, field: "online_bank_amount", chkFlag: eachDoc.checked })
                    }
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 9, label: "P_Gateway", val: eachDoc.pg_order_amount, field: "pg_order_amount", chkFlag: eachDoc.checked })
                    }
                    
                    {/* {showInputBox({ id: eachDoc.id ,keyNum : 7, label: "Debit_C", val: eachDoc.debit_card_amount, field: "debit_card_amount", chkFlag: eachDoc.checked })} */}
                    
                    
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 10, label: "Ref Order", val: eachDoc.reference_order_amount, field: "reference_order_amount", chkFlag: eachDoc.checked })
                    }
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 13, label: "Ref Name", val: eachDoc.reference_name, field: "reference_name", chkFlag: eachDoc.checked,acceptAll : true ,disabledIcon : true})
                    }
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 6, label: "Cheque", val: eachDoc.bank_cheque_amount, field: "bank_cheque_amount", chkFlag: eachDoc.checked })
                    }
                    {
                      showInputBox({ id: eachDoc.id ,keyNum : 14, label: "Remarks", val: eachDoc.reason, field: "reason", chkFlag: eachDoc.checked ,acceptAll : true,disabledIcon : true})
                    }
                  </div>
                </td>
              </tr>
            </React.Fragment>
          )})}
        </tbody>
      </table>
    </div>
    </>
    
  );

};

export default CTable;