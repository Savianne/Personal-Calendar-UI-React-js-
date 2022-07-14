import weekOfTheDate from './week-of-the-date';

class CreateCalendarToggle {
    constructor(prev, next) {
        this.prevToggle = prev;
        this.nextToggle = next;
    }

    prev(date, cb) {
        const newValue = this.prevToggle(date);
        cb(newValue);
    }

    next(date, cb) {
        const newValue = this.nextToggle(date);
        cb(newValue);
    }
}


function PrevDateToggle(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
}

function NextDateToggle(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}
    
function PrevWeekToggle(date) {
    const baseWeek = weekOfTheDate(date).startOfWeekDaysDate;
    return new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() - 7);
}
    
function NextWeekToggle(date) {
    const baseWeek = weekOfTheDate(date).startOfWeekDaysDate;
    return new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() + 7);
}
    
function PrevMonthToggle(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1);
}
    
function NextMonthToggle(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1);
}

export const dateToggle = new CreateCalendarToggle(PrevDateToggle, NextDateToggle);
export const weekToggle = new CreateCalendarToggle(PrevWeekToggle, NextWeekToggle);
export const monthToggle = new CreateCalendarToggle(PrevMonthToggle, NextMonthToggle);
