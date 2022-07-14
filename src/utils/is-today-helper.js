export default function isToday(d) {
    return d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth() && d.getDate() === new Date().getDate()? true : false
}