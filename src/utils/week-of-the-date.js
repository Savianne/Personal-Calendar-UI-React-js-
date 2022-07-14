export default function weekOfTheDate(date) {
    let startOfWeekDaysDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    let endOfWeekDaysDate = new Date(startOfWeekDaysDate.getFullYear(), startOfWeekDaysDate.getMonth(), startOfWeekDaysDate.getDate() + 6);
    
    return {
        startOfWeekDaysDate,
        endOfWeekDaysDate,
    }
}