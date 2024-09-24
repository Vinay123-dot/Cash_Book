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

export const statusArr = ["Partially Refunded","Invoiced","ORDERCANCEL",""];