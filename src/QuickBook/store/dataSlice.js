import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetTransactions } from '../../services/TransactionService';
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
        let temp = {
            fromDate : "2024-4-10 0:00:00",
            historyType : 5,
            pageNumber  : 0,
            recordsPerPage :10,
            searchData : "",
            sort : 1,
            status : -1,
            terminalID : 0,
            toDate : "2024-4-10 23:59:59",
            type : 0
        }
        const response = await apiGetTransactions(temp)
        console.log("res",response);
        return response.data.data
    }
)

export const initialTableData = {
    type: 0,
    historyType: historyType,
    pageNumber: 0,
    recordsPerPage: 10,
    searchData: '',
    sort: 1,
    cId : 1,
    terminalID : 0,
    fromDate: getFromDate(),
    toDate: getToDate(),
}

export const initialFilterData = {
    status: -1,
}

export const intialOutletData = {
    terminalID: 0,
}

export const intialCashBookData = {
    cId : 1
}

const dataSlice = createSlice({
    name: 'quickbookStore/data',
    initialState: {
        loading: false,
        totalTxn: 0,
        totalRecords: 0,
        toatalAmount: 0,
        transactionList: [],
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
            console.log("STATE",state,"ACTION",action)
            state.cashbookData = action.payload
        },
        setTransactionsLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getTransactions.fulfilled, (state, action) => {
            state.transactionList = action.payload?.transactionHistoryList;
            state.totalTxn = action.payload?.totalTxn;
            state.totalRecords = action.payload?.totalRecords;
            // state.totalAmount = action.payload?.totalAmount; // Fixed typo in 'totalAmount'
            state.loading = false;
          })
          .addCase(getTransactions.pending, (state) => {
            state.loading = true;
          })
          .addCase(getTransactions.rejected, (state) => {
            state.loading = false;
          });
      },
    // extraReducers: {
    //     [getTransactions.fulfilled]: (state, action) => {
    //         state.transactionList = action.payload?.transactionHistoryList
    //         state.totalTxn = action.payload?.totalTxn
    //         state.totalRecords = action.payload?.totalRecords
    //         state.toatalAmount = action.payload?.toatalAmount
    //         state.loading = false
    //     },
    //     [getTransactions.pending]: (state) => {
    //         state.loading = true
    //     },
    //     [getTransactions.rejected]: (state) => {
    //         state.loading = false
    //     },
    // },
})

export const {
    setTransactionsHistory,
    setTableData,
    setFilterData,
    setTransactionsLoading,
    setOutletData,
    setCashBookData
} = dataSlice.actions

export default dataSlice.reducer