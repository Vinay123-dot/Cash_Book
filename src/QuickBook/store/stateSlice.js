import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'quickbookStore/state',
    initialState: {
        drawerOpen: false,
        showAddBookPage : false,
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
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
        setShowAddBookPage : (state,action) => {
            console.log("s",action)
            state.showAddBookPage = action.payload;
        }
    },
})

export const {
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
    setSortedColumn,
    setShowAddBookPage
} = stateSlice.actions

export default stateSlice.reducer