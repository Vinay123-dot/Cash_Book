export const dayBookIntialObj = {
    id: 0,
    advance_customer_name: "", //string
    advance_receipt_amount: null, //number
    used_receipt_amount : null,
    advance_receipt_no: "", //string
    date: null, //string
    customer_type: null, //string //CONVERTING
    bill_value: null, //number //CONVERTING
    bill_no: "", //string Ex: 8974759759
    pending_balance: 0, //number
    paymentType0: null,

    upi: null, //string newly added from here //UPI DETAILS
    upi_amount: null, //number
    upi_type: null, //string
    upi_trans_no: "", //DOUBT

    sales_code: null, //string //DOUBT SALES CODE
    sales_type: null, //stirng

    cash: null, //CASH DETAILS (string why this)
    cash_amount: null, //number

    debit_card:null, //DEBIT CARD DETAILS (string why this)
    debit_card_amount: null, //number

    credit_card: null,  //(string why this)
    credit_card_amount: null, //number

    bank_cheque: null,   //(string why this)
    bank_cheque_amount: null, //number
    bank_cheque_name: "", //string
    bank_cheque_no: "", //string

    online_bank: null, //(string Why this)
    online_bank_amount: null,
    online_bank_name: "", //string
    online_bank_trans_no: "", //string
    party_code : "",
    party_name : "",
    reason : ""


};