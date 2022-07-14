export default function compareMonthByTime(date1, date2) {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime() === new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime()
}

