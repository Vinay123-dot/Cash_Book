const ConvertToNum = (val) => Number(val);


const getTotalMoneyInDayBook = (allData) => {
    let advanceReAmount = allData?.advance_receipt_amount ? ConvertToNum(allData.advance_receipt_amount) : 0 
    let totalVal =  ConvertToNum(allData.upi_amount)+
                    ConvertToNum(allData.cash_amount)+
                    ConvertToNum(allData.online_bank_amount)+
                    ConvertToNum(allData.bank_cheque_amount)+
                    ConvertToNum(allData.credit_card_amount)+
                    ConvertToNum(allData.debit_card_amount) + 
                    advanceReAmount
   
    return totalVal;
}

const getConvertedObj = (tempObj) => {
    console.log("TEMpyyyy",tempObj)
    let newCreatedObj = {
        id:  tempObj.Id,
        advance_customer_name: tempObj.Advance_Customer_Name || "",
        advance_receipt_amount: tempObj.Advance_Receipt_Amount || null, 
        used_receipt_amount : tempObj.Used_Receipt_Amount || null, 
        advance_receipt_no: tempObj.Advance_Receipt_No || "", //string
        date: tempObj.Date || null, 
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
        issales_report:0
    
    
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
    return newObj;
}
// const validatePaymentType = (value) => {
//     let error;
//     if (!value) {
//         error = 'This Field is Required';
//     }
//     return error;
// }
// const validateInputField = (value, allValues, type) => {
//     const {
//         paymentType0: P0, paymentType1: P1,
//         paymentType2: P2, paymentType3: P3,
//         paymentType4: P4, paymentType5: P5
//     } = allValues;
//     let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
//     let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This Field is Required' : null
//     // let err =  !value ? 'This Field is Required' : null
//     return err;

// }

// const validateUpiType = (value, allValues) => {
//     const {
//         paymentType0: P0, paymentType1: P1,
//         paymentType2: P2, paymentType3: P3,
//         paymentType4: P4, paymentType5: P5
//     } = allValues;
//     let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
//     let error = (paymentTypeArr.includes(1) && !value) ? 'This Field is Required' : null
//     return error;

// }
export {
    getTotalMoneyInDayBook,
    getConvertedObj,
    convertTONumbers
};