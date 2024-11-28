import dayjs from "dayjs";

export const UPI = "UPI";
export const CASH = "Cash";
export const BANK = "Bank";
export const CHEQUE = "Cheque";
export const DEBITCARD = "Debit Card";
export const CREDITCARD = "Credit Card";
export const PAYMENTGATEWAY = "Payment Gateway Order";
export const REFERENCEORDER = "Reference Order";

export const CASH_AMOUNT = "cash_amount";
export const UPI_AMOUNT = "upi_amount";
export const UPI_TYPE = "upi_type";
export const UPI_TRANS_NO = "upi_trans_no";

export const BANK_AMOUNT = "online_bank_amount";
export const BANK_TRANS_NO = "online_bank_trans_no";
export const BANK_NAME = "online_bank_name";

export const CHEQUE_AMOUNT = "bank_cheque_amount";
export const CHEQUE_TRANS_NO = "bank_cheque_no";
export const CHEQUE_NAME = "bank_cheque_name";

export const DEBITCARD_AMOUNT = "debit_card_amount";
export const CREDITCARD_AMOUNT = "credit_card_amount";
export const PAYMENTGATEWAY_AMOUNT = "pg_order_amount";
export const REFERENCEORDER_AMOUNT = "reference_order_amount";

export const UPI_ID = 1;
export const CASH_ID = 2;
export const BANK_ID = 3;
export const CHEQUE_ID = 4;
export const CREDITCARD_ID = 5;
export const DEBITCARD_ID = 6;
export const PAYMENTGATEWAY_ID = 7;
export const REFERENCEORDER_ID = 8;


export const TYPE_OF_PAYMENT = {
    1: UPI,
    2: CASH,
    3: BANK,
    4: CHEQUE,
    5: CREDITCARD,
    6: DEBITCARD,
    7 : PAYMENTGATEWAY,
    8 : REFERENCEORDER
}

export const REFUND_STATUS = {
    3: 'Refund Initiated',
    4: 'Refunded',
    5: 'Refund Failed',
}


export const slicedCustomerTypeObj = {
    "INDEPENDENT WORKSHOP" : "IW",
    "INDEPENDENTWORKSHOP" : "IW",
    "CO-DISTRIBUTOR" : "DIS",
    "CO-DEALER" : "DEA",
    "MASS" : "MA",
    "WALK-IN CUSTOMER" : "WC",
    "TRADERS" : "TR"
};

export const STATUS_TYPES = [
    { Id : 0, Type : "Pending"},
    { Id : 1, Type : "Sucess"},
    { Id : 2 , Type : "Rejected"}
];
export const SUCCESS = "success";
export const FAILED = "failed";
export const PENDING = "pending";

export const INDEPENDENTWORKSHOP = "INDEPENDENTWORKSHOP";
export const INDEPENDENT_WORKSHOP = "INDEPENDENT WORKSHOP";

export const TERMINAL_ID = "7";
export const MERCHANT_ID = "4";
export const ADVANCEBOOK_ID = 1;
export const BANKDEPOSIT_ID = 2;
export const DAYTRANSACTIONS_ID = 3;
export const PETTYCASH_ID = 4;
export const PAYMENTCOLLECTION_ID = 5;
export const WITHDRAW_ID = 1;
export const DEPOSIT_ID = 2;
export const ORDER_CANCEL_ID = 3;
export const PARTIALLY_REFUNDED = 4;
export const HEAD_OFFICE_ID = 5;
export const ADVANCE_RECEIPT_CANCEL = 1;
export const RETURN_ORDER = 2;
export const USER_LIST = ["4", "7"];

export const ALLOW_AMOUNT_FILEDS = [WITHDRAW_ID,DEPOSIT_ID,HEAD_OFFICE_ID,];
export const ALLOW_REMAINNG_FIELDS = [WITHDRAW_ID,DEPOSIT_ID];

export const statusArr = ["Partially Refunded","Invoiced","ORDERCANCEL",""];

export const compareDate = (givenDate) => {
    const today = dayjs().startOf("day");
    const given = dayjs(givenDate, "YYYY-MM-DD");
return !!(given.isAfter(today, "day") || given.isSame(today, "day"))
}