import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
let today = new Date();


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

export function getToday() {
    
    return formatDate(today);
}

export function getDaybeforeYesterday() {
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 2);
    return formatDate(yesterday);
}

export function getYesterDay() {
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return formatDate(yesterday);
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getTomorrowDate() {
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return formatDate(tomorrow);
}

export function convertToNormalFormat(datetimeString) {
    const date = new Date(datetimeString);
    return formatDate(date);
}

export function getCurrentDate(){
    return (dayjs()).format('YYYY-MM-DD');
}