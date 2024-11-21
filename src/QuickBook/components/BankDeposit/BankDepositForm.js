import React, { useContext } from "react";
import {useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Form,useFormikContext } from 'formik';
import CButton from "components/ui/Button";
import AntdFormikSelect from "components/ui/AntdFormikSelect";
import AntdInput from "components/ui/AntdInput";
import AntdTextArea from "components/ui/AntdTextArea";
import ParagraphTag from "constants/PTag";
import AntdDatePicker from "components/ui/AntdDatePicker";
import { BankDepositContext } from "context/BankDepositContext";
import {
    ADVANCE_RECEIPT_CANCEL,
    ALLOW_AMOUNT_FILEDS,
    ALLOW_REMAINNG_FIELDS,
    DEPOSIT_ID,
    HEAD_OFFICE_ID,
    ORDER_CANCEL_ID,
    RETURN_ORDER,
    statusArr,
} from "constants/app.constant";

const ShowTextBoxInPC = (label, value, ph) => (
    <AntdTextArea
        text={label}
        value={value}
        ph={ph}
    />
);
const list = ["date","deposit_mode","reason","amount","remaining_balance","advance_receipt_no","receipt_type_id",];
const sub_list = ["advance_receipt_no","amount","bill_number","store_id","return_number","reason","receipt_status"];

const BankDepositForm = (props) => {

    const {handleVerifyAdvanceMoney,handleVerifyReturnOder,handleCancelBankDeposit} = props;
    const { bankDepositData } = useContext(BankDepositContext);
    const { values,setFieldValue } = useFormikContext();
    const allTerminals = useSelector(state => state.quickbookStore.state.allTerminalList);

    const setValue = ({ label = "", value = null }) => setFieldValue(label, value);


    const handleChangeType = (name, val) => {
      list.forEach((eachItem) =>
        setValue({
          label: eachItem,
          value: eachItem === "advance_receipt_no" ? "" : null,
        })
      );
      setValue({ label: name, value: val });
    };

    const handleChangeReceiptType = (name,val) => {
      sub_list.forEach((eachItem) =>
        setValue({
          label: eachItem,
          value: ["advance_receipt_no","bill_number","return_number","reason","receipt_status"].includes(eachItem) ? "" : null,
        })
      );
      setValue({ label: name, value: val });
    }

    const showAmountField = (valObj) => {
        return valObj.type != null && ALLOW_AMOUNT_FILEDS.includes(valObj.type);
    };
      
    const showRemainingBalField = (valObj) => {
        return valObj.type != null && ALLOW_REMAINNG_FIELDS.includes(valObj.type);
    };
      
    const showReceiptTypeField = (valObj) => {
        return valObj.type != null && valObj.type === ORDER_CANCEL_ID;
    };
      
    const showReceiptNumberField = (valObj) => {
        return valObj.type != null && [ORDER_CANCEL_ID].includes(valObj.type) &&
            valObj.receipt_type_id === ADVANCE_RECEIPT_CANCEL; 
    };
      
    const showReceiptOrReturnAmount = (valObj) => {
        return valObj.type === ORDER_CANCEL_ID &&
        valObj.receipt_type_id !== null &&
        (valObj.receipt_type_id === RETURN_ORDER || !statusArr.includes(valObj.receipt_status));
    };
    
    const showReturnVerifyButton = (valObj) => {
      return valObj.type === ORDER_CANCEL_ID && values.sales_code === 2 
    };


    const handleChangeSalesType = (name, sValue) => {
      let salesObj = (bankDepositData.salesType || []).find(
        (eachDoc) => eachDoc.Id === sValue
      );
      setValue({ label: "sales_type", value: salesObj?.Type || "" });
      setValue({ label: name, value: sValue });
    };
    

    return (
      <Form className="h-full">
        <div className="h-[80%]">
          <ParagraphTag label="Details" />
          <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-3 md:grid-cols-2">
            <AntdFormikSelect
              labelText="Type"
              name="type"
              ph="Select Type"
              handleChange={(name, selectedValue) =>
                handleChangeType(name, selectedValue)
              }
              Arr={bankDepositData.depositList}
            />
            {values.type != null && (
              <AntdDatePicker
                labelText="Day"
                name="date"
                ph="--- Select Day ---"
                value={values["date"]}
                handleChange={(date, dateString) => {
                    setValue({ label: "date", value: dateString })
                }}
              />
            )}
            {showAmountField(values) && (
              <AntdInput
                text={"Amount"}
                value={"amount"}
                ph={"Enter Amount"}
                showPrefix={true}
                acceptOnlyNum={true}
              />
            )}

            {values.type === DEPOSIT_ID && (
              <AntdFormikSelect
                labelText="Deposit Mode"
                name="deposit_mode"
                ph="--- Select Deposit Mode---"
                handleChange={(name, selectedValue) =>
                    setValue({ label: name, value: selectedValue })
                }
                Arr={bankDepositData.depositModeList}
              />
            )}
            {showRemainingBalField(values) && (
              <AntdInput
                text="Remaing Balance"
                value="remaining_balance"
                ph="Enter Remaining Balance"
                showPrefix={true}
                acceptOnlyNum={true}
                disableInput={true}
              />
            )}
            {showReceiptTypeField(values) && (
              <AntdFormikSelect
                labelText="Receipt Type"
                name="receipt_type_id"
                ph="--- Select Receipt Type---"
                handleChange={(name, selectedValue) =>handleChangeReceiptType(name,selectedValue)}
                Arr={bankDepositData.returnType}
              />
            )}
            {showReceiptNumberField(values) && (
              <div className="flex">
                <AntdInput
                  text="Receipt Number"
                  value="advance_receipt_no"
                  ph="Enter Receipt Number"
                />
                <CButton
                  className="ml-5 mt-10"
                  style={{ width: 100, height: 32 }}
                  isLoading={bankDepositData.verifyBtnLoading}
                  onClick={() => handleVerifyAdvanceMoney(values?.advance_receipt_no)}
                >
                  {get}
                </CButton>
              </div>
            )}

            {showReceiptOrReturnAmount(values) && (
              <>
                <AntdInput
                  text={
                    values.receipt_type_id === RETURN_ORDER
                      ? "Return Amount"
                      : "Receipt Amount"
                  }
                  value="amount"
                  ph="Enter Remaining Balance"
                  showPrefix={true}
                  acceptOnlyNum={true}
                  disableInput={[ADVANCE_RECEIPT_CANCEL].includes(values.receipt_type_id)}
                />
                {
                  values.receipt_type_id === RETURN_ORDER &&
                  <AntdFormikSelect
                    labelText = "Sale Type"
                    name = "sales_code"
                    ph = "--Select Sale Type--"
                    handleChange = {(name, selectedValue) =>
                      handleChangeSalesType(name,selectedValue)
                    } 
                    Arr = {bankDepositData.salesType}
                  />
                }
                
                <div className="flex">
                  <AntdInput
                    text="Bill Number"
                    value="bill_number"
                    ph="Bill Number"
                  />
                  {
                    showReturnVerifyButton(values) && 
                    <CButton
                      className="ml-5 mt-10"
                      style={{ width: 100, height: 32 }}
                      isLoading={bankDepositData.verifyBtnLoading}
                      onClick={() => handleVerifyReturnOder(values.bill_number)}
                    >
                      Verify
                    </CButton>
                  }
                  
                </div>
                <AntdFormikSelect
                  labelText="Store Id"
                  name="store_id"
                  ph="--- Select Store Id---"
                  handleChange={(name, selectedValue) =>
                    setValue({ label: name, value: selectedValue })
                  }
                  Arr={allTerminals}
                />
                <AntdInput // Newly added not there in api
                  text="Return Number"
                  value="return_number"
                  ph="Return Number"
                />
                {ShowTextBoxInPC("Reason", "reason", "Enter Reason")}
              </>
            )}
            {values.type === HEAD_OFFICE_ID && (
              <>
                <AntdInput
                  text="Person Name"
                  value="person_name"
                  ph="Person Name"
                />
                <AntdInput
                  text="Mobile Number"
                  value="person_mobile"
                  ph="Mobile Number"
                  acceptOnlyNum={true}
                  maxLen={10}
                  forMobileNum={true}
                />
                {ShowTextBoxInPC("Reason", "reason", "Enter Reason")}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-10 px-4 h-[20%]">
          <CButton btnType="submit">Save</CButton>
          <CButton onClick={handleCancelBankDeposit} type="cancel">
            Cancel
          </CButton>
        </div>
      </Form>
    );
}

export default BankDepositForm;

BankDepositForm.propTypes = {
    handleCancelBankDeposit : PropTypes.func,
    handleVerifyAdvanceMoney : PropTypes.func,
    handleVerifyReturnOder : PropTypes.func
};

