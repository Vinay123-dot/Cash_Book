import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function getFromDate() {
    return dayjs().format('YYYY-M-D 0:00:00')
}

export function getToDate() {
    return dayjs().format('YYYY-M-D 23:59:59')
}

export function getFormatDate(date, format = 'DD MMM YY') {
    return dayjs(date).format(format)
}

export function getUTCFormatDate(date, format = 'DD MMM YY') {
    return dayjs.utc(date).format(format)
}