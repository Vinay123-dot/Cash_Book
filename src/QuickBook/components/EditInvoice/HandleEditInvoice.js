import React, { useMemo, useState, useRef, useEffect,useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlinePencil,HiOutlineTrash } from "react-icons/hi";
import PettyCashEditModal from "./PettyCashEditModal";
import EditDayBookFromDashboard from "./EditModeFromDashboard";
import EditAdvBookFromDashboard from './EditAdvanceBookFromDashboard';
import BankDepositEditModal from './BankDepositEditModal';
import { getDaybeforeYesterday, getToday, getYesterDay } from 'utils/dateFormatter';
import EditPaymentColFromDashboard from './EditPaymentColFromDashboard';
import DataModal from 'components/ui/DataModal';
import { getTransactions,setMainPageLoader } from 'QuickBook/store/dataSlice';
import useConversions from 'assets/hooks/useConversions';
import useBankBalance from 'assets/hooks/useBankBalance';
import { 
  apiDeleteAdvanceBook, 
  apiDeleteDayBook, 
  apiDeletePaymentModal 
} from 'services/TransactionService';



const removeEditAndDelete = ["Invoiced","ORDER CANCELLED"];
const removeDelete = ["Partially Refunded", "Partially Invoiced"];

const HandleEditInvoice = (props) => {

    const { row } = props;
    const dispatch = useDispatch();
    const { 
        convertToSmallPettyCashObj,
        convertToSmallBankDepositObj,
        createNewDaybookObj,
        createNewAdvanceBookObj,
        createNewPaymentColObj } = useConversions();
    const [seletedModalVal, setSelectedModalVal] = useState(null);
    const tableData = useSelector((state) => state.quickbookStore.data.tableData);
    const filterData = useSelector((state) => state.quickbookStore.data.filterData);
    const outletData = useSelector((state) => state.quickbookStore.data.outletData);
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
    const bookTypeList = useSelector((state) => state.quickbookStore.state.bookTypeList);
    const {
        allTerminalList
    } = useSelector(state => state.quickbookStore.state);
    const [modalInfo,setModalInfo] = useState({
        showModal : false,
        showOnlyInfo : false,
        apiCall : false,
        Info : "",
        bookType : null,
        selectedId : null
    });
    let userType = localStorage.getItem("mType");
    let uniqueId = localStorage.getItem("uniqueId");
    const { allBalance, getBankBalance } = useBankBalance(uniqueId);

    const UpdateModalInfo = ({modalFlag = false,Info ='',bookType = null, selectedId = null,OnlyInfoModal = false,apiCall = false}) => {
        setModalInfo((prev) =>(
            {
                ...prev,
                showModal : modalFlag,
                showOnlyInfo : OnlyInfoModal,
                apiCall : apiCall,
                Info : Info,
                bookType : bookType,
                selectedId : selectedId
            }
        ))
    };

    const handleClickDelete = () => {
        UpdateModalInfo({
            modalFlag : true,
            Info : "Do you want to delete this record?",
            bookType : cashbookData.book_type,
            selectedId : row.Id
        });
    };
    
    const onSubmitModal = async() => {
        try{
            const { bookType,selectedId } = modalInfo;
            UpdateModalInfo({
                modalFlag : false,
                Info : "",
                bookType : cashbookData.book_type,
                selectedId : row.Id
            });
            dispatch(setMainPageLoader(true));
            let response;
            if(bookType == 1){
                response = await apiDeleteAdvanceBook([selectedId]);
            }else if(bookType == 3) {
                response = await apiDeleteDayBook([selectedId]);
            }else if(bookType == 5) {
                response = await apiDeletePaymentModal([selectedId]);
            }
            checkStatusOfResponse(response,selectedId);
            
        }catch(Err){
            dispatch(setMainPageLoader(false));
            UpdateModalInfo({
                modalFlag : true,
                OnlyInfoModal : true,
                Info : Err?.message,
            });
        }
    };

    const secondaryUpdateFun = ({mFlag = true, InfoModal = true,Info = "",apiCall = false}) => {
        dispatch(setMainPageLoader(false));
        UpdateModalInfo({
            modalFlag : mFlag,
            OnlyInfoModal : InfoModal,
            Info : Info,
            apiCall : apiCall
        });
    };

    const checkStatusOfResponse = (res,ID) => {
        if(res.status === 200) {
            let idsArray = res.data || {};
            if(idsArray?.ids_not_present?.includes(ID)){
                secondaryUpdateFun({Info : "The selected record is not present in table"});
                return ;
            }
            if(idsArray?.ids_not_deleted?.includes(ID)) {
                secondaryUpdateFun({Info : "The selected record is used in other transactions. Unable to delete it"});
                return ;
            }
            if(idsArray?.deleted_ids?.includes(ID)) {
                secondaryUpdateFun({Info : "The selected record is deleted sucessfully",apiCall : true});
                return ;
            }
            dispatch(setMainPageLoader(false));
        } else {
            dispatch(setMainPageLoader(false));
            secondaryUpdateFun({Info : "Unable to delete this record"});
        }
    }

    const handleCallTransactionAPI = async () => {
        try{
            const { apiCall } = modalInfo;
            UpdateModalInfo({});
            if(apiCall) {
                const payload = cloneDeep(tableData);
                const newFilterData = cloneDeep(filterData);
                const newCashBookData = cloneDeep(cashbookData);
                const newOutletData = cloneDeep(outletData);
            
                const newTableData = cloneDeep(payload);
                let bookTypeInStrng = bookTypeList.find((eachDoc) => eachDoc.Id === newCashBookData.book_type);
                let outletInStrng = (allTerminalList || []).find((eachItem) => eachItem.Id === newOutletData.terminal_id);
                let newObj = { 
                  ...newTableData, 
                  ...newFilterData,
                  ...newCashBookData,
                  ...newOutletData,
                  book_type:bookTypeInStrng?.Type,
                  terminal_id: userType == 7? uniqueId : outletInStrng.Terminal ,
                  key: uniqueId
                  }
                dispatch(getTransactions(newObj));
                getBankBalance();
            }
            
        }catch(Err){
            console.log("Err...",Err)
            dispatch(setMainPageLoader(false));
        }
        
    };
    
    const handleClickIcon = () => setSelectedModalVal(cashbookData.book_type);
    const onCancelPettyCash = () => setSelectedModalVal(null);
    const onModalCancel = () => UpdateModalInfo({});
    const checkForOtherBooks = (sObj) => {
        let datesArr = [getToday(),getYesterDay(),getDaybeforeYesterday()];
        let newFlag = cashbookData.book_type !== 1 && cashbookData.book_type !== 2 && datesArr.includes(sObj.Date);
        return newFlag ? true : false;
    };

    const checkForAdvancebook = (sObj) => {
        return cashbookData.book_type === 1 && !removeEditAndDelete.includes(sObj.Status) ? true : false;
    };

    const checkForBankDeposit = (sObj) => {
      const ENABLED_TYPES = ['WITHDRAWAL','DEPOSIT','HEAD OFFICE EXPENSES',''];
      return cashbookData.book_type === 2 && ENABLED_TYPES.includes(sObj.Type) ? true : false;
    }

    return (
      <>
        {
            checkForBankDeposit(row) && (
            <div className="flex space-x-2 pl-3">
                <HiOutlinePencil
                    className="cursor-pointer size-6 text-[#5A87B2] text-start"
                    onClick={handleClickIcon}
                />
                {/* <HiOutlineTrash
                    className="cursor-pointer size-6 text-[#5A87B2] text-start"
                    onClick={handleClickDelete}
                /> */}
          </div>)
        }
        {
            checkForOtherBooks(row) && (
            <div className="flex space-x-2 pl-3">
                <HiOutlinePencil
                    className="cursor-pointer size-6 text-[#5A87B2] text-start"
                    onClick={handleClickIcon}
                />
                {
                  cashbookData.book_type !== 4 &&
                  <HiOutlineTrash
                    className="cursor-pointer size-6 text-[#5A87B2] text-start"
                    onClick={handleClickDelete}
                  />
                }
                
          </div>)
        }
        {
            checkForAdvancebook(row) && 
            <div className="flex space-x-2 pl-3">
              <HiOutlinePencil
                className="cursor-pointer size-6 text-[#5A87B2] text-start"
                onClick={handleClickIcon}
              />
              {!removeDelete.includes(row.Status) && (
                <HiOutlineTrash
                  className="cursor-pointer size-6 text-[#5A87B2] text-start"
                  onClick={handleClickDelete}
                />
              )}
            </div>
        }

        {seletedModalVal === 4 && (
          <PettyCashEditModal
            selectedPettyCashObj={convertToSmallPettyCashObj({ pObj: row })}
            handleCancelPettyCash={onCancelPettyCash}
          />
        )}

        {seletedModalVal === 3 && (
          <EditDayBookFromDashboard
            editDayBookObj={createNewDaybookObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}
        {seletedModalVal === 1 && (
          <EditAdvBookFromDashboard
            editDayBookObj={createNewAdvanceBookObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}
        {seletedModalVal === 5 && (
          <EditPaymentColFromDashboard
            editDayBookObj={createNewPaymentColObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}

        {seletedModalVal === 2 && (
          <BankDepositEditModal
            editDayBookObj={convertToSmallBankDepositObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}
        {modalInfo.showModal && (
          <DataModal
            displayText={modalInfo.Info}
            handleCancel={onModalCancel}
            handleClickOk={handleCallTransactionAPI}
            handleVerify={onSubmitModal}
            cancelBtnText="CANCEL"
            okBtnText="SUBMIT"
            displayOnlyInfo={modalInfo.showOnlyInfo}
          />
        )}
      </>
    );
}

export default HandleEditInvoice;