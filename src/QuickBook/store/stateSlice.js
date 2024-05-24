import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'quickbookStore/state',
    initialState: {
        dataSavedModalOpen: false,
        showAddBookPage : false,
        pettyCashBalance : 0,
        commonCashBanalce : 0,
        mainPageLoader : false,
        showdayBookFields : false,
        showUploadInvoice : false,
        selectedCustomer: {},
        sortedColumn: () => {},
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
    setShowUploadInvoice
    
} = stateSlice.actions

export default stateSlice.reducer