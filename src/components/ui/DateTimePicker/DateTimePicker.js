import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { Dialog } from 'components/ui'
import Modal from '../../shared/Modal';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { getFormatDate } from '../../../utils/dateFormatter';

const DateTimePicker = (props) => {
    const { dialogType, handleCloseDialog, handleDate } = props
  
    const [showDialog] = useState(true)

    const handleClose = useCallback(() => {
        const closeButton = document.querySelectorAll(
            '.MuiDialogActions-root button'
        )
        closeButton?.[0]?.addEventListener('click', handleCloseDialog)
        closeButton?.[2]?.addEventListener('click', handleCloseDialog)
    }, [handleCloseDialog])

    useEffect(() => {
        window.addEventListener('click', handleClose)

        return () => {
            window.removeEventListener('click', handleClose)
        }
    }, [handleClose])

    return (
        <>
            <Modal
                openModal={showDialog && dialogType === 'fromDate'}
                onClose={handleCloseDialog}
                width={330}
                height={400}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        defaultValue={dayjs(new Date())}
                        className="rounded"
                        onAccept={(value) => {
                            handleDate(
                                getFormatDate(value, 'YYYY-MM-DD HH:mm:00'),
                                'fromDate'
                            )
                        }}
                        onChange={(newValue) => {
                            handleDate(
                                getFormatDate(newValue, 'YYYY-MM-DD HH:mm:00'),
                                'fromDate'
                            )
                        }}
                        ampm={false}
                        sx={{
                           
                            '& .MuiPickersToolbar-root.MuiPickersLayout-toolbar': {
                                backgroundColor: '#5A87B2',
                                // height : 100,
                                textAlign : 'end'

                            },
                            '& .MuiIconButton-root': { //newly added
                                color: 'green', // Example icon color
                            },
                            '& .MuiPickersCalendar-root': { //newly added
                                backgroundColor: 'red', // Example calendar background color
                                padding: '8px', // Example padding
                            },
                            '& .MuiTypography-root.MuiTypography-h3': { //modified
                                color: '#FFFFFF',
                                fontSize : 24
                            },
                            '& .MuiTypography-root.MuiTypography-subtitle1': { //modifed
                                color: '#FFFFFF',
                                fontSize : 24
                            },
                            '& .MuiTypography-root.MuiTypography-subtitle2': {
                                color: '#FFFFFF',
                            },
                            '& .MuiTypography-root.MuiTypography-h4': {
                                color: '#FFFFFF',
                                fontSize : 16
                            },
                            '& .MuiTypography-root.MuiTypography-overline': {
                                color: '#FFFFFF',
                            },
                            '& .MuiTypography-root.MuiDatePickerToolbar-title': {
                                color: '#FFFFFF',
                            },
                            '& .MuiPickersDay-root.Mui-selected': {
                                backgroundColor: '#5A87B2',
                            },
                            '& .MuiPickersDay-root.MuiPickersDay-today': {
                                border: '1px solid #5A87B2',
                            },
                            '& .MuiClock-pin': {
                                backgroundColor: '#5A87B2',
                            },
                            '& .MuiClockPointer-root': {
                                backgroundColor: 'red',
                            },
                            '& .MuiClockPointer-thumb': {
                                backgroundColor: '#5A87B2',
                                border: '16px solid #5A87B2',
                            },
                        }}
                    />

                </LocalizationProvider>

            </Modal>
            <Modal
                openModal={ showDialog && dialogType === 'toDate'}
                onClose={handleCloseDialog}
                width={330}
                height={400}
            >
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DateCalendar
                        defaultValue={dayjs(new Date())}
                        className="rounded"
                        onAccept={(value) => {
                            handleDate(
                                getFormatDate(value, 'YYYY-MM-DD HH:mm:00'),
                                'toDate'
                            )
                        }}
                        onChange={(newValue) => {
                            handleDate(
                                getFormatDate(newValue, 'YYYY-MM-DD HH:mm:00'),
                                'toDate'
                            )
                        }}
                        ampm={false}
                        sx={{
                           
                            '& .MuiPickersToolbar-root.MuiPickersLayout-toolbar': {
                                backgroundColor: '#5A87B2',
                                // height : 100,
                                textAlign : 'end'

                            },
                            '& .MuiIconButton-root': { //newly added
                                color: 'green', // Example icon color
                            },
                            '& .MuiPickersCalendar-root': { //newly added
                                backgroundColor: 'red', // Example calendar background color
                                padding: '8px', // Example padding
                            },
                            '& .MuiTypography-root.MuiTypography-h3': { //modified
                                color: '#FFFFFF',
                                fontSize : 24
                            },
                            '& .MuiTypography-root.MuiTypography-subtitle1': { //modifed
                                color: '#FFFFFF',
                                fontSize : 24
                            },
                            '& .MuiTypography-root.MuiTypography-subtitle2': {
                                color: '#FFFFFF',
                            },
                            '& .MuiTypography-root.MuiTypography-h4': {
                                color: '#FFFFFF',
                                fontSize : 16
                            },
                            '& .MuiTypography-root.MuiTypography-overline': {
                                color: '#FFFFFF',
                            },
                            '& .MuiTypography-root.MuiDatePickerToolbar-title': {
                                color: '#FFFFFF',
                            },
                            '& .MuiPickersDay-root.Mui-selected': {
                                backgroundColor: '#5A87B2',
                            },
                            '& .MuiPickersDay-root.MuiPickersDay-today': {
                                border: '1px solid #5A87B2',
                            },
                            '& .MuiClock-pin': {
                                backgroundColor: '#5A87B2',
                            },
                            '& .MuiClockPointer-root': {
                                backgroundColor: 'red',
                            },
                            '& .MuiClockPointer-thumb': {
                                backgroundColor: '#5A87B2',
                                border: '16px solid #5A87B2',
                            },
                        }}
                    />
                 {/* <StaticDateTimePicker
                    defaultValue={dayjs(new Date())}
                    className="rounded"
                    onAccept={(value) => {
                        handleDate(
                            getFormatDate(value, 'YYYY-MM-DD HH:mm:00'),
                            'toDate'
                        )
                    }}
                    ampm={false}
                    sx={{
                        '& .MuiPickerStaticWrapper-content': {
                            width: '300px', // Adjust width here
                            height: '200px', // Adjust height here
                        },
                        '& .MuiPickersToolbar-root.MuiPickersLayout-toolbar': {
                            backgroundColor: '#5A87B2',
                        },
                        '& .MuiTypography-root.MuiTypography-h3': {
                            color: '#FFFFFF',
                        },
                        '& .MuiTypography-root.MuiTypography-subtitle1': {
                            color: '#FFFFFF',
                        },
                        '& .MuiTypography-root.MuiTypography-subtitle2': {
                            color: '#FFFFFF',
                        },
                        '& .MuiTypography-root.MuiTypography-h4': {
                            color: '#FFFFFF',
                        },
                        '& .MuiTypography-root.MuiTypography-overline': {
                            color: '#FFFFFF',
                        },
                        '& .MuiTypography-root.MuiDatePickerToolbar-title': {
                            color: '#FFFFFF',
                        },
                        '& .MuiPickersDay-root.Mui-selected': {
                            backgroundColor: '#5A87B2',
                        },
                        '& .MuiPickersDay-root.MuiPickersDay-today': {
                            border: '1px solid #5A87B2',
                        },
                        '& .MuiClock-pin': {
                            backgroundColor: '#5A87B2',
                        },
                        '& .MuiClockPointer-root': {
                            backgroundColor: '#5A87B2',
                        },
                        '& .MuiClockPointer-thumb': {
                            backgroundColor: '#5A87B2',
                            border: '16px solid #5A87B2',
                        },
                    }}
                /> */}
                 </LocalizationProvider>
                
            </Modal>
        </>
    )
}

DateTimePicker.propTypes = {
    dialogType: PropTypes.string,
    handleCloseDialog: PropTypes.func,
    handleDate: PropTypes.func,
}

DateTimePicker.defaultProps = {
    dialogType: 'none',
}

export default DateTimePicker;