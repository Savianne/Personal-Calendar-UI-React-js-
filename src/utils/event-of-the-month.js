import { TempleBuddhist } from "@mui/icons-material";
import organizedEvents from "./events-organizer";
import distributeNonRepeatingEvents from "./non-repeating-event-distributer";
import distributeLocalHolidays from "./distribute-local-holidays";
import { distributeWeeklyEvents, distributeDailyEvents, distributeAnnualEvents } from "./repeating-events-distributers";

function eventsForTheMonth(month, list, holidays) {
    const eventList = [
        ...distributeLocalHolidays(month, holidays),
        ...distributeNonRepeatingEvents(month, organizedEvents(list).nonRepeatingEvents),
        ...distributeAnnualEvents(organizedEvents(list).repeatingEvents['a'], month),
        ...distributeWeeklyEvents(organizedEvents(list).repeatingEvents['w'], month),
        ...distributeDailyEvents(organizedEvents(list).repeatingEvents['d'], month),
    ]

    // console.log(eventList)
    const events = {};
    eventList.forEach(item => {
        const prop = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`;
        if(events.hasOwnProperty(prop)) {
            events[prop].push(item);
        } else {
            events[prop] = [item]
        }
    });

    const keys = Object.keys(events);

    const sortedByDate = {};

    keys.sort((a, b) => a.split('-')[2] - a.split('-')[2]);

    keys.forEach(item => {
        sortedByDate[item] = events[item];
    })

    return sortedByDate;
}

export default eventsForTheMonth;