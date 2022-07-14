class CalendarLabels {
    _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    _days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    get months() {
        return this._months;
    }

    get days() {
        return this._days;
    }

    get shortMonths() {
        return this._months.map((item) => getFirstThreeChar(item));
    }

    get shortDays() {
        return this._days.map((item) => getFirstThreeChar(item));
    }

}

function getFirstThreeChar(str) {
    return str[0] + str[1] + str[2];
}

const calendarLabels = new CalendarLabels();

export default calendarLabels;