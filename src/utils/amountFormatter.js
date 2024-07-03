export default function amountFormatter(number = 0) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
        roundingIncrement: 1,
    })
    return formatter.format(number).replace(/^(\D+)/, '$1 ')
}
