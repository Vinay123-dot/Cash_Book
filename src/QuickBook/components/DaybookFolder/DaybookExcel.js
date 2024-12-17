import React,{useState,useEffect, useContext} from "react";
import { useDispatch ,useSelector} from "react-redux";
import {
  convertTONumbers,
  getConvertedObj,
  getTotalMoneyInDayBook
} from "../CompConstants"
import { 
    setSelectedBookType, 
    setShowAddBookPage, 
    setShowDayBookFields, 
    setShowUploadInvoice ,
    setDataSavedModal,
    setPaymentFilter
} from "../../store/stateSlice";
import { DaybookDataContext } from "context/DaybookContext";
import {
  apiGetDayBookExcelData,
  apiStoreDayBookInfo,
} from "services/TransactionService";
import {
  INDEPENDENT_WORKSHOP,
  INDEPENDENTWORKSHOP,
  PAYMENTCOMBOS,
  slicedCustomerTypeObj
} from "constants/app.constant";
import DaybookTable from "./DaybookTable";
import CButton from "components/ui/Button";
import BillAmountModal from "../DayBookFiles/BillAmountModal";
import Datepicker from "components/ui/Datepicker";
import Button from "components/ui/NewButton";
import useFetchReqBook from "views/RequestBook/components/useFetchReqBook";
import { DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import { setApprovedDates } from "views/RequestBook/store/dataSlice";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";


const DaybookExcel = (props) => {

    const dispatch = useDispatch();
    const {daybooKData,setDaybookData} = useContext(DaybookDataContext);
    const { fetchRequestedDates } = useFetchReqBook();
    const {
        customerListInfo,
        paymentFilter
    } = useSelector(state => state.quickbookStore.state);
    let uniqueId = localStorage.getItem("uniqueId");
    const [showBillModal,setShowBillModal] = useState(false);
    const [selectedObj,setSelectedObj] = useState({});
    const [datesObj,setDatesObj] = useState({
      fromDate : null,
      toDate : null
    });
    
    const showLoader = (loaderFlag) =>  setDaybookData((prev) => ({...prev,showDaybookLoader:loaderFlag}));
    
    useEffect(() => {
      getRequiredDates();
  
      return () => {
        dispatch(setApprovedDates([]));
        dispatch(setPaymentFilter(null));
      }
    },[])

    const getRequiredDates = async() => {
      try{
         let response = await fetchRequestedDates({book_name : "Day Transactions"});
         dispatch(setApprovedDates(response || []));
      }catch(Err){

      }
  }

    // useEffect(() => {
    //     if(daybooKData.getUploadExcelData){
    //         getExcelTrasaction();
    //     }
    // },[daybooKData.getUploadExcelData])

    const getCustomerType = (cType) => {
        if (typeof cType === 'string') {
            let findedObj;
            if(cType === INDEPENDENTWORKSHOP){
                findedObj = customerListInfo.find((eachItem) => eachItem.Type === INDEPENDENT_WORKSHOP);
            }else{
               findedObj = customerListInfo.find((eachItem) =>eachItem.Type === cType);
            }
            
            return findedObj?.Id || null;
        } ;
        return null;
    }
 
    const getExcelTrasaction = async () => {
        try {
            let newObj = {
                terminal_id: uniqueId,
                key: uniqueId,
                ...datesObj
            };
            showLoader(true);
            let resposne = await apiGetDayBookExcelData(newObj);
            let modifiedArr = [];
            (resposne?.data || []).forEach((eachItem) => {
                if(eachItem?.Issales_Report === 1) {
                    
                    let newDoc = getConvertedObj(eachItem);
                    newDoc.issales_report = 0;
                    newDoc.sales_code = "CSI";
                    newDoc.sales_type = 1;
                    newDoc.checked = false;
                    newDoc.key = uniqueId;
                    newDoc.displayedCusType = slicedCustomerTypeObj[newDoc.customer_type] || "";
                    newDoc.customer_type = getCustomerType(newDoc.customer_type);

                    modifiedArr.push(newDoc);
                }
            })
            setDaybookData((prev) => (
                {
                    ...prev,
                    excelArray:modifiedArr,
                    getUploadExcelData:false,
                    showDaybookLoader : false
                }));
                // showLoader(false);
        } catch (e) {
            showLoader(false);
        }
    };

    const ErrModal = ({Eflag = false,EMsg = ""}) => {
        setDaybookData((prev) => ({
            ...prev,
            showErrorModal : Eflag,
            errorMessage : EMsg,
        }))
    };

    const handleSaveSelectedExcelArray = async() => {
        try{
            showLoader(true);
            let response = await apiStoreDayBookInfo(daybooKData.selectedExcelArray);
            if (response.message) {
                dispatch(setDataSavedModal(true));
                dispatch(setShowDayBookFields(false));
                ErrModal({});
                setDaybookData((prev) => ({
                    ...prev,
                    excelArray: [],
                    selectedExcelArray : [],
                    receiptsArray : []
                  }));
                  setDatesObj((prev) =>({
                    ...prev,
                    fromDate : null,
                    toDate : null
                  }))
                // getExcelTrasaction();
            };
            showLoader(false);
        }catch(Err){
            ErrModal({
                Eflag : true,
                EMsg : Err?.response?.data?.detail || "Failed to submit data.Please Check the details again"
            });
            showLoader(false);
        }
    }

    const getFinalAdvanceReceiptNum = (mainObj) => {
      if(mainObj.advance_receipt_no && Number(mainObj.remaining_balance) <= 0){
        return ''
      }
      return mainObj.advance_receipt_no;
    }

    const onClickCheckbox = (selObj) => {
      const { advance_receipt_amount,remaining_balance,advance_receipt_no } = selObj;
      setShowBillModal(false);
      setSelectedObj(selObj);

      if (Number(advance_receipt_amount) <= remaining_balance && 
            (!advance_receipt_no || advance_receipt_amount)) { 
             UpdateExcelArrayFun(selObj);
             UpdateSelectedExcelArr(selObj);
      }

      !selObj.checked && CheckAmount(selObj);
    };

    const UpdateExcelArrayFun = (selObj) => {
        
      const updatedExcelArray = (daybooKData.excelArray || []).map(
        (eachDoc) => {
          if (eachDoc.id === selObj.id) {
            return {
              ...eachDoc,
              checked: !eachDoc.checked,
              pending_balance : Number(selObj.bill_value) - getTotalMoneyInDayBook(selObj)
              //update pending balacne here.
            };
          }
          return eachDoc;
        }

      );
      setDaybookData((prev) => ({
        ...prev,
        excelArray: updatedExcelArray,
      }));
    };

    const UpdateSelectedExcelArr = (selObj) => {
      let findExcelObj = (daybooKData.selectedExcelArray || []).find(
        (eachDoc) => eachDoc.id === selObj.id
      );
    
      if (findExcelObj) {
        const updatedExcelArray = (daybooKData.selectedExcelArray || []).filter(
          (eachDoc) => eachDoc.id !== selObj.id
        );
        console.log("IF BLOCk")
        setDaybookData((prev) => ({
          ...prev,
          selectedExcelArray: updatedExcelArray,
        }));
      } else {
        console.log("ELSE BLOCk")
        let convertedObj = convertTONumbers(selObj);
        convertedObj.pending_balance =
          Number(selObj.bill_value) - getTotalMoneyInDayBook(selObj);
    
        let finalAdvanceRecNum = getFinalAdvanceReceiptNum(selObj);
    
        const newExcelArray = [
          ...(daybooKData.selectedExcelArray || []),
          { ...selObj, ...convertedObj, advance_receipt_no: finalAdvanceRecNum },
        ];
    
        setDaybookData((prev) => ({
          ...prev,
          selectedExcelArray: newExcelArray,
        }));
      }
    };
    

    const onCancelBillModal = (selObj) => {
        setShowBillModal(false);
       const updatedExcelArray = (daybooKData.excelArray || []).map(
         (eachDoc) => {
           if (selObj.id === eachDoc.id) {
             return {
               ...eachDoc,
               checked: false
             };
           }
           return eachDoc;
         }
 
       );
 
       setDaybookData((prev) => ({
         ...prev,
         excelArray: updatedExcelArray,
       }));
       UpdateSelectedExcelArr(selObj);
    };

    const onInputChange = (id, field, value) => {
        const updatedData = (daybooKData.excelArray || []).map((item) => {
          if (item.id === id) {
            return { ...item, [field]: value};
          }
          return item;
        });
        setDaybookData((prev) => ({
          ...prev,
          excelArray: updatedData,
        }));
    };

    const CheckAmount = (selObj) => {
      const { advance_receipt_no,advance_receipt_amount,remaining_balance,bill_value } = selObj;

        if(advance_receipt_no && !advance_receipt_amount) {
          ErrModal({
            Eflag: true,
            EMsg: "Please enter advance receipt amount or remove the receipt number",
          });
          return;
        }
        if (Number(advance_receipt_amount) > remaining_balance) {
            ErrModal({
              Eflag: true,
              EMsg: "Given amount should be less than or equal to the Advance Receipt Amount",
            });
            return;
          }
          let diffInAmount = Number(bill_value) - getTotalMoneyInDayBook(selObj);
          let modalFlag = (diffInAmount > 10 || diffInAmount < -10);
          modalFlag && setShowBillModal(true);
    }

    const getSelectedRecordsCount = () => {
        const selectedRecords = (daybooKData.excelArray || []).filter((item) => item.checked === true);
        return selectedRecords.length || 0;
    }
    const getDisabledStatus = () => {
        const findObj = (daybooKData.excelArray || []).find((eachDoc) => eachDoc.checked === true);
        return !! findObj?.checked ;
    }

    const calculateSums = (transactions) => {
      return transactions.reduce(
        (totals, transaction) => {
          if (transaction.checked) {
            totals.cash += transaction.cash_amount
              ? parseFloat(transaction.cash_amount)
              : 0;
            totals.upi += transaction.upi_amount
              ? parseFloat(transaction.upi_amount)
              : 0;
            totals.credit_card += transaction.credit_card_amount
              ? parseFloat(transaction.credit_card_amount)
              : 0;
            totals.bank += transaction.online_bank_amount
              ? parseFloat(transaction.online_bank_amount)
              : 0;
            totals.cheque += transaction.bank_cheque_amount
              ? parseFloat(transaction.bank_cheque_amount)
              : 0;
            totals.pGateway += transaction.pg_order_amount
              ? parseFloat(transaction.pg_order_amount)
              : 0;
            totals.refOrder += transaction.reference_order_amount
              ? parseFloat(transaction.reference_order_amount)
              : 0;
          }
          return totals;
        },
        {
          cash: 0,
          upi: 0,
          credit_card: 0,
          bank: 0,
          pGateway: 0,
          refOrder: 0,
          cheque: 0,
        }
      );
    };

    const onChangeDate = (date,dateString) => {
      setDatesObj((prev) =>({
        ...prev,
        fromDate : dateString,
        toDate : dateString
      }));
    };

    const checkValues = () => !!(datesObj.fromDate && datesObj.toDate);
    const getViewBtnCls = checkValues() ? ENABLED_STYLE : DISABLED_STYLE;

    const handleSelectPayment = (val) => dispatch(setPaymentFilter(val));
    
    return (
      <div className="h-full flex flex-col">
        <div className="realtive w-full gap-2 flex flex-row justify-start sm:justify-end flex-wrap pr-5">
          {/* {daybooKData.excelArray.length > 0 && (
            <div className="flex flex-col w-36">
              <label htmlFor={"p_type"} className="text-start mb-1 text-black">
                Payment Filter
              </label>
              <AntdSelectFilter
                placeholder="Select Payment Type"
                options={PAYMENTCOMBOS}
                onStatusChange={handleSelectPayment}
                value={paymentFilter}
              />
            </div>
          )} */}

          <div className="w-36">
            <Datepicker
              labelText="Day"
              name="date"
              ph="--- Select Day ---"
              className="h-10"
              value={datesObj.fromDate}
              handleChange={onChangeDate}
            />
          </div>

          <div className="self-end">
            <Button
              type="button"
              className={getViewBtnCls}
              isDisabled={!checkValues()}
              onClick={getExcelTrasaction}
            >
              View
            </Button>
          </div>
        </div>
        <div className="flex-grow overflow-auto">
          <DaybookTable
            data={daybooKData.excelArray}
            handleClickCheckbox={onClickCheckbox}
            handleInputChange={onInputChange}
          />
        </div>

        <div className="p-5 flex flex-col lg:flex-row justify-between">
          <div className="w-full flex md:justify-between  md:items-center flex-col md:flex-row flex-wrap mr-2">
            <p>Selected Records : {getSelectedRecordsCount()}</p>
            <p>Cash : {calculateSums(daybooKData.excelArray).cash}</p>
            <p>UPI : {calculateSums(daybooKData.excelArray).upi}</p>
            <p>Card : {calculateSums(daybooKData.excelArray).credit_card}</p>
            <p>Bank : {calculateSums(daybooKData.excelArray).bank}</p>
            <p>P_Gateway : {calculateSums(daybooKData.excelArray).pGateway}</p>
            <p>Ref Order : {calculateSums(daybooKData.excelArray).refOrder}</p>
            <p>Cheque : {calculateSums(daybooKData.excelArray).cheque}</p>
          </div>

          <div className="flex space-x-4">
            <CButton
              onClick={handleSaveSelectedExcelArray}
              isDisabled={!getDisabledStatus()}
            >
              Save
            </CButton>
            <CButton
              onClick={() => {
                dispatch(setSelectedBookType(null));
                dispatch(setShowAddBookPage(false));
                dispatch(setShowDayBookFields(false));
                dispatch(setShowUploadInvoice(false));
              }}
              type="cancel"
            >
              Cancel
            </CButton>
          </div>
        </div>
        <BillAmountModal
          billModal={showBillModal}
          valuesObj={selectedObj}
          handleSubmitBillModal={() => setShowBillModal(false)}
          handleCancelBillModal={() => onCancelBillModal(selectedObj)}
        />
      </div>
    );
};

export default DaybookExcel;
