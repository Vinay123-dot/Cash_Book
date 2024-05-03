import React, { useMemo, useState, useRef } from 'react'
import DataTable from '../../components/shared/DataTable'
import { useSelector } from 'react-redux'


// const columns = [
//     {
//         header: 'Terminal ID',
//         accessorKey: 'terminal',
//         enableSorting: false,
//     },
//     {
//         header: () => (
//             <span>
//                 Original <br />
//                 Transaction ID
//             </span>
//         ),
//         accessorKey: 'orgtxnid',
//         // cell: (props) => <HandleEditInvoice row={props.row.original} />,
//         enableSorting: false,
//     },
//     {
//         header: 'Transaction ID',
//         accessorKey: 'transactionId',
//         enableSorting: false,
//     },
//     // {
//     //     header: 'RRN/UTR  ‎ ',
//     //     accessorKey: 'rrn',
//     //     cell: (props) => {
//     //         const row = props.row.original
//     //         return <span>{row?.rrn}<button onClick={() => {navigator.clipboard.writeText(row?.rrn); 
//     //             toast.push(
//     //             <Notification title="RRN/UTR Copied to Clipboard!" type="success"/>,
                 
//     //             {
//     //                 placement: 'top-center',
//     //             }
//     //         )}}><img src={clipboard} width={20} height={15} alt=''/></button></span>
//     //     },
//     //     enableSorting: false,
//     // },
//     {
//         header: 'Amount',
//         accessorKey: 'amout',
//         cell: (props) => {
//             const row = props.row.original
//             // return <span>{amountFormatter(row?.amout)}</span>
//         },
//         enableSorting: false,
//     },
//     {
//         header: 'Date & Time',
//         accessorKey: 'mosdate',
//         cell: (props) => {
//             const row = props.row.original
//             return ( "test"
//                 // <span>
//                 //     {getFormatDate(row?.mosdate, 'YYYY-MM-DD HH:mm:ss')}
//                 // </span>
//             )
//         },
//         enableSorting: false,
//     },
//     {
//         header: 'Status',
//         accessorKey: 'status',
//         cell: (props) => {
//             const row = props.row.original
//             const statusColor =
//                 row.status === 1 || row.status === 4
//                     ? 'text-["#22AC00"]'
//                     : row.status === 2 || row.status === 5
//                     ? 'text-["#D20000"]'
//                     : row.status === 3
//                     ? 'text-["#F9AA33"]'
//                     : 'text-["#414141"]'
//             return (
//                 <span className={` capitalize ${statusColor}`}>
//                   Status
//                    {/* "{TRANSACTION_STATUS[row.status]} " */} 
//                 </span>
//             )
//         },
//         enableSorting: false,
//     },
//     {
//         header: () => (
//             <span>
//                 Refunded for
//                 <br />
//                 Transaction ID
//             </span>
//         ),
//         accessorKey: 'maintxnid',
//         enableSorting: false,
//     },
//     {
//         header: "Action",
//         accessorKey: 'action',
//         cell: (props) =>  props?.row?.original?.cName || "--",
//         enableSorting: false,
//     },
//     {
//         header: 'Description',
//         accessorKey: 'description',
//         enableSorting: false,
//     },    
    
// ]
const terminalLevelColumns = [
    {
        header: 'Sl No',
        accessorKey: 'terminal',
        enableSorting: false,
    },
    {
        header: 'Bill No.',
        accessorKey: 'orgtxnid',
        // cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    },
    {
        header: 'Date',
        accessorKey: 'transactionId',
        enableSorting: false,
    },
    {
        header: 'Party Code',
        accessorKey: 'amout',
        cell: (props) => {
            const row = props.row.original
            // return <span>{amountFormatter(row?.amout)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Bill Value',
        accessorKey: 'mosdate',
        cell: (props) => {
            const row = props.row.original
            return ( "test"
                // <span>
                //     {getFormatDate(row?.mosdate, 'YYYY-MM-DD HH:mm:ss')}
                // </span>
            )
        },
        enableSorting: false,
    },
    {
        header: "Cash",
        accessorKey: 'action',
        cell: (props) =>  props?.row?.original?.cName || "--",
        enableSorting: false,
    },
    {
        header: 'UPI Type',
        accessorKey: 'description',
        enableSorting: false,
    },
    
    {
        header: () => (
                <span>
                    UPI <br/>
                    Amount
                </span>
        ),
        accessorKey: 'description',
        enableSorting: false,
    },    
    {
        header: 'Card',
        accessorKey: 'description',
        enableSorting: false,
    },
    {
        header: 'Bank',
        accessorKey: 'description',
        enableSorting: false,
    },
    
    {
        header: () => (
            <span>
                Advanced <br/>
                Receipt No.
            </span>
        ),
        accessorKey: 'description',
        enableSorting: false,
    },
    {
        header: () => (
            <span>
                Advanced <br/>
                Receipt Amount
            </span>
        ),
        accessorKey: 'description',
        enableSorting: false,
    },
    {
        header: 'Pending Bill',
        accessorKey: 'description',
        enableSorting: false,
    },
    
];

const merchantLevelColumns = [
    {
        header: 'Sl No11',
        accessorKey: 'terminal',
        enableSorting: false,
    },
    {
        header: 'Bill No.',
        accessorKey: 'orgtxnid',
        // cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    },
    {
        header: 'Date',
        accessorKey: 'transactionId',
        enableSorting: false,
    },
    {
        header: 'Party Code',
        accessorKey: 'amout',
        cell: (props) => {
            const row = props.row.original
            // return <span>{amountFormatter(row?.amout)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Bill Value',
        accessorKey: 'mosdate',
        cell: (props) => {
            const row = props.row.original
            return ( "test"
                // <span>
                //     {getFormatDate(row?.mosdate, 'YYYY-MM-DD HH:mm:ss')}
                // </span>
            )
        },
        enableSorting: false,
    },
    {
        header: "Cash",
        accessorKey: 'action',
        cell: (props) =>  props?.row?.original?.cName || "--",
        enableSorting: false,
    },
    {
        header: 'UPI Type',
        accessorKey: 'description',
        enableSorting: false,
    },
    
    {
        header: () => (
                <span>
                    UPI <br/>
                    Amount
                </span>
        ),
        accessorKey: 'description',
        enableSorting: false,
    },    
    {
        header: 'Card',
        accessorKey: 'description',
        enableSorting: false,
    },
    {
        header: 'Bank',
        accessorKey: 'description',
        enableSorting: false,
    },
    
    {
        header: () => (
            <span>
                Advanced <br/>
                Receipt No.
            </span>
        ),
        accessorKey: 'description',
        enableSorting: false,
    },
    {
        header: () => (
            <span>
                Advanced <br/>
                Receipt Amount
            </span>
        ),
        accessorKey: 'description',
        enableSorting: false,
    },
    {
        header: 'Pending Bill',
        accessorKey: 'description',
        enableSorting: false,
    },
    
]

const QuickBookTable = () => {
    let userType = localStorage.getItem("mType");
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);

    console.log("CashBook",cashbookData);
    console.log("userType",userType)
    // const dispatch = useDispatch()
    // const loading = useSelector((state) => state.transactions.data.loading)
    // const data = useSelector((state) => state.transactions.data.transactionList)
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
    const getTableColumns = (uType,cbData) => {
        return (uType=== "4" || cbData?.book_type === 5)?merchantLevelColumns:
            terminalLevelColumns;
    }
    return (
        <>
            <DataTable
                columns={getTableColumns(userType,cashbookData)}
                data={[]}
                // pagingData={{
                //     pageIndex: pageNumber + 1,
                //     pageSize: recordsPerPage,
                //     total: totalRecords,
                // }}
                // onPaginationChange={onPaginationChange}
                // loading={loading}
            />
        </>
    )
}

export default QuickBookTable