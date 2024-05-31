import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { HISTORY_TYPE } from 'constants/app.constant'
import AntdSelectFilter from '../../components/ui/AntdSelect/AntdSelect';
import { getFromDate,getToDate } from '../../utils/dateFormatter';
// import { getTodayDate } from '@mui/x-date-pickers/internals';
import DateTimePicker from '../../components/ui/DateTimePicker/DateTimePicker'



const options = [
    { Id: 1, Type: 'Today' },
    { Id: 2, Type: 'Yesterday' },
    { Id: 3, Type: 'This Week' },
    { Id: 4, Type: 'This Month' },
    { Id: 5, Type: 'This Year' },
    { Id: 6, Type: 'Custom Range' },
]


const QuickBookStatusFilter = (props) => {
    const { onDateChange, message } = props

    const tableData = useSelector((state) => state.quickbookStore.data.tableData);

    const [dialogType, setDialogType] = useState('none')
    const [fromDate, setFromDate] = useState('')

    const onStatusFilterChange = (selected) => {
        console.log("s",selected);
        if (selected === 6) {
            setFromDate('')
            setDialogType('fromDate')
            return
        }
        onDateChange?.({
            historyType: selected,
            fromDate: "",
            toDate : ""
            // toDate: getTodayDate(),
        })
    }

    const handleDate = (date, type) => {
        console.log("DTE..",date,"TYPE..",type)
        if (type === 'fromDate') {
            setFromDate(date)
            setDialogType('toDate')
        } else {
            onDateChange?.({
                historyType: 6,
                fromDate: fromDate,
                toDate: date,
            })
            setDialogType('none')
        }
    }

    const handleCloseDialog = (value) => {
        setDialogType('none')
    }

    return (
        <>
            <AntdSelectFilter
                placeholder="Select Duration"
                // options={daysList}
                options = {options}
                onStatusChange={onStatusFilterChange}
                value = {tableData.history_type}
                message = {""}
            />
            {/* <span className="text-blue-400 text-base font-normal ml-2 mt-2">
                {tableData?.historyType > 0 ? (
                    tableData?.historyType === 6 ? (
                        getFormatDate(tableData?.fromDate) +
                        ' - ' +
                        getFormatDate(tableData?.toDate)
                    ) : (
                        HISTORY_TYPE?.[tableData?.historyType]
                    )
                ) : (
                    <span className="text-red-500 ltr:mr-1 rtl:ml-1">
                        {message}
                    </span>
                )}
            </span> */}
            <DateTimePicker
                dialogType={dialogType}
                handleDate={handleDate}
                handleCloseDialog={handleCloseDialog}
            />
        </>
    )
}

export default QuickBookStatusFilter