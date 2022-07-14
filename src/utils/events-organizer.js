//This function handle the arangement of the event accurance {repeating: [...], nonRepeating: [...]}
function organizedEvents(eventList) {
    const repeatingEvents = {};
    const nonRepeatingEvents = [];
    eventList.forEach((item) => {
        if(item.repeating) {
            const property = item.repeating.rule;
            if(repeatingEvents.hasOwnProperty(property)) {
                repeatingEvents[property].push(item);
            } else {
                repeatingEvents[property] = [item];
            }
        } else {
            nonRepeatingEvents.push(item);
        }
    });

    return {
        repeatingEvents,
        nonRepeatingEvents
    }
}

export default organizedEvents;