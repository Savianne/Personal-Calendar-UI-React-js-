//Utils
import datesOfMonth from "./42-dates-of-month";

function distributeLocalHolidays(dateOfMonth, list) {
    let eventList = []
    if(list) {
        list.forEach(item => {
            if( new Date(dateOfMonth.getFullYear(), dateOfMonth.getMonth()).getTime() >= new Date(dateOfMonth.getFullYear(), item.date.getMonth()).getTime()) {
                const events = datesOfMonth(dateOfMonth).list.filter(innerItem => {
                    return item.date.getMonth() === innerItem.date.getMonth() && item.date.getDate() === innerItem.date.getDate();
                })
                .map((event) => {
                    return {
                        ...item,
                        ...event,
                        // date: new Date(event)
                    }
                });
    
                eventList = [...eventList, ...events];
            }
        });
    
        return eventList
    } else {
        return eventList;
    }
}

export default distributeLocalHolidays;
;