import moment from "moment";

const ReturnType = [
  { Type: 'Advance Receipt Cancel', Id: 1 },
  { Type: 'Return Order', Id: 2 },
]
const UPI = "UPI";
const CASH = "Cash";
const BANK = "Bank";
const CHEQUE = "Cheque";
const DEBIT_CARD = "Debit Card";
const CREDIT_CARD = "Credit Card";
const PAYMENTGATEWAY = "Payment Gateway Order";
const REFERENCEORDER = "Reference Order";

export const dateFormat = 'YYYY-MM-DD';

const selectedValType = {
  "cash_amount": CASH,
  "upi_amount": UPI,
  "upi_type": UPI,
  "online_bank_amount": BANK,
  "online_bank_trans_no": BANK,
  "online_bank_name": BANK,
  "bank_cheque_amount": CHEQUE,
  "bank_cheque_no": CHEQUE,
  "bank_cheque_name": CHEQUE,
  "credit_card_amount": CREDIT_CARD,
  "debit_card_amount": DEBIT_CARD,
  "pg_order_amount" : PAYMENTGATEWAY,
  "reference_order_amount" : REFERENCEORDER
}

const PERSIST_STORE_NAME = "quickBookRedux";

const getStatusOfCurrentDate = (day) => {
  
  let selectedDate = moment(day);
  let currentDate = moment().startOf('day');
  return selectedDate.isSame(currentDate, 'day') ? true : false;
}

const _getStatusOfCurrentDate = (day) => {
  
  let selectedDate = moment(day);
  let currentDate = moment().startOf('day');
  return selectedDate.isSame(currentDate, 'day') ? true : false;
};

const DISABLED_TRANSACTION_COUNT_PAGES = [0,2,4,6];

export {
  PERSIST_STORE_NAME,selectedValType,
  getStatusOfCurrentDate,ReturnType,_getStatusOfCurrentDate,DISABLED_TRANSACTION_COUNT_PAGES
};