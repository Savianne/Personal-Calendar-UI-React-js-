import isToday from "./is-today-helper";

function datesOfMonth(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth());
    const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const leftPaddingDate = firstDateOfMonth.getDay();
    const rightPaddingDate = 42 - (leftPaddingDate + lastDateOfMonth.getDate());

    const dateContainer = [];
    const calendarView = {
        'Sunday': [],
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
    }

    for(let c = 0; c <= 41; c++) {
        const d = new Date(date.getFullYear(), date.getMonth(), (1 - leftPaddingDate) + c);
        const isPadding = !(date.getMonth() === d.getMonth());

        dateContainer.push({
            date: d,
            day: days[d.getDay()],
            isPaddingDate: isPadding, 
            isToday: isToday(d),
        });

        calendarView[days[d.getDay()]].push({
            date: d,
            day: days[d.getDay()],
            isPaddingDate: isPadding,
            isToday: isToday(d), 
        })
    }

    return {
        list: [...dateContainer],
        calendarView: {...calendarView}
    };
}

export default datesOfMonth;