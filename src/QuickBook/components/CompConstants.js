const ConvertToNum = (val) => Number(val);

const getTotalMoney = (allData) => {
    let totalVal =  ConvertToNum(allData.upi_amount)+
                    ConvertToNum(allData.cash_amount)+
                    ConvertToNum(allData.online_bank_amount)+
                    ConvertToNum(allData.bank_cheque_amount)+
                    ConvertToNum(allData.credit_card_amount)+
                    ConvertToNum(allData.debit_card_amount)
   
    return totalVal;
}

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
export {getTotalMoney,getTotalMoneyInDayBook};