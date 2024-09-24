import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetBookTypeServices } from '../../services/TransactionService';
import { getFromDate, getToDate } from "../../utils/dateFormatter";
import deepParseJson from '../../utils/deepParseJson';
import { PERSIST_STORE_NAME } from '../../Constants';

const rawPersistData = sessionStorage.getItem(PERSIST_STORE_NAME) ;
const persistData = deepParseJson(rawPersistData) 

//here changed const historyType to let and clared as zero at first
let historyType = 0;
historyType = persistData?.auth?.session?.transactions
    ? persistData.auth.session.transactions.historyType
    : 0;

export const getTransactions = createAsyncThunk(
    'quickbook/data/getTransactions',
    async (data) => {
       
        const response = await apiGetBookTypeServices(data);
        return response;
    }
)

export const initialTableData = {
    // type: 0,
    // history_type: historyType,
    history_type: 0,
    // pageNumber: 0,
    // recordsPerPage: 10,
    filter_value: '',
    // sort: 1,
    book_type : 0,
    terminal_id : -1,
    // fromDate: getFromDate(),
    // toDate: getToDate(),
    fromDate: "",
    toDate: "",
}

export const initialFilterData = {
    history_type: 0,
}

export const intialOutletData = {
    terminal_id: -1,
}

export const intialCashBookData = {
    book_type : 0
}

const dataSlice = createSlice({
    name: 'quickbookStore/data',
    initialState: {
        loading: false,
        mainPageLoader : false,
        totalTxn: 0,
        totalRecords: 0,
        toatalAmount: 0,
        transactionList: [],
        totalPaymentCount : {},
        tableData: initialTableData,
        filterData: initialFilterData,
        outletData : intialOutletData,
        cashbookData : intialCashBookData,
    },
    reducers: {
        setTransactionsHistory: (state, action) => {
            state.loading = false
            state.totalTxn = 0
            state.totalRecords = 0
            state.toatalAmount = 0
            state.transactionList = []
            state.totalPaymentCount = {}
            state.filterData = { ...initialFilterData }
            state.outletData = {...intialOutletData }
            state.tableData = { ...initialTableData, ...action.payload }
            state.cashbookData = {...intialCashBookData}
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setOutletData: (state, action) => {
            state.outletData = action.payload
        },
        setCashBookData: (state,action) => {
            state.cashbookData = action.payload
        },
        setTransactionsLoading: (state, action) => {
            state.loading = action.payload
        },
        setTransactionArray: (state, action) => {
            state.transactionList = [];
            state.totalPaymentCount = {};
        },
        
        setMainPageLoader: (state,action) => {
            state.mainPageLoader = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getTransactions.fulfilled, (state, action) => {
            state.transactionList = action.payload?.data?.datas || [];
            state.totalPaymentCount = {...action.payload?.data?.amounts} || {};
            state.totalTxn = action.payload?.totalTxn;
            state.totalRecords = action.payload?.totalRecords;
            // state.totalAmount = action.payload?.totalAmount; // Fixed typo in 'totalAmount'
            state.loading = false;
            state.mainPageLoader = false;
          })
          .addCase(getTransactions.pending, (state) => {
            state.mainPageLoader = true;
          })
          .addCase(getTransactions.rejected, (state) => {
            state.mainPageLoader = false;
            // state.loading = false;
          });
      },
   
})

export const {
    setTransactionsHistory,
    setTableData,
    setFilterData,
    setTransactionsLoading,
    setOutletData,
    setCashBookData,
    setTransactionArray,
    setMainPageLoader
} = dataSlice.actions

export default dataSlice.reducer