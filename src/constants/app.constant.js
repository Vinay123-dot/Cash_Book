export const APP_NAME = 'SwinkPay'

export const PERSIST_STORE_NAME = 'whoami'

export const REDIRECT_URL_KEY = 'redirectUrl'

export const TRANSACTION_STATUS = {
    0: 'Pending',
    1: 'Success',
    2: 'Failure',
    3: 'Refund Initiated',
    4: 'Refunded',
    5: 'Refund Failed',
}

export const REFUND_STATUS = {
    3: 'Refund Initiated',
    4: 'Refunded',
    5: 'Refund Failed',
}

export const HISTORY_TYPE = {
    0: '-',
    1: 'Today',
    2: 'Yesterday',
    3: 'This Week',
    4: 'This Month',
    5: 'This Year',
    6: 'Custom Range',
};

export const slicedCustomerTypeObj = {
    "INDEPENDENT WORKSHOP" : "IW",
    "INDEPENDENTWORKSHOP" : "IW",
    "CO-DISTRIBUTOR" : "DIS",
    "CO-DEALER" : "DEA",
    "MASS" : "MA",
    "WALK-IN CUSTOMER" : "WC",
    "TRADERS" : "TR"
};

export const INDEPENDENTWORKSHOP = "INDEPENDENTWORKSHOP";
export const INDEPENDENT_WORKSHOP = "INDEPENDENT WORKSHOP";

export const TERMINAL_ID = "7";
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

export const ALLOW_AMOUNT_FILEDS = [WITHDRAW_ID,DEPOSIT_ID,HEAD_OFFICE_ID,];
export const ALLOW_REMAINNG_FIELDS = [WITHDRAW_ID,DEPOSIT_ID];

export const statusArr = ["Partially Refunded","Invoiced","ORDERCANCEL",""];