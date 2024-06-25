import { convertToNormalFormat } from "../../utils/dateFormatter";

export const UPI = "UPI";
export const CASH = "Cash";
export const BANK = "Bank";
export const CHEQUE = "Cheque";
export const DEBITCARD = "Debit Card";
export const CREDITCARD = "Credit Card";
export const PAYMENTGATEWAY = "Payment Gateway Order";
export const REFERENCEORDER = "Reference Order";

export const UPI_AMOUNT = "upi_amount";
export const CASH_AMOUNT = "cash_amount";
export const BANK_AMOUNT = "online_bank_amount";
export const CHEQUE_AMOUNT = "bank_cheque_amount";
export const DEBITCARD_AMOUNT = "debit_card_amount";
export const CREDITCARD_AMOUNT = "credit_card_amount";
export const PAYMENTGATEWAY_AMOUNT = "pg_order_amount";
export const REFERENCEORDER_AMOUNT = "reference_order_amount";


export const selectedValType = {
  "cash_amount": CASH,
  "upi_amount": UPI,
  "upi_type": UPI,
  "online_bank_amount": BANK,
  "online_bank_trans_no": BANK,
  "online_bank_name": BANK,
  "bank_cheque_amount": CHEQUE,
  "bank_cheque_no": CHEQUE,
  "bank_cheque_name": CHEQUE,
  "credit_card_amount": CREDITCARD,
  "debit_card_amount": DEBITCARD,
  "pg_order_amount" : PAYMENTGATEWAY,
  "reference_order_amount" : REFERENCEORDER
};


export const allPaymentTypes = [
    CASH_AMOUNT,UPI_AMOUNT,BANK_AMOUNT,CHEQUE_AMOUNT,
    CREDITCARD_AMOUNT,DEBITCARD_AMOUNT,PAYMENTGATEWAY_AMOUNT,
    REFERENCEORDER_AMOUNT
];

const ConvertToNum = (val) => Number(val);


const getTotalMoneyInDayBook = (allData) => {
    let usedReceiptAmount = allData?.advance_receipt_amount ? 
        Number(allData.advance_receipt_amount) : 0 ;
    let referenceOrderAmount = allData?.reference_order_amount ? 
        Number(allData.reference_order_amount) : 0 ;
    let pgOrderAmount = allData?.pg_order_amount ? 
        Number(allData.pg_order_amount) : 0 ;
    
    let totalVal =  Number(allData.upi_amount)+
                    Number(allData.cash_amount)+
                    Number(allData.online_bank_amount)+
                    Number(allData.bank_cheque_amount)+
                    Number(allData.credit_card_amount)+
                    Number(allData.debit_card_amount) + 
                    referenceOrderAmount +
                    pgOrderAmount + 
                    usedReceiptAmount
   
    return totalVal;
}

const getConvertedObj = (tempObj) => {
    let newCreatedObj = {
        id:  tempObj.Id,
        advance_customer_name: tempObj.Advance_Customer_Name || "",
        advance_receipt_amount: tempObj.Advance_Receipt_Amount || null,
        remaining_balance : tempObj.Remaining_Balance || 0, 
        used_receipt_amount : tempObj.Used_Receipt_Amount || null, 
        advance_receipt_no: tempObj.Advance_Receipt_No || "",
        date: convertToNormalFormat(tempObj.Date) || null, 
        customer_type: tempObj.Customer_Type || null, 
        bill_value:  tempObj.Bill_Value|| null, 
        bill_no: tempObj.Bill_No || "", 
        pending_balance : tempObj.Pending_Balance || 0, 
        paymentType0 :  null,
    
        upi: tempObj.UPI || null, 
        upi_amount: tempObj.UPI_Amount|| null, 
        upi_type:  tempObj.UPI_Type || null,
        upi_trans_no:  tempObj.UPI_Trans_No || "",
    
        sales_code: tempObj.Sales_Code || null, 
        sales_type:  tempObj.Sales_Type|| null, 
    
        cash: tempObj.Cash || null, 
        cash_amount: tempObj.Cash_Amount || null, 
    
        debit_card : tempObj.Debit_Card || null,
        debit_card_amount: tempObj.Debit_Card_Amount || null,
    
        credit_card: tempObj.Credit_Card || null,  
        credit_card_amount : tempObj.Credit_Card_Amount || null, 
    
        bank_cheque: tempObj.Bank_Cheque || null,   
        bank_cheque_amount: tempObj.Bank_Cheque_Amount || null, 
        bank_cheque_name : tempObj.Bank_Cheque_Name || "", 
        bank_cheque_no: tempObj.Bank_Cheque_No || "", 
    
        online_bank: tempObj.Online_Bank || null, 
        online_bank_amount : tempObj.Online_Bank_Amount || null,
        online_bank_name: tempObj.Online_Bank_Name || "", 
        online_bank_trans_no: tempObj.Online_Bank_Trans_No ||"",
        party_code : tempObj.Party_Code ||"",
        party_name : tempObj.Party_Name||"",
        reason : tempObj.Reason || "",
        issales_report:0,
        pg_order: tempObj.Pg_Order || null,
        pg_order_amount: tempObj.Pg_Order_Amount || null,
        reference_order: tempObj.Reference_Order ||null,
        reference_order_amount:tempObj.Reference_Order_Amount || null,
    
    
    };
  return newCreatedObj;
}

const advanceModalConObj = (tempObj) => {
    let newCreatedObj = {
        id:  tempObj.Id,
        date: convertToNormalFormat(tempObj.Date) || null,
        receipt_no: tempObj.Receipt_No || "",  //
        customer_name : tempObj.Customer_Name || "",  //
        phone_no : tempObj.Phone_No || "", //
        bill_value:  tempObj.Bill_Value|| null, 
        customer_type: tempObj.Customer_Type || null,
        status : tempObj.Status ||"Pending",
        paymentType0 :  null,
    
        upi: tempObj.UPI || null, 
        upi_amount: tempObj.UPI_Amount|| null, 
        upi_type:  tempObj.UPI_Type || null,
        upi_trans_no:  tempObj.UPI_Trans_No || "",
    
        cash: tempObj.Cash || null, 
        cash_amount: tempObj.Cash_Amount || null, 
    
        debit_card : tempObj.Debit_Card || null,
        debit_card_amount: tempObj.Debit_Card_Amount || null,
    
        credit_card: tempObj.Credit_Card || null,  
        credit_card_amount : tempObj.Credit_Card_Amount || null, 
    
        bank_cheque: tempObj.Bank_Cheque || null,   
        bank_cheque_amount: tempObj.Bank_Cheque_Amount || null, 
        bank_cheque_name : tempObj.Bank_Cheque_Name || "", 
        bank_cheque_no: tempObj.Bank_Cheque_No || "", 
    
        online_bank: tempObj.Online_Bank || null, 
        online_bank_amount : tempObj.Online_Bank_Amount || null,
        online_bank_name: tempObj.Online_Bank_Name || "", 
        online_bank_trans_no: tempObj.Online_Bank_Trans_No ||"",
        reason : tempObj.Reason || "",
    
    };
  return newCreatedObj;
}

const paymentCollectionConObj = (tempObj) => {
    let newCreatedObj = {
        id:  tempObj.Id,
        date: convertToNormalFormat(tempObj.Date) || null,
        customer_type: tempObj.Customer_Type || null,
        bill_value:  tempObj.Bill_Value|| null, 
        bill_no: tempObj.Bill_No|| null, 
        paymentType0 :  null,
    
        upi: tempObj.UPI || null, 
        upi_amount: tempObj.UPI_Amount|| null, 
        upi_type:  tempObj.UPI_Type || null,
        upi_trans_no:  tempObj.UPI_Trans_No || "",
    
        cash: tempObj.Cash || null, 
        cash_amount: tempObj.Cash_Amount || null, 
    
        debit_card : tempObj.Debit_Card || null,
        debit_card_amount: tempObj.Debit_Card_Amount || null,
    
        credit_card: tempObj.Credit_Card || null,  
        credit_card_amount : tempObj.Credit_Card_Amount || null, 
    
        bank_cheque: tempObj.Bank_Cheque || null,   
        bank_cheque_amount: tempObj.Bank_Cheque_Amount || null, 
        bank_cheque_name : tempObj.Bank_Cheque_Name || "", 
        bank_cheque_no: tempObj.Bank_Cheque_No || "", 
    
        online_bank: tempObj.Online_Bank || null, 
        online_bank_amount : tempObj.Online_Bank_Amount || null,
        online_bank_name: tempObj.Online_Bank_Name || "", 
        online_bank_trans_no: tempObj.Online_Bank_Trans_No ||"",
        reason : tempObj.Reason || "",
        party_code : tempObj.Party_Code || "",
        party_name : tempObj.Party_Name || "",
    
    };
  return newCreatedObj;
}
const convertTONumbers = (newObj) => {

    newObj.bill_value = Number(newObj.bill_value);
    newObj.cash_amount = Number(newObj.cash_amount);
    newObj.credit_card_amount = Number(newObj.credit_card_amount);
    newObj.debit_card_amount = Number(newObj.debit_card_amount);
    newObj.bank_cheque_amount = Number(newObj.bank_cheque_amount);
    newObj.online_bank_amount = Number(newObj.online_bank_amount);
    newObj.upi_amount = Number(newObj.upi_amount);
    newObj.pg_order_amount = newObj.pg_order_amount != null ? Number(newObj.pg_order_amount) : 0;
    newObj.reference_order_amount = newObj.reference_order_amount !=null ? Number(newObj.reference_order_amount):null;
    newObj.used_receipt_amount = newObj.used_receipt_amount !=null ? Number(newObj.used_receipt_amount):null;
    newObj.advance_receipt_amount = newObj.advance_receipt_amount != null ? Number(newObj.advance_receipt_amount) : null;
    return newObj;
}
// const validatePaymentType = (value) => {
//     let error;
//     if (!value) {
//         error = 'This Field is Required';
//     }
//     return error;
// }
const verifyInputField = (value, allValues, type) => {
    const {
        paymentType0: P0, paymentType1: P1,
        paymentType2: P2, paymentType3: P3,
        paymentType4: P4, paymentType5: P5,
        paymentType6: P6, paymentType7: P7,
    } = allValues;

    let paymentTypeArr = [P0, P1, P2, P3, P4, P5, P6, P7];
    let err = paymentTypeArr.includes(selectedValType[type]) && !value ? 'This field is required' : 
                paymentTypeArr.includes(selectedValType[type]) && value && value <=0 ? "Amount must be greater than zero" :
                null;
    return err;

}

const verifyUpiType = (value, allValues) => {
    const {
        paymentType0: P0, paymentType1: P1,
        paymentType2: P2, paymentType3: P3,
        paymentType4: P4, paymentType5: P5,
        paymentType6: P6, paymentType7: P7,
    } = allValues;
    let paymentTypeArr = [P0, P1, P2, P3, P4, P5, P6, P7];
    let error = (paymentTypeArr.includes(UPI) && !value) ? 'This field is required' : null
    return error;

};

const verifyPaymentType = (value) => !value ?'This field is required' : "";

const verifyReasonField = (value,allValues) => {
    let diffInAmount = Number(allValues.bill_value) - getTotalMoneyInDayBook(allValues);
    let err = (diffInAmount > 10 || diffInAmount < -10) && !value ? 'This field is required' : null;
    return err;
}

export {
    getTotalMoneyInDayBook,
    getConvertedObj,
    convertTONumbers,
    verifyInputField,
    verifyUpiType,
    verifyPaymentType,
    verifyReasonField,
    advanceModalConObj,
    paymentCollectionConObj
};