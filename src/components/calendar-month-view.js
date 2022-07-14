import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';

//MUI Icons
import PushPinIcon from '@mui/icons-material/PushPin';
import EventIcon from '@mui/icons-material/Event';

import datesOfMonth from '../utils/42-dates-of-month';
import calendarLabels from '../utils/calendar-labels';

const days = calendarLabels.shortDays;

const CALENDAR_MONTH_VIEW = ({onViewDate = new Date(), events, dateClickedCb}) => {
    const [dates, updateDates] = useState(null);
    const [eventList, setEventList] = useState(events);
    const [rows, updateRows] = useState(null);

    useEffect(() => {
        updateDates(datesOfMonth(onViewDate).list.map(item => {
            const key = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`;
            return eventList && eventList.hasOwnProperty(key)? {...item, events: eventList[key]} : item;
        }));
    }, [onViewDate, eventList]);

    useEffect(() => {
        setEventList(events);
    }, [events]);

    useEffect(() => {
        if(dates) {
            const newRows = [[], [], [], [], [], []];
    
            dates.forEach((item, index) => {
                index >= 0 && index <= 6 ? newRows[0].push(item) : 
                index >= 7 && index <= 13? newRows[1].push(item) :
                index >= 14 && index <= 20? newRows[2].push(item) :
                index >= 21 && index <= 27? newRows[3].push(item) : 
                index >= 28 && index <= 34? newRows[4].push(item) : 
                newRows[5].push(item);
            });
    
            updateRows(newRows);
        }
    }, [dates]);
    return <>
        <Box sx={{
            display: 'flex',
            flex: '0 1 100%',
            minWidth: '300px',
            overFlowX: 'auto',
            flexWrap: 'wrap',
            height: 'fit-content',
            marginTop: '15px'
        }}>
            <DRAW_CALENDAR_DAYS days={days} />
            {
                rows? <>
                    {
                        React.Children.toArray(
                            rows.map((item, index) => {
                                return <>
                                    <DRAW_CALENDAR_ROW array={item} dateClickedCb={(date) => dateClickedCb(date)}  />
                                </>
                            })
                        )
                    }
                    
                </> : ''
            }
        </Box>
    </>
}

const DRAW_CALENDAR_ROW = ({array, dateClickedCb}) => {
    const [row, updateRow] = useState(array);
    useEffect(() => {
        updateRow(array);
    }, [array]);
    return <>
        <Box sx={{
            display: 'flex',
            flex: ' 0 1 100%',
            flexWrap: 'nowrap',
            height: 'fit-content'
        }}>
            {
                React.Children.toArray(
                    row.map((item, index) => {
                        return <>
                            <CALENDAR_DATA_CELL data={item} dateClickedCb={(date) => dateClickedCb(date)} />                 
                        </>
                    })
                )    
            }    
        </Box>
    </>
}

const DRAW_CALENDAR_DAYS = ({days}) => {
    return <>
        {
            React.Children.toArray(
                days.map((item, index) => {
                    return <>
                        <Box sx={{
                            display: 'flex', 
                            flex: `0 1 ${100 / 7}%`, 
                            height: '50px', 
                            minWidth: '45px', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRightWidth: item.toLowerCase() === 'sat'? '1px' : '0', 
                        }} key={index}>
                            <Typography sx={{ fontSize: '1em'}}>{item.toUpperCase()}</Typography>
                        </Box>
                    </>
                })
            )
        }
    </>
}

const CALENDAR_DATA_CELL = ({data, dateClickedCb}) => {
    const [item, updateItem] = useState(data);
    useEffect(() => {
        updateItem(data)
    }, [data])
    return <>
        <span style={{ display: 'flex', flex: `0 1 ${100 / 7}%`, height: '100px', minWidth: '45px'}} >
            <Box sx={{ 
                position: 'relative',
                display: 'flex', 
                flex: '1', 
                height: '100%', 
                border: (theme) => `1px solid ${theme.palette.divider}`, 
                borderRightWidth: item.day.toLowerCase() === 'saturday'? '1px' : '0', 
                borderTopWidth: '0',
                alignItems: 'flex-start', 
                justifyContent: 'center'
            }}>
                <IconButton sx={{ width: '30px', height: '30px', marginTop: '5px', backgroundColor: item.isToday? '#1a73e8' : 'none'}} aria-label="date" component="span"
                onClick={() => dateClickedCb(item.date)}>
                    {
                        item.isToday? <Typography sx={{ color: 'white' }}>{item.date.getDate()}</Typography> : <Typography color={item.isPaddingDate? 'text.disabled' : 'GrayText.primary'}>{item.date.getDate()}</Typography>
                    }
                </IconButton>
                {
                    item.events? <>
                        <Badge badgeContent={0} sx={{
                                position: 'absolute',
                                bottom: '5px',
                                left: '5px',
                                color: '#cecccc8a'
                            }} >
                            <EventIcon sx={{color: '#cecccc8a', width: '20px', height: '20px'}}/>
                        </Badge>
                    </> : ''
                }
            </Box>
        </span>
    </>
}

export default CALENDAR_MONTH_VIEW;