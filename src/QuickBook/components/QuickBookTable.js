import React, { useMemo, useState, useRef } from 'react'
import DataTable from '../../components/shared/DataTable'
import { useSelector } from 'react-redux';
import HandleEditInvoice from './EditInvoice/HandleEditInvoice';
import { convertToNormalFormat } from '../../utils/dateFormatter';

const BankDepositColumns = [
    { header: 'Sl No',accessorKey: 'serial_no',enableSorting: false},
    {header: 'Date',accessorKey: 'Date',enableSorting: false},
    { header: 'Type',accessorKey: 'Type',enableSorting: false },
    { header: 'Amount',accessorKey: 'Amount',enableSorting: false },
    { header: 'Deposit Mode',accessorKey: 'Deposit_Mode', enableSorting: false},
    { header: "Remaining Balance",accessorKey: 'Remaining_Balance', enableSorting: false},
    {
        header: '‎ ‎ ‎ ‎ Action ‎ ‎  ‎  ‎  ',
        accessorKey: 'action',
        cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    }
    
];

const pettyCashColumns = [
    { header: 'Sl No', accessorKey: 'serial_no', enableSorting: false },
    { header: 'Date', accessorKey: 'Date', enableSorting: false },
    { header: 'Amount', accessorKey: 'Amount',enableSorting: false},
    { header: 'Balance', accessorKey: 'Balance',enableSorting: false},
    { header: "Reason", accessorKey: 'Petty_Cash_Details',enableSorting: false},
    {
        header: '‎ ‎ ‎ ‎ Action ‎ ‎  ‎  ‎  ',
        accessorKey: 'action',
        cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    }
    // Add other petty cash columns here
];

const DayBookColumns = [
    { header: 'Sl No',accessorKey: 'serial_no',enableSorting: false},
    { header: 'Bill No',accessorKey: 'Bill_No', enableSorting: false },
    { header: 'Date',accessorKey: 'Date',enableSorting: false,},
    { header: 'Customer Type',accessorKey: 'Customer_Type',enableSorting: false },
    { header: "Bill Value", accessorKey: 'Bill_Value', enableSorting: false},
    { header: 'Cash',accessorKey: 'Cash_Amount',enableSorting: false },
    { header: 'UPI Type',accessorKey: 'UPI_Type', enableSorting: false },
    { header: 'UPI Amount',accessorKey: 'UPI_Amount', enableSorting: false },
    { header: 'Debit Card', accessorKey: 'Debit_Card_Amount',enableSorting: false },
    { header: 'Credit Card', accessorKey: 'Credit_Card_Amount',enableSorting: false },
    { header: "Bank",accessorKey: 'Online_Bank_Amount', enableSorting: false },
    { header: "Cheque",accessorKey: 'Bank_Cheque_Amount', enableSorting: false },
    // { header: "Advanced Receipt No.",accessorKey: 'Advance_Receipt_No',enableSorting: false },
    { header: "Advance Receipt Amount",accessorKey: 'Advance_Receipt_Amount',enableSorting: false },
    {
        header: '‎ ‎ ‎ ‎ Action ‎ ‎  ‎  ‎  ',
        accessorKey: 'action',
        cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    }
];

const AdvanceBookColumns = [
    { header: 'Sl No',accessorKey: 'serial_no',enableSorting: false},
    { header: 'Receipt No.',accessorKey: 'Receipt_No', enableSorting: false },
    { header: 'Date',accessorKey: 'Date',enableSorting: false,},
    { header: 'Customer Type',accessorKey: 'Customer_Type',enableSorting: false },
    { header: "Customer Name", accessorKey: 'Customer_Name', enableSorting: false},
    { header: 'Customer Mobile Number',accessorKey: 'Phone_No',enableSorting: false },
    { header: 'Amount',accessorKey: 'Bill_Value', enableSorting: false },
    { header: 'Status',accessorKey: 'Status', enableSorting: false },
    {
        header: '‎ ‎ ‎ ‎ Action ‎ ‎  ‎  ‎  ',
        accessorKey: 'action',
        cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    }
];



const PaymentCollectionColumns = [
    { header: 'Sl No',accessorKey: 'serial_no',enableSorting: false},
    { header: 'Bill No',accessorKey: 'Bill_No', enableSorting: false },
    { header: 'Date',accessorKey: 'Date',enableSorting: false,},
    { header: 'Customer Type',accessorKey: 'Customer_Type',enableSorting: false },
    { header: "Bill Value", accessorKey: 'Bill_Value', enableSorting: false},
    { header: 'Cash',accessorKey: 'Cash_Amount',enableSorting: false },
    { header: 'UPI Type',accessorKey: 'UPI_Type', enableSorting: false },
    { header: 'UPI Amount',accessorKey: 'UPI_Amount', enableSorting: false },
    { header: 'Debit Card', accessorKey: 'Debit_Card_Amount',enableSorting: false },
    { header: 'Credit Card', accessorKey: 'Credit_Card_Amount',enableSorting: false },
    { header: "Bank",accessorKey: 'Online_Bank_Amount', enableSorting: false },
    { header: "Cheque",accessorKey: 'Bank_Cheque_Amount', enableSorting: false },
    {
        header: '‎ ‎ ‎ ‎ Action ‎ ‎  ‎  ‎  ',
        accessorKey: 'action',
        cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    }
];



// // const columns = [
// //     {
// //         header: 'Terminal ID',
// //         accessorKey: 'terminal',
// //         enableSorting: false,
// //     },
// //     {
// //         header: () => (
// //             <span>
// //                 Original <br />
// //                 Transaction ID
// //             </span>
// //         ),
// //         accessorKey: 'orgtxnid',
// //         // cell: (props) => <HandleEditInvoice row={props.row.original} />,
// //         enableSorting: false,
// //     },
// //     {
// //         header: 'Transaction ID',
// //         accessorKey: 'transactionId',
// //         enableSorting: false,
// //     },
// //     // {
// //     //     header: 'RRN/UTR  ‎ ',
// //     //     accessorKey: 'rrn',
// //     //     cell: (props) => {
// //     //         const row = props.row.original
// //     //         return <span>{row?.rrn}<button onClick={() => {navigator.clipboard.writeText(row?.rrn); 
// //     //             toast.push(
// //     //             <Notification title="RRN/UTR Copied to Clipboard!" type="success"/>,
                 
// //     //             {
// //     //                 placement: 'top-center',
// //     //             }
// //     //         )}}><img src={clipboard} width={20} height={15} alt=''/></button></span>
// //     //     },
// //     //     enableSorting: false,
// //     // },
// //     {
// //         header: 'Amount',
// //         accessorKey: 'amout',
// //         cell: (props) => {
// //             const row = props.row.original
// //             // return <span>{amountFormatter(row?.amout)}</span>
// //         },
// //         enableSorting: false,
// //     },
// //     {
// //         header: 'Date & Time',
// //         accessorKey: 'mosdate',
// //         cell: (props) => {
// //             const row = props.row.original
// //             return ( "test"
// //                 // <span>
// //                 //     {getFormatDate(row?.mosdate, 'YYYY-MM-DD HH:mm:ss')}
// //                 // </span>
// //             )
// //         },
// //         enableSorting: false,
// //     },
// //     {
// //         header: 'Status',
// //         accessorKey: 'status',
// //         cell: (props) => {
// //             const row = props.row.original
// //             const statusColor =
// //                 row.status === 1 || row.status === 4
// //                     ? 'text-["#22AC00"]'
// //                     : row.status === 2 || row.status === 5
// //                     ? 'text-["#D20000"]'
// //                     : row.status === 3
// //                     ? 'text-["#F9AA33"]'
// //                     : 'text-["#414141"]'
// //             return (
// //                 <span className={` capitalize ${statusColor}`}>
// //                   Status
// //                    {/* "{TRANSACTION_STATUS[row.status]} " */} 
// //                 </span>
// //             )
// //         },
// //         enableSorting: false,
// //     },
// //     {
// //         header: () => (
// //             <span>
// //                 Refunded for
// //                 <br />
// //                 Transaction ID
// //             </span>
// //         ),
// //         accessorKey: 'maintxnid',
// //         enableSorting: false,
// //     },
// //     {
// //         header: "Action",
// //         accessorKey: 'action',
// //         cell: (props) =>  props?.row?.original?.cName || "--",
// //         enableSorting: false,
// //     },
// //     {
// //         header: 'Description',
// //         accessorKey: 'description',
// //         enableSorting: false,
// //     },    
    
// // ]

const QuickBookTable = () => {
    let userType = localStorage.getItem("mType");
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
    const outputArray = useSelector((state) => state.quickbookStore.data.transactionList);

 
    // const dispatch = useDispatch()
    const loading = useSelector((state) => state.quickbookStore.data.loading);
    // 
    // const totalRecords = useSelector(
    //     (state) => state.transactions.data.totalRecords
    // )
    // const {
    //     type,
    //     historyType,
    //     pageNumber,
    //     recordsPerPage,
    //     searchData,
    //     sort,
    //     fromDate,
    //     toDate,
    // } = useSelector((state) => state.transactions.data.tableData)



    const onPaginationChange = (page) => {
        //const newTableData = cloneDeep(tableData)
        // const payload1 = cloneDeep(tableData)
        // const payload2 = cloneDeep(filterData)
        // const payload3 = cloneDeep(outletData)
        // payload1.pageNumber = page - 1
        // const payload ={...payload1, ...payload2,...payload3}
        
        // dispatch(setTableData(payload1))
        // dispatch(getTransactions(payload))
    }

const getTableColumns = (bookType) => {
    switch (bookType) {
        case 1:
            return AdvanceBookColumns;
        case 2:
            return BankDepositColumns;
        case 3:
            return DayBookColumns;
        case 4:
            return pettyCashColumns;
        case 5:
            return PaymentCollectionColumns;
        default:
            return DayBookColumns;
    }
}

    // const getSortedData = (arrList) => {
    //     const Temp = JSON.parse(JSON.stringify(arrList));
    //     Temp.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    //     Temp.forEach((item, index) => {
    //         item.serial_no = index + 1;
    //         if(cashbookData.book_type === 3){
    //             item.Date = item?.Date?convertToNormalFormat(item?.Date) : item?.Date;
    //         }
    //     });
    //     return Temp;
    // }

    const getSortedData = (arrList) => {
        let Temp = JSON.parse(JSON.stringify(arrList));
    
        // Filter the data if book_type is three
        if (cashbookData.book_type === 3) {
            Temp = Temp.filter(item => item.Issales_Report === 0);
        }
    
        // Sort the data
        Temp.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    
        // Update the serial number and date format if needed
        Temp.forEach((item, index) => {
            item.serial_no = index + 1;
            if (cashbookData.book_type === 3) {
                item.Date = item?.Date ? convertToNormalFormat(item?.Date) : item?.Date;
            }
        });
    
        return Temp;
    };
    

    return (
        <>
            <DataTable
                // columns={userType == 4 ? MerchantLevelColumns : getTableColumns(cashbookData?.book_type)}
                columns={getTableColumns(cashbookData?.book_type)}
                data={getSortedData(outputArray)}
                // pagingData={{
                //     pageIndex: pageNumber + 1,
                //     pageSize: recordsPerPage,
                //     total: totalRecords,
                // }}
                // onPaginationChange={onPaginationChange}
                loading={loading}
            />
        </>
    )
}

export default QuickBookTable






// const QuickBookTable = () => {
//     const userType = localStorage.getItem("mType");
//     const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
//     const data = useSelector((state) => state.quickbookStore.data.transactionList);

//     console.log("DATA",data)

//     const terminalLevelColumns = [
//         { header: 'Terminal ID', accessorKey: 'terminal', enableSorting: false },
//         // Add other terminal level columns here
//     ];


 
    

//     const getTableColumns = (userType, bookType) => {
//         switch (bookType) {
//             case 1:
//                 return AdvanceBookColumns;
//             case 2:
//                 return BankDepositColumns;
//             case 3:
//                 return DayBookColumns;
//             case 4:
//                 return pettyCashColumns;
//             default:
//                 return terminalLevelColumns;
//         }
//     };

//     return (
//         <DataTable
//             columns={getTableColumns(userType, cashbookData?.book_type)}
//             data={data}
//             // Add other props as needed
//         />
//     );
// };

// export default QuickBookTable;
