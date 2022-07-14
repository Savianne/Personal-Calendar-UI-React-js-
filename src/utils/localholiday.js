function getLocalHolidays(country, year, cb) {
    fetch(`https://holidayapi.com/v1/holidays?country=${country}&year=${year}&key=e396ca9e-daad-4969-9f42-2f95a7ae7759`)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(data => {
        cb(data);
    })
    .catch(err => {
        cb({error: err});
    })
}

export default getLocalHolidays;