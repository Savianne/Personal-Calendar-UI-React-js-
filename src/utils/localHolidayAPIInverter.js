function localHolidaysAPIInverter(data) {
    const invertedData = data.map((item) => {
        const date = new Date(item.date);

        return {
            title: item.name,
            date: date,
            time: 'whole day',
            repeating: false,
            holiday: true,
        }
    });

    return invertedData;
}

export default localHolidaysAPIInverter;