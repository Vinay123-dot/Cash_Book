import React, { useContext, useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Formik } from 'formik';
import Loader from "components/shared/Loader";
import ErrorModal from "components/ui/ErrorModal";
import { BankDepositTypeValidations } from "Validations";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setSelectedBookType
} from "../../store/stateSlice";
import { BankDepositContext } from "context/BankDepositContext";
import BankDepositForm from "./BankDepositForm";
import useBankDeposit from "utils/hooks/useBankDeposit";
import { BankDepositIntialVal } from "IntialValues/BankDeposit";
import { apiStoreBankDepositInfo } from "services/TransactionService";
import { setApprovedDates } from "views/RequestBook/store/dataSlice";
import useFetchReqBook from "views/RequestBook/components/useFetchReqBook";

const RESET_LIST = ["total_receipt_amount","amount","receipt_status"];

const BankDepositMainPage = (props) => {
 
    const dispatch = useDispatch();
    const bankFormRef = useRef();
    const { fetchRequestedDates } = useFetchReqBook();
    const {bankDepositData,setBankDepositData} = useContext(BankDepositContext);
    const { fetchRequiredData,verifyAdvanceReceipt,verifyReturnOrder } = useBankDeposit();
    const remCommOpeningBal = useSelector(state => state.quickbookStore.state.remainingCommonBalance);
    const allTerminals = useSelector(state => state.quickbookStore.state.allTerminalList);
    let uniqueId = localStorage.getItem("uniqueId");
    
    useEffect(() => {
        fetchApi();
        getRequiredDates();
        
        return () => {
          dispatch(setApprovedDates([]));
        }
    },[])

    const fetchApi = async() => {
        try{
            let response = await fetchRequiredData();
            setBankDepositData((prev) => ({
                ...prev,
                depositList : response?.depostList,
                depositModeList : response?.depositModeList || [],
                returnType : response?.returnTypeArr|| [],
                salesType : response?.saleTypeArr || []
            }));
        }catch(e){

        }
    };

    const getRequiredDates = async() => {
      try{
         let response = await fetchRequestedDates({book_name : "Bank Deposit"});
         dispatch(setApprovedDates(response || []));
      }catch(Err){

      }
  }

    const onUpdateReducer = ({
        returnOrderResponseData = {},
        bankDepositLoader = false,
        showErrModal = false,
        verifyBtnLoading = false,
        errorMessage = "",
    }) => {
        setBankDepositData((prev) => ({
            ...prev,
            showBankDepositLoader : bankDepositLoader,
            showErrorModal : showErrModal,
            verifyBtnLoading ,
            errorMessage,
            returnOrderResponseData
        }))
    };
    const setValue = ({ label = "", value = null }) => bankFormRef?.current?.setFieldValue(label, value);
  
    const onSubmitBankForm = async(values) => {
        try{
            onUpdateReducer({bankDepositLoader : true});
            let newObj = JSON.parse(JSON.stringify(values));
            if(newObj.store_id) {
              let dummyObj = (allTerminals || []).find((eachDoc) => eachDoc.Id === newObj.store_id);
              newObj.store_id = dummyObj.Terminal || newObj.store_id
            }
            newObj.key = uniqueId;
            newObj.daybook_id = newObj.daybook_id ? newObj.daybook_id : null;
            let bankResponse = await apiStoreBankDepositInfo([newObj]);
            onUpdateReducer({
              showErrModal : !!bankResponse?.message,
              errorMessage : bankResponse?.message || ""
            });
            if(bankResponse?.message){
              dispatch(setShowAddBookPage(false));
              dispatch(setSelectedBookType(null));
              dispatch(setDataSavedModal(true));
            }
            
        }catch(Err){
          onUpdateReducer({})
        }
    }

    const onVerifyAdvanceReceipt = async(receiptNum) => {
        try {
            if(!receiptNum) return console.log("test");
            onUpdateReducer({verifyBtnLoading:true});
            const data = {
                key : uniqueId,
                id : receiptNum
            };
            let response = await verifyAdvanceReceipt(data);
            console.log(response)
            onUpdateReducer({
                showErrModal : response.ErrModal,
                errorMessage : response.ErrMsg,
            });
            setValue({label: "total_receipt_amount",value: response?.advanceReceiptData?.Bill_Value || 0});
            setValue({label: "amount",value: response?.advanceReceiptData?.Remaining_Balance || 0});
            setValue({label: "receipt_status",value: response?.advanceReceiptData?.Status || ""})
          }catch(Err){
            onUpdateReducer({
                showErrModal : true,
                errorMessage : Err
            });
            RESET_LIST.forEach((eachItem) =>
                setValue({
                  label: eachItem,
                  value: eachItem === "receipt_status" ? "" : 0,
                })
            );
          }
        
    };

    const onVerifyReturnNumber = async(receiptNum) => {
        try {
            if(!receiptNum) return console.log("test");
            onUpdateReducer({verifyBtnLoading:true});
            const data = {
                key : uniqueId,
                Bill_No : receiptNum
            };
            let response = await verifyReturnOrder(data);
            onUpdateReducer({
                showErrModal : response.ErrModal,
                errorMessage : response.ErrMsg,
                returnOrderResponseData : response.responseData
            });
            setValue({
              label: "amount",
              value: response?.responseData?.Pending_Balance || 0,
            });
            setValue({
              label: 'daybook_id',
              value : response?.responseData?.Id || null
            })
        }catch(Err){
            onUpdateReducer({
                showErrModal : true,
                errorMessage : Err
            });
            RESET_LIST.forEach((eachItem) =>
                setValue({
                  label: eachItem,
                  value: eachItem === "receipt_status" ? "" : 0,
                })
            );
        }
    };

    const onEModalCancel = () => onUpdateReducer({});

    const onCancelBankDeposit = () => {
      dispatch(setShowAddBookPage(false));
      // setVerifyBtnLdng(false);
      dispatch(setSelectedBookType(null));
  }
    return (
      <>
        <Formik
          innerRef={bankFormRef}
          initialValues={BankDepositIntialVal}
          validationSchema={BankDepositTypeValidations}
          onSubmit={(values, { setSubmitting }) => {
            onSubmitBankForm(values);
          }}
        >
          {({ values }) => {
            values.remaining_balance = remCommOpeningBal - (Number(values.amount) || 0);
            return (
              <BankDepositForm
                handleVerifyAdvanceMoney={onVerifyAdvanceReceipt}
                handleVerifyReturnOder = {onVerifyReturnNumber}
                handleCancelBankDeposit = {onCancelBankDeposit}
              />
            );
          }}
        </Formik>

        {bankDepositData.showErrorModal && (
          <ErrorModal
            msg={bankDepositData.errorMessage}
            handleCloseEModal={onEModalCancel}
          />
        )}
        <Loader showLoading={bankDepositData.showBankDepositLoader} />
      </>
    );
}

export default BankDepositMainPage;

