import React from "react";
import { useDispatch,useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import PaymentData from "./PaymentData";
import PaymentFooter from "./PaymentFooter";
import usePaymentReports from "./usePaymentHistory";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { calculateAmount, paymentTypes } from "./commonFunc";
import { setPaymentManageModal } from "../store/stateSlice";
import amountFormatter from "utils/amountFormatter";
import { BANK_ID, CHEQUE_ID } from "constants/app.constant";
import { setClearAllPaymentPageFields } from "../store/dataSlice";
import { cloneDeep } from "lodash";

const PaymentPage = () => {

    const dispatch = useDispatch();
    const { 
        viewPaymentReports,
        savePaymentReports 
      } = usePaymentReports();
    const { 
      reqPaymentData,
      paymentColArray
    } = useSelector(state => state.paymentBook.PaymentData);
    const uniqueId = localStorage.getItem("uniqueId");
    const mainLoader = (flag) => dispatch(setMainPageLoader(flag));

    const updateModalStatus = ({PaymentModal = false,PaymentModalMsg = ""}) => {
      mainLoader(false);
      dispatch(setPaymentManageModal({PaymentModal, PaymentModalMsg}));
    };

    const getUpdatedList = () => {
      let newPaymentData = [];
      (paymentColArray || []).forEach((eachDoc) => {
        try {
          if(eachDoc.checked){
            let docClone = { ...eachDoc };
            docClone.key = uniqueId;
            docClone.daybook_id = eachDoc.id;
            docClone.id = 0;
            // docClone.customer_type = 1; //remove it later
            docClone.reason = ""; //remove it later
            docClone.date = reqPaymentData.given_date;
            docClone.bank_name = reqPaymentData.bank_name || "";
            docClone.transaction_num = reqPaymentData.transaction_num || null;
            docClone.pending_balance = docClone.pending_balance - (Number(docClone.input_amount) || 0);
            let updatePaymentType = paymentTypes(docClone, reqPaymentData.payment_type);
            newPaymentData.push(updatePaymentType);
          };
        } catch (error) {
          console.error("Error in processing eachDoc:", error);
        }
      });
      return newPaymentData;
    }

    const onSavePaymentHistory = async() => {
      try{
        mainLoader(true);
        const { given_date,payment_type,given_amount,bank_name,transaction_num } = reqPaymentData;
        let isRequiredFields = given_date && payment_type && given_amount;
        
        if ([BANK_ID, CHEQUE_ID].includes(payment_type)) {
          isRequiredFields = isRequiredFields && bank_name && transaction_num;
        };
        
        if(!isRequiredFields){
          updateModalStatus({
            PaymentModal: true,
            PaymentModalMsg: "Please fill the above fields to continue",
          });
          return;
        }
      
        let checkPaymentRange = calculateAmount(paymentColArray) > Number(reqPaymentData.given_amount);
        if(checkPaymentRange){
          updateModalStatus({
            PaymentModal: true,
            PaymentModalMsg: `The given amount should be lessthan or equal to ${amountFormatter(
              reqPaymentData.given_amount
            )}`,
          })
          return;
        }
        let updatedList = getUpdatedList();
        let response = await savePaymentReports(updatedList);
        if(response?.statusCode === 200) {
          dispatch(setClearAllPaymentPageFields({}));
          setTimeout(() => {
            viewPaymentReports();
          },100);
        };
        updateModalStatus({
          PaymentModal: response?.show,
          PaymentModalMsg: response?.message,
        });
        response?.statusCode !== 200 && mainLoader(false);
      }catch(Err){
        mainLoader(false);
      }
    };

    return (
      <div className="h-full flex flex-col p-2 overflow-auto">
        {/* Form Section */}
        <div className="flex-none">
          <PaymentForm handleGetPartyCodeList={viewPaymentReports} />
        </div>
        
        {/* Table Section */}
        <div className="flex-grow overflow-hidden min-h-48 h-auto md:min-h-0">
          <PaymentData />
        </div>
        
        {/* Footer Section */}
        <div className="flex-none">
          <PaymentFooter handleSavePaymentHistory={onSavePaymentHistory} />
        </div>
      </div>
    );
    
};

export default PaymentPage;