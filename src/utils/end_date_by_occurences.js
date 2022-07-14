function getEndDateByOccurences(startDate, rule, occurences) {
    if(rule === 'd') {
        return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (occurences - 1));
    }
    if(rule === 'w') {
        return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (7 * (occurences - 1)));
    }
    if(rule === 'a') {
        return new Date(startDate.getFullYear() + (occurences - 1), startDate.getMonth(), startDate.getDate());
    }
}

export default getEndDateByOccurences;