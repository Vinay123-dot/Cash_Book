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
        mainPageLoader : false,
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
        allTerminalList : []
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
        setMainPageLoader: (state,action) => {
            state.mainPageLoader = action.payload;
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
    setMainPageLoader,
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
    setAllTerminalsList
    
} = stateSlice.actions

export default stateSlice.reducer