const sampleDataFormatFromTheServer = [
    // {
    //     fid: '1',
    //     title: 'sample event 1',
    //     date: new Date(2022, 5, 3),
    //     time: {
    //         start: new Date(2022, 7, 3, 8, 30, 0),
    //         end: new Date(2022, 7, 3, 9, 30, 0),
    //     },
    //     repeat: false,
    // },
    // {
    //     fid: '2',
    //     title: 'sample event 2 (whole day event)',
    //     date: new Date(2022, 5, 3),
    //     time: 'whole day',
    //     repeat: false,
    // },
    {
        fid: '3',
        title: 'sample event 3 (whole day event & repeating)',
        date: new Date(2022, 5, 20),
        time: 'whole day',
        repeat: {
            pattern: 'a',
            end: new Date(2024, 5, 20),
        },
    },
    {
        fid: '4',
        title: 'sample event 4 (repeating event, every week at same day)',
        date: new Date(2022, 5, 4),
        time: 'whole day',
        repeat: {
            pattern: 'w',
            end: new Date(2022, 6, 9),
        },
    },
    {
        fid: '6',
        title: 'sample event 4.5 (repeating event, every week at same day)',
        date: new Date(2022, 5, 9),
        time: 'whole day',
        repeat: {
            pattern: 'd',
            end: new Date(2023, 6, 9),
        },
    },
    {
        fid: '5',
        title: 'sample event 5 (repeating event, every week at same day)',
        date: new Date(2022, 5, 4),
        time: {
            start: new Date(2022, 5, 4, 5),
            end: new Date(2022, 5, 4, 6)
        },
        repeat: {
            pattern: 'd',
            end: false
        },
    },
]


export default sampleDataFormatFromTheServer;