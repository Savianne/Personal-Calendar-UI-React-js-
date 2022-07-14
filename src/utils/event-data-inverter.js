import calendarLabels from "./calendar-labels";

// const sample = [{
//         day: 'WED',
//         date: '03',
//         events: [
//             {
//                 title: 'My Birth Day',
//                 time: 'Whole Day',
//                 holiday: {
//                     discription: 'Holiday in the Philippines',
//                 },
//                 id: '123456',
//             }
//         ]
//     },
//     {
//         day: "FRI",
//         date: '06',
//         events: [
//             {
//                 title: 'My Birth Day',
//                 time: 'Whole Day',
//                 holiday: false,
//                 id: '123457'
//             },
//             {
//                 title: 'Developers Meeting',
//                 time: {start: '8PM', end: '9:30PM'},
//                 holiday: false,
//                 id: '123458'
//             },
//             {
//                 title: 'My Birth Day',
//                 time: 'Whole Day',
//                 holiday: false,
//                 id: '123459'
//             },
//         ]
//     },
// ]

function eventDataInverter(eventDataList) {
    const events = [];
    Object.entries(eventDataList).forEach(item => {
        const key = item[0].split('-');
        const eventList = item[1];
        const date = new Date(item[0])
        const day = calendarLabels.shortDays[date.getDay()].toUpperCase();

        const eventGroup = {
            day: day,
            date_label: key[2],
            date: date,
            events: eventList,
        }

        events.push(eventGroup);
    });

    return events;
}

export default eventDataInverter;