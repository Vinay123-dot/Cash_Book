import React, { useRef, useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { HISTORY_TYPE } from 'constants/app.constant'
import AntdSelectFilter from '../../components/ui/AntdSelect/AntdSelect';
import { getFormatDate } from "../../utils/dateFormatter"
// import { getTodayDate } from '@mui/x-date-pickers/internals';
import DateTimePicker from '../../components/ui/DateTimePicker/DateTimePicker'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';




// const options = [
//     { Id: 1, Type: 'Today' },
//     { Id: 2, Type: 'Yesterday' },
//     { Id: 3, Type: 'This Week' },
//     { Id: 4, Type: 'This Month' },
//     { Id: 5, Type: 'This Year' },
//     { Id: 6, Type: 'Custom Range' },
// ]

const {RangePicker} = DatePicker;
const QuickBookStatusFilter = (props) => {
    const { onDateChange, message,options } = props

    const tableData = useSelector((state) => state.quickbookStore.data.tableData);

    const [dialogType, setDialogType] = useState('none')
    const [fromDate, setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [isDateRange,setIsDateRange] = useState(false);
    const [open, setOpen] = useState(true);
    const rangePickerRef = useRef(null);


    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //       document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);
      

    // const handleClickOutside = (event) => {
    //     console.log("e",event)
    //     if (rangePickerRef.current && !rangePickerRef.current.contains(event.target) && toDate) {
    //     //   setIsDateRange(false);
    //     setOpen(false)
    //     }
    // };

    const handleOpenChange = (open) => {
        setOpen(open);
    };
      
      



    const onStatusFilterChange = (selected) => {
        console.log("s",selected);
        
        if (selected === 6) {
            setFromDate('');
            setToDate('');
            setIsDateRange(true);
            // setTimeout(() => {
            //     setIsDateRange(true);
            // }, 500); 
            return;
        }
        onDateChange?.({
            historyType: selected,
            fromDate: "",
            toDate : ""
            // toDate: getTodayDate(),
        })
    }

    // const handleDate = (date, dateStrings) => {
    //     console.log("DTE..",date,"TYPE..",type)
    //     if (type === 'fromDate') {
    //         setFromDate(date)
    //         setDialogType('toDate')
    //     } else {
    //         onDateChange?.({
    //             historyType: 6,
    //             fromDate: fromDate,
    //             toDate: date,
    //         })
    //         setDialogType('none')
    //     }
    // }
    const handleDate = (date, dateStrings) => {
            onDateChange?.({
                historyType: 6,
                fromDate: dateStrings?.[0],
                toDate: dateStrings?.[1],
            })
            setOpen(true);
            setIsDateRange(false);
        }
    

    const handleCloseDialog = (value) => {
        setDialogType('none')
    }
    const getCustomData = (obj) => {
        let temp = getFormatDate(obj?.fromDate) +' - ' + getFormatDate(obj?.toDate);
        return obj.fromDate && obj.toDate ? temp : null
    }
    const disabledDate = (current) => {
        return current && current >= dayjs().add(1, 'day').startOf('day');
    };

    return (
        <>
        {
            isDateRange ?  
            // <div ref = {rangePickerRef}>
                <RangePicker 
                open={true}
                // onOpenChange={handleOpenChange}
                className='h-10'
                onChange = {handleDate}
                disabledDate={disabledDate}
            />
                 
        
             :
            <AntdSelectFilter
                placeholder="Select Duration"
                // options={daysList}
                options = {options}
                onStatusChange={onStatusFilterChange}
                value = {tableData.history_type}
                message = {message}
                customData = {getCustomData(tableData)}
            />
        }
        
           
        </>
    )
}

export default QuickBookStatusFilter