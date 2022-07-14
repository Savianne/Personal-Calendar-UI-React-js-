export default function isCurrentMonth(d) {
    return d.getFullYear() === new Date().getFullYear() && d.getMonth() === new Date().getMonth()? true : false
}