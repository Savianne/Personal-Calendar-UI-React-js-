export default function dateToTime(date1) {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
}

