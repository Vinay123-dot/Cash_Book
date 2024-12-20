import React, { useState } from 'react';
import PropTypes from "prop-types";
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlinePencil,HiOutlineTrash,HiArrowsExpand } from "react-icons/hi";
import { BiMessageEdit } from "react-icons/bi";
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
  apiDeleteBankDeposit, 
  apiDeleteDayBook, 
  apiDeletePaymentModal, 
  apiDeletePettyCash
} from 'services/TransactionService';
import {
  ADVANCEBOOK_ID,
  BANKDEPOSIT_ID,
  compareDate,
  DAYTRANSACTIONS_ID,
  PAYMENTCOLLECTION_ID,
  PETTYCASH_ID,
  TERMINAL_ID,
} from "constants/app.constant";
import EditRequestBook from 'views/RequestBook/components/EditRequest/EditRequestBook';


let datesArr = [getToday(), getYesterDay(), getDaybeforeYesterday()];
const removeEditAndDelete = ["Invoiced","ORDER CANCELLED"];
const removeDelete = ["Partially Refunded", "Partially Invoiced"];

const HandleEditInvoice = (props) => {

    const { row  = {}} = props;
    const dispatch = useDispatch();
    const { 
        convertToSmallPettyCashObj,
        convertToSmallBankDepositObj,
        createNewDaybookObj,
        createNewAdvanceBookObj,
        createNewPaymentColObj } = useConversions();
    const [selectedModalVal, setSelectedModalVal] = useState(null);
    const tableData = useSelector((state) => state.quickbookStore.data.tableData);
    const filterData = useSelector((state) => state.quickbookStore.data.filterData);
    const outletData = useSelector((state) => state.quickbookStore.data.outletData);
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
    const bookTypeList = useSelector((state) => state.quickbookStore.state.bookTypeList);
    const { 
      requstedDates 
    } = useSelector(state => state.requestBook.reqData);
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
    const [RequestBookObj,setRequestObj] = useState({
      show : false,
      reqObj : {}
    }) ;
    let userType = localStorage.getItem("mType");
    let uniqueId = localStorage.getItem("uniqueId");
    const { getBankBalance } = useBankBalance(uniqueId);

    const UpdateModalInfo = ({
      modalFlag = false,
      Info = "",
      bookType = null,
      selectedId = null,
      OnlyInfoModal = false,
      apiCall = false,
    }) => {
      setModalInfo((prev) => ({
        ...prev,
        showModal: modalFlag,
        showOnlyInfo: OnlyInfoModal,
        apiCall: apiCall,
        Info: Info,
        bookType: bookType,
        selectedId: selectedId,
      }));
    };

    const handleClickDelete = () => {
        UpdateModalInfo({
            modalFlag : true,
            Info : "Do you want to delete this record?",
            bookType : cashbookData.book_type,
            selectedId : row.Id
        });
    };
    
    const onSubmitModal = async () => {
      try {
        const { bookType, selectedId } = modalInfo;
        UpdateModalInfo({
          modalFlag: false,
          Info: "",
          bookType: cashbookData.book_type,
          selectedId: row.Id,
        });
        dispatch(setMainPageLoader(true));
        let response;
        if (bookType == ADVANCEBOOK_ID) {
          response = await apiDeleteAdvanceBook([selectedId]);
        } else if (bookType == BANKDEPOSIT_ID) {
          response = await apiDeleteBankDeposit([selectedId]);
        } else if (bookType == DAYTRANSACTIONS_ID) {
          response = await apiDeleteDayBook([selectedId]);
        } else if (bookType == PETTYCASH_ID) {
          response = await apiDeletePettyCash([selectedId]);
        } else if (bookType == PAYMENTCOLLECTION_ID) {
          response = await apiDeletePaymentModal([selectedId]);
        }
        checkStatusOfResponse(response, selectedId);
      } catch (Err) {
        dispatch(setMainPageLoader(false));
        UpdateModalInfo({
          modalFlag: true,
          OnlyInfoModal: true,
          Info: Err?.message,
        });
      }
    };

    const secondaryUpdateFun = ({
      mFlag = true,
      InfoModal = true,
      Info = "",
      apiCall = false,
    }) => {
      dispatch(setMainPageLoader(false));
      UpdateModalInfo({
        modalFlag: mFlag,
        OnlyInfoModal: InfoModal,
        Info: Info,
        apiCall: apiCall,
      });
    };

    const checkStatusOfResponse = (res, ID) => {
      if (res.status === 200) {
        let idsArray = res.data || {};
        if (idsArray?.ids_not_present?.includes(ID)) {
          secondaryUpdateFun({
            Info: "The selected record is not present in table",
          });
          return;
        }
        if (idsArray?.ids_not_deleted?.includes(ID)) {
          secondaryUpdateFun({
            Info: "The selected record is used in other transactions. Unable to delete it",
          });
          return;
        }
        if (idsArray?.deleted_ids?.includes(ID)) {
          secondaryUpdateFun({
            Info: "The selected record is deleted sucessfully",
            apiCall: true,
          });
          return;
        }
        dispatch(setMainPageLoader(false));
      } else {
        dispatch(setMainPageLoader(false));
        secondaryUpdateFun({ Info: "Unable to delete this record" });
      }
    };

    const handleCallTransactionAPI = async (flag = false) => {
      try {
        const { apiCall } = modalInfo;
        UpdateModalInfo({});
        if (apiCall || flag) {
          const payload = cloneDeep(tableData);
          const newFilterData = cloneDeep(filterData);
          const newCashBookData = cloneDeep(cashbookData);
          const newOutletData = cloneDeep(outletData);

          const newTableData = cloneDeep(payload);
          let bookTypeInStrng = bookTypeList.find(
            (eachDoc) => eachDoc.Id === newCashBookData.book_type
          );
          let outletInStrng = (allTerminalList || []).find(
            (eachItem) => eachItem.Id === newOutletData.terminal_id
          );
          let newObj = {
            ...newTableData,
            ...newFilterData,
            ...newCashBookData,
            ...newOutletData,
            book_type: bookTypeInStrng?.Type,
            terminal_id: userType == 7 ? uniqueId : outletInStrng.Terminal,
            key: uniqueId,
          };
          dispatch(getTransactions(newObj));
          getBankBalance();
        }
      } catch (Err) {
        console.log("Err...", Err);
        dispatch(setMainPageLoader(false));
      }
    };
    
    const handleClickIcon = () => setSelectedModalVal(cashbookData.book_type);
    const onCancelPettyCash = () => setSelectedModalVal(null);
    const onModalCancel = () => UpdateModalInfo({});

    // const checkForOtherBooks = (sObj) => {
    //   let datesArr = [getToday(), getYesterDay(), getDaybeforeYesterday()];
    //   let newFlag =
    //     cashbookData.book_type !== ADVANCEBOOK_ID &&
    //     cashbookData.book_type !== BANKDEPOSIT_ID &&
    //     datesArr.includes(sObj.Date);
    //   return !!newFlag;
    // };

    // const checkForAdvancebook = (sObj) => {
    //   return !!(
    //     cashbookData.book_type === ADVANCEBOOK_ID &&
    //     !removeEditAndDelete.includes(sObj.Status)
    //   );
    // };

    // const checkForBankDeposit = (sObj) => {
    //   const ENABLED_TYPES = [
    //     "WITHDRAWAL",
    //     "DEPOSIT",
    //     "HEAD OFFICE EXPENSES",
    //     "",
    //   ];
    //   return !!(
    //     cashbookData.book_type === BANKDEPOSIT_ID &&
    //     ENABLED_TYPES.includes(sObj.Type)
    //   );
    // };
   
    const showEditAndDeleteButton = (row) => {
      if (userType !== TERMINAL_ID) return { edit: false, delete: false }; // Ensure everything works only if userType === 7
      let editFlag = false;
      let deleteFlag = false;
      let messageFlag = false;
    
      const datesFlag = datesArr.includes(row.Date);
    
      if (datesFlag) {
        editFlag = true;
        deleteFlag = true;
      } else {
        const findObj = (requstedDates || []).find(
          (eachDoc) => eachDoc.Request_Date === row.Date
        );

        if (findObj) {
          if (!findObj.Request_Id) {
            editFlag = true;
            deleteFlag = true;
          } else if (findObj.Request_Id == row.Id) {
            if(findObj.Isapproved === 0){
              messageFlag = true;
            }else if(findObj.Isapproved === 1 && compareDate(findObj.Valid_Till)){
              editFlag = true;
              deleteFlag = true;
            }
          }
        }
      }
    
      return { edit: editFlag, delete: deleteFlag,msg : messageFlag };
    };

    const handleClickRequest = () => {
      setRequestObj((prev) => ({
        ...prev,
        show : true,
        reqObj : row
      }));
    };

    const onCancelReqBook = () => {
      setRequestObj((prev) => ({
        ...prev,
        show : false,
        reqObj : {}
      }));
    }

    const showEditAndDelBtn = () => {
      if(userType === TERMINAL_ID){
        return showEditAndDeleteButton(row).edit ||
        showEditAndDeleteButton(row).delete ? (
        <div className="flex space-x-2 pl-3">
          <HiOutlinePencil
            className="cursor-pointer size-6 text-[#5A87B2] text-start"
            onClick={handleClickIcon}
          />
          <HiOutlineTrash
            className="cursor-pointer size-6 text-[#5A87B2] text-start"
            onClick={handleClickDelete}
          />
        </div>
      ) : (
        <div className="flex justify-start">
          {showEditAndDeleteButton(row).msg ? (
            <p className='text-orange-900 text-base font-medium'>Request Sent</p>
            
          ) : (
            <BiMessageEdit
              className="cursor-pointer size-6 text-[#5A87B2] ml-7"
              onClick={handleClickRequest}
            />
          )}
        </div>
      );
      }
      
    };

    return (
      <>
        {
          showEditAndDelBtn()
        }

        {selectedModalVal === PETTYCASH_ID && (
          <PettyCashEditModal
            selectedPettyCashObj={convertToSmallPettyCashObj({ pObj: row })}
            handleCancelPettyCash={onCancelPettyCash}
          />
        )}

        {selectedModalVal === DAYTRANSACTIONS_ID && (
          <EditDayBookFromDashboard
            editDayBookObj={createNewDaybookObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}
        {
          RequestBookObj.show &&
            <EditRequestBook
              reqObj = {RequestBookObj.reqObj}
              handleCancel = {onCancelReqBook}
              handleClickOk={() =>{
                onCancelReqBook()
                handleCallTransactionAPI(true)
              }}
            />
        }
        {selectedModalVal === ADVANCEBOOK_ID && (
          <EditAdvBookFromDashboard
            editDayBookObj={createNewAdvanceBookObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}
        {selectedModalVal === PAYMENTCOLLECTION_ID && (
          <EditPaymentColFromDashboard
            editDayBookObj={createNewPaymentColObj({ pObj: row })}
            handleCloseEditModal={onCancelPettyCash}
          />
        )}

        {selectedModalVal === BANKDEPOSIT_ID && (
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

HandleEditInvoice.propTypes = {
  row : PropTypes.object
};

HandleEditInvoice.defaultProps = {
  row : {}
};


   {/* {checkForBankDeposit(row) && (
          <div className="flex space-x-2 pl-3">
            <HiOutlinePencil
              className="cursor-pointer size-6 text-[#5A87B2] text-start"
              onClick={handleClickIcon}
            />
            <HiOutlineTrash
                className="cursor-pointer size-6 text-[#5A87B2] text-start"
                onClick={handleClickDelete}
              />
          </div>
        )} */}
        {/* {checkForAdvancebook(row) && (
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
        )} */}