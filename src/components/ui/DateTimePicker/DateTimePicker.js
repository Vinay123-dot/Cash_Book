import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { Dialog } from 'components/ui'
import Modal from "../../shared/Modal";
import dayjs from 'dayjs'
import { StaticDateTimePicker } from '@mui/x-date-pickers'
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
                isOpen={showDialog && dialogType === 'fromDate'}
                onClose={handleCloseDialog}
                onRequestClose={handleCloseDialog}
                bodyOpenClassName="overflow-hidden"
                contentClassName="py-0 px-0"
                overlayClassName="flex items-center"
                closable={false}
                width={350}
            >
                <StaticDateTimePicker
                    defaultValue={dayjs(new Date())}
                    className="rounded"
                    onAccept={(value) => {
                        handleDate(
                            getFormatDate(value, 'YYYY-MM-DD HH:mm:00'),
                            'fromDate'
                        )
                    }}
                    ampm={false}
                    sx={{
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
                />
            </Modal>
            <Modal
                openModal={showDialog && dialogType === 'toDate'}
                onClose={handleCloseDialog}
                onRequestClose={handleCloseDialog}
                bodyOpenClassName="overflow-hidden"
                contentClassName="py-0 px-0"
                overlayClassName="flex items-center"
                closable={false}
                width={350}
            >
                <StaticDateTimePicker
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
                />
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

export default DateTimePicker