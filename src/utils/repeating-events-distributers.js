
//Utils
import datesOfMonth from "./42-dates-of-month";
import calendarLabels from "./calendar-labels";

function distributeWeeklyEvents(weeklyEvents, dateOfMonth) {
    let eventList = []
    if(weeklyEvents) {
        weeklyEvents.forEach((item) => {  
            if( new Date(dateOfMonth.getFullYear(), dateOfMonth.getMonth()).getTime() >= new Date(item.date.getFullYear(), item.date.getMonth()).getTime()) {
                const events = datesOfMonth(dateOfMonth).calendarView[calendarLabels.days[item.date.getDay()]].filter((event) => {
                    if(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()).getTime() <= event.date.getTime()) {
                        if(item.repeating.end) {
                            return  event.date.getTime() <= item.repeating.end.getTime()? true : false;
                        } 
                        
                        return true;
                    }
                }).map((event) => {
                    return {
                        ...item,
                        ...event,
                    }
                })
    
               eventList = [...eventList, ...events];
    
            }
        });

        return eventList
    } else {
        return eventList;
    }

}



function distributeDailyEvents(dailyEvents, dateOfMonth) {
    let eventList = []
    if(dailyEvents) {
        dailyEvents.forEach((item) => {
            if( new Date(dateOfMonth.getFullYear(), dateOfMonth.getMonth()).getTime() >= new Date(item.date.getFullYear(), item.date.getMonth()).getTime()) {
                const events = datesOfMonth(dateOfMonth).list.filter(event => {
                    if(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()).getTime() <= event.date.getTime()) {
                        if(item.repeating.end) {
                            return  event.date.getTime() <= item.repeating.end.getTime()? true : false;
                        } 
                        
                        return true;
                    }
                }).map((event) => {
                    return {
                        ...item,
                        ...event,
                    }
                })
    
                eventList = [...eventList, ...events];
    
            } 
        });
    
        return eventList
    } else {
        return eventList;
    }
}


function distributeAnnualEvents(annualEvents, dateOfMonth) {
        let eventList = [];
        if(annualEvents) {
            annualEvents.forEach((item) => {
                const eventDate = new Date(dateOfMonth.getFullYear(), item.date.getMonth(), item.date.getDate());
                if( new Date(dateOfMonth.getFullYear(), dateOfMonth.getMonth()).getTime() >= new Date(item.date.getFullYear(), item.date.getMonth()).getTime()) {
                    const events = datesOfMonth(dateOfMonth).list.filter(event => {
                        if(event.date.getTime() === eventDate.getTime()) {
                            if(item.repeating.end) {
                                return (eventDate.getTime() <= item.repeating.end.getTime())? true : false;
                            }
                            
                            return true
                        } else {
                            return false
                        }
                    }).map(event => {
                        return {
                            ...item,
                            ...event,
                        }
                    });
    
                    eventList = [...eventList, ...events];
                }
            });

            return eventList;
        } else {
            return eventList;
        }
}


export { distributeWeeklyEvents, distributeDailyEvents, distributeAnnualEvents };