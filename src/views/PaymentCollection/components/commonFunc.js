import { BANK, BANK_AMOUNT, BANK_NAME, BANK_TRANS_NO, CASH, CASH_AMOUNT, CHEQUE, CHEQUE_AMOUNT, CHEQUE_NAME, CHEQUE_TRANS_NO, CREDITCARD, CREDITCARD_AMOUNT, DEBITCARD, DEBITCARD_AMOUNT, TYPE_OF_PAYMENT, UPI, UPI_AMOUNT, UPI_TRANS_NO, UPI_TYPE } from "constants/app.constant";
import { convertTONumbers } from "QuickBook/components/CompConstants";

export const calculateAmount = (p_arr) => {
    return p_arr.reduce((total,eachItem) => {
        if(eachItem.checked){
            total += eachItem.input_amount ? parseInt(eachItem.input_amount) : 0;
        };
        return total;
    },0)
};

export const paymentTypes = (selDoc,p_type = null) => {
    let convertedObj = convertTONumbers(selDoc);
    let finalAmout = Number(selDoc.input_amount) || 0;
    if(TYPE_OF_PAYMENT[p_type] === CASH){

      selDoc[CASH_AMOUNT] = finalAmout;

    } else if(TYPE_OF_PAYMENT[p_type] === UPI){

      selDoc[UPI_AMOUNT] = finalAmout;
      selDoc[UPI_TYPE] = 1;
      selDoc[UPI_TRANS_NO] = "";

    } else if(TYPE_OF_PAYMENT[p_type] === BANK){

      selDoc[BANK_AMOUNT] = finalAmout;
      selDoc[BANK_TRANS_NO] = selDoc.transaction_num;
      selDoc[BANK_NAME] = selDoc.bank_name;

    }else if(TYPE_OF_PAYMENT[p_type] === CHEQUE){

      selDoc[CHEQUE_AMOUNT] = finalAmout;
      selDoc[CHEQUE_TRANS_NO] = selDoc.transaction_num;
      selDoc[CHEQUE_NAME] = selDoc.bank_name;

    }else if(TYPE_OF_PAYMENT[p_type] === DEBITCARD){

      selDoc[DEBITCARD_AMOUNT] = finalAmout;

    }else if(TYPE_OF_PAYMENT[p_type] === CREDITCARD){

      selDoc[CREDITCARD_AMOUNT] = finalAmout;

    }
    
    return {
        ...selDoc,
        ...convertedObj
    }

  };
