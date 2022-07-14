import  formatAMPM from './format-ampm';

function invertDataFromDb(eventListFromDb) {
    const invertedData = eventListFromDb.map(item => {
        let stime = item.start_time? item.start_time.split(':') : null;
        let parsedDate =  new Date(item.date);
        return {
            event_id: item.event_id,
            title: item.title,
            date: new Date(item.date),
            time: stime? {
                start:  formatAMPM(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), +stime[0], +stime[1])),
                end:  new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), +stime[0], (+stime[1] + +item.length_in_min)),
            } : 'All day',
            repeating: item.rule? {
                rule: item.rule,
                end: item.end_date? new Date(item.end_date) : null
            } : item.rule
        }
    });
    return invertedData;
}

export default invertDataFromDb;