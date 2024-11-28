import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'quickbookStore/state',
    initialState: {
        dataSavedModalOpen: false,
        showAddBookPage : false,
        pettyCashBalance : 0,
        commonCashBanalce : 0,
        remainingCommonBalance : 0,
        pettyCashRemBal : 0,
        showdayBookFields : false,
        showUploadInvoice : false,
        selectedCustomer: {},
        editedDaybookObj : {},
        sortedColumn: () => {},
        bookTypeList : [],
        dayInfoList : [],
        outletsList : [],
        reasonsList : [],
        depositModeList : [],
        depositTypeList : [],
        paymentTypeInfo : [],
        upiTypeInfo : [],
        customerListInfo : [],
        salesType : [],
        allTerminalList : [],
        selectedBookType : null
    },
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setDataSavedModal : (state,action) => {
            state.dataSavedModalOpen = action.payload;
        },
        setShowAddBookPage : (state,action) => {
            state.showAddBookPage = action.payload;
        },
        setPettyCashBalance : (state,action) => {
            state.pettyCashBalance = action.payload;
        },
        setCommonCashBalance: (state,action) => {
            state.commonCashBanalce = action.payload;
        },
        setShowDayBookFields : (state,action) => {
            state.showdayBookFields = action.payload;
        },
        setShowUploadInvoice : (state,action) => {
            state.showUploadInvoice = action.payload;
        },
        setRemainingCommonBalance: (state,action) => {
            state.remainingCommonBalance = action.payload;
        },
        setPettyCashRemainingBalance: (state,action) => {
            state.pettyCashRemBal = action.payload;
        },
        setBookTypeList : (state,action) => {
            state.bookTypeList = action.payload;
        },
        setDayInfoList : (state,action) => {
            state.dayInfoList = action.payload;
        },
        setOutletsList : (state,action) => {
            state.outletsList = action.payload;
        },
        setReasonsList : (state,action) => {
            state.reasonsList = action.payload;
        },
        setDepositModeArray : (state,action) => {
            state.depositModeList = action.payload;
        },
        setDepositTypeArray : (state,action) => {
            state.depositTypeList = action.payload;
        },
        setPaymentTypeInfo : (state,action) => {
            state.paymentTypeInfo = action.payload;
        },
        setUpiTypeInfo : (state,action) => {
            state.upiTypeInfo = action.payload;
        },
        setCustomerListInfo : (state,action) => {
            state.customerListInfo = action.payload;
        },
        setSalesType : (state,action) => {
            state.salesType = action.payload;
        },
        setEditedDaybookObj : (state,action) => {
            state.editedDaybookObj = action.payload;
        },
        setAllTerminalsList : (state,action) => {
            state.allTerminalList = action.payload;
        },
        setSelectedBookType : (state,action) => {
            state.selectedBookType = action.payload;
        },
        setCancelButtonFunc : (state,action) => {
            state.selectedBookType = false;
            state.showAddBookPage = false;
        }

    },
})

export const {
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
    setSortedColumn,
    setShowAddBookPage,
    setDataSavedModal,
    setPettyCashBalance,
    setCommonCashBalance,
    setShowDayBookFields,
    setShowUploadInvoice,
    setRemainingCommonBalance,
    setPettyCashRemainingBalance,
    setBookTypeList,
    setDayInfoList,
    setOutletsList,
    setReasonsList,
    setDepositTypeArray,
    setDepositModeArray,
    setPaymentTypeInfo,
    setUpiTypeInfo,
    setCustomerListInfo,
    setSalesType,
    setEditedDaybookObj,
    setAllTerminalsList,
    setSelectedBookType,
    setCancelButtonFunc
} = stateSlice.actions

export default stateSlice.reducer