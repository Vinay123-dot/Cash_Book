import React from 'react'
import DataTable from 'components/shared/DataTable'
import { useSelector } from 'react-redux';
import HandleEditInvoice from './EditInvoice/HandleEditInvoice';
import { convertToNormalFormat } from 'utils/dateFormatter';
import amountFormatter from 'utils/amountFormatter';

const BankDepositColumns = [
    { header: 'Sl No',accessorKey: 'serial_no',enableSorting: false},
    {header: 'Date',accessorKey: 'Date',enableSorting: false},
    { header: 'Type',accessorKey: 'Type',enableSorting: false },
    {
        header: 'Amount',
        accessorKey: 'Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Amount)}</span>
        },
        enableSorting: false,
    },
    { header: 'Deposit Mode',accessorKey: 'Deposit_Mode', enableSorting: false},
    { header: 'Return Number',accessorKey: 'Return_Number', enableSorting: false },
    // { header: "Remaining Balance",accessorKey: 'Remaining_Balance', enableSorting: false},
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
    // { header: 'Amount', accessorKey: 'Amount',enableSorting: false},
    {
        header: 'Amount',
        accessorKey: 'Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Amount)}</span>
        },
        enableSorting: false,
    },
    // { header: 'Balance', accessorKey: 'Balance',enableSorting: false},
    { header: "Type", accessorKey: 'Petty_Cash_Details',enableSorting: false},
    { header: "Petty Cash Details", accessorKey: 'Petty_Cash_Extra_Details',enableSorting: false},
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
    { header: 'Reference Name',accessorKey: 'Reference_Name',enableSorting: false },
    { header: 'Party Code',accessorKey: 'Party_Code',enableSorting: false },
    { header: 'Receipt No.',accessorKey: 'Advance_Receipt_No', enableSorting: false },
    {
        header: 'Bill Value',
        accessorKey: 'Bill_Value',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Bill_Value)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Excel Bill Value',
        accessorKey: 'Excel_Bill_Value',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Excel_Bill_Value)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Cash',
        accessorKey: 'Cash_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Cash_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'UPI',
        accessorKey: 'UPI_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.UPI_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Debit Card',
        accessorKey: 'Debit_Card_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Debit_Card_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Credit Card',
        accessorKey: 'Credit_Card_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Credit_Card_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Bank',
        accessorKey: 'Online_Bank_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Online_Bank_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Cheque',
        accessorKey: 'Bank_Cheque_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Bank_Cheque_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Advance Receipt Amount',
        accessorKey: 'Advance_Receipt_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Advance_Receipt_Amount)}</span>
        },
        enableSorting: false,
    },
    
    {
        header: 'Pending Amount',
        accessorKey: 'Pending_Balance',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Pending_Balance)}</span>
        },
        enableSorting: false,
    },
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
    { header: 'Party Code',accessorKey: 'Party_Code',enableSorting: false },
    { header: "Customer Name", accessorKey: 'Customer_Name', enableSorting: false},
    { header: 'Customer Mobile Number',accessorKey: 'Phone_No',enableSorting: false },
    {
        header: 'Cash',
        accessorKey: 'Cash_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Cash_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'UPI',
        accessorKey: 'UPI_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.UPI_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Debit Card',
        accessorKey: 'Debit_Card_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Debit_Card_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Credit Card',
        accessorKey: 'Credit_Card_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Credit_Card_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Bank',
        accessorKey: 'Online_Bank_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Online_Bank_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Cheque',
        accessorKey: 'Bank_Cheque_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Bank_Cheque_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Advance Receipt Amount',
        accessorKey: 'Bill_Value',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Bill_Value)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Balance',
        accessorKey: 'Remaining_Balance',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Remaining_Balance)}</span>
        },
        enableSorting: false,
    },
  
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
    { header: 'Party Code',accessorKey: 'Party_Code',enableSorting: false },
    {
        header: 'Collected Amount',
        accessorKey: 'Bill_Value',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Bill_Value)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Cash',
        accessorKey: 'Cash_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Cash_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'UPI',
        accessorKey: 'UPI_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.UPI_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Debit Card',
        accessorKey: 'Debit_Card_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Debit_Card_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Credit Card',
        accessorKey: 'Credit_Card_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Credit_Card_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Bank',
        accessorKey: 'Online_Bank_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Online_Bank_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: 'Cheque',
        accessorKey: 'Bank_Cheque_Amount',
        cell: (props) => {
            const row = props.row.original
            return <span>{amountFormatter(row?.Bank_Cheque_Amount)}</span>
        },
        enableSorting: false,
    },
    {
        header: '‎ ‎ ‎ ‎ Action ‎ ‎  ‎  ‎  ',
        accessorKey: 'action',
        cell: (props) => <HandleEditInvoice row={props.row.original} />,
        enableSorting: false,
    }
];

const QuickBookTable = () => {
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);
    const outputArray = useSelector((state) => state.quickbookStore.data.transactionList);

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
      <DataTable
        columns={getTableColumns(cashbookData?.book_type)}
        data={getSortedData(outputArray)}
      />
    );
}

export default QuickBookTable

