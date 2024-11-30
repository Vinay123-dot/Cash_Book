
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import PaymentDataTable from "./PaymentDataTable";
import { setBillModalData, setPaymentColArr } from "../store/dataSlice";
import { cloneDeep } from "lodash";

const PaymentData = () => {

    const dispatch = useDispatch();
    const { 
      paymentColArray,
      billModalData
    } = useSelector(state => state.paymentBook.PaymentData);

    const onInputChange = (id, field, value) => {
        const updatedData = (paymentColArray || []).map((item) => {
          if (item.id === id) {
            return { ...item, [field]: value};
          }
          return item;
        });
        dispatch(setPaymentColArr(updatedData));
    };

    const onClickCheckbox = (selObj) => {
        const { pending_balance,input_amount} = selObj;
        const newBillModalData = cloneDeep(billModalData);
        newBillModalData.showBillModal = false;
        newBillModalData.billModalObj = selObj;
        dispatch(setBillModalData(newBillModalData));

        let isUpdateArr = Number(input_amount) > 0 && Number(input_amount) <= Number(pending_balance);
        isUpdateArr && UpdatePaymentArray(selObj);
    };

    const UpdatePaymentArray = (selObj) => {
        const updatedArr = (paymentColArray || []).map((eachDoc) => {
            if (eachDoc.id === selObj.id) {
              return {
                ...eachDoc,
                checked: !eachDoc.checked
              };
            }
            return eachDoc;
        });
        dispatch(setPaymentColArr(updatedArr));
    };
 
    return (
      <div className="h-full overflow-hidden">
        <PaymentDataTable
          requiredArr={paymentColArray}
          handleInputChange={onInputChange}
          handleClickCheckbox={onClickCheckbox}
        />
      </div>
    );
    
};

export default PaymentData;