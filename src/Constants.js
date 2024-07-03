import { getToday,getYesterDay } from "./utils/dateFormatter";
import moment from "moment";
const Options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ];
const HeaderSelectOptions = [ 
  { value: 1,label: 'Day Book'},
  { value: 2,label: 'Advanced Book'},
  { value: 3,label: 'Petty Cash'},
  { value: 4,label: 'Bank Deposit'}
];



const DepositType = [
  { name: 'Withdrawal', id: '0' },
  { name: 'Deposit', id: '1' },
  { name : 'Order Cancel' ,  id : '2'}
];
const DepositMode = [
  { name: 'Bank', id: 'dm0' },
  { name: 'Heade Office', id: 'dm1' }

]

const DaysArr = [
  { Type: 'Today', Id: getToday() },
  { Type: 'Yesterday', Id: getYesterDay() }
]
const SaleType = [
  { name: 'Cash', value: '0' },
  { name: 'Credit', value: '1' }
]
const PartyCode = [
  { name: 'Walk-in', value: '0' },
  { name: 'Dealer', value: '1' }
]
const PaymentsArray = [
  { name: 'Cash', value: '0' },
  { name: 'UPI', value: '1' },
  { name: 'Card', value: '2' },
  { name: 'Bank-NEFT', value: '3' },
  { name: 'Cheque', value: '4' }
];
const UPIARRAY = [
  { name: 'Swinkpay', value: '0' },
];

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
  "debit_card_amount": DEBIT_CARD
}

const PERSIST_STORE_NAME = "quickBookRedux";

const getStatusOfCurrentDate = (day) => {
  let selectedDate = moment(day);
  let currentDate = moment().startOf('day');
  return selectedDate.isSame(currentDate, 'day') ? true : false;
}

export {Options,HeaderSelectOptions,DepositType,DepositMode,
  PERSIST_STORE_NAME,DaysArr,SaleType,PartyCode,PaymentsArray,UPIARRAY,selectedValType,
  getStatusOfCurrentDate,ReturnType
};