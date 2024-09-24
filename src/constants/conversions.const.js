
const convertToSmallPettyCashObj = ({pObj, reasonArr = []}) => {
  let newTemp = {
    id: pObj.Id || 0,
    date: pObj.Date || null,
    amount: pObj.Amount || null,
    petty_cash_details: pObj.Petty_Cash_Details || "",
    petty_cash_extra_details: pObj.Petty_Cash_Extra_Details || "",
  };
  if (typeof newTemp.petty_cash_details === "string") {
    let findedObj = (reasonArr || []).find(
      (eachItem) => eachItem.Type === newTemp.petty_cash_details
    );
    newTemp.petty_cash_details = findedObj?.Id || null;
  }

  return newTemp;
};

const convertToSmallBankDepositObj = ({
  pObj,
  terminalList = [],
  depositModeList = [],
  depositTypeList = [],
}) => {
  let newObj = {
    id: pObj.Id || 0,
    deposit_mode: pObj.Deposit_Mode || null,
    store_id: pObj.Store_Id || null,
    advance_receipt_no: pObj.Advance_Receipt_No || "",
    remaining_balance: pObj.Remaining_Balance || null,
    date: pObj.Date || null,
    type: pObj.Type || null,
    reason: pObj.Reason || "",
    bill_number: pObj.Bill_Number || "",
    amount: pObj.Amount || "",
    total_receipt_amount: null,
    receipt_status: "",
  };
  if (typeof newObj.store_id === "string") {
    let findedObj = (terminalList || []).find(
      (eachItem) => eachItem.Terminal === newObj.store_id
    );
    newObj.store_id = findedObj?.Id || null;
  }

  if (typeof newObj.deposit_mode === "string") {
    let findedObj = (depositModeList || []).find(
      (eachItem) => eachItem.Type === newObj.deposit_mode
    );
    newObj.deposit_mode = findedObj?.Id || null;
  }
  if (typeof newObj.type === "string") {
    let findedObj = (depositTypeList || []).find(
      (eachItem) => eachItem.Type === newObj.type
    );
    newObj.type = findedObj?.Id || null;
  }
  return newObj;
};

export {
    convertToSmallPettyCashObj,
    convertToSmallBankDepositObj
    
}