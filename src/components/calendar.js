import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';

//Redux
import { useSelector, useDispatch } from 'react-redux';

import {
    dateToggle,
    weekToggle,
    monthToggle
} from '../utils/calendar-date-toggles';

import isToday from '../utils/is-today-helper';
import isCurrentMonth from '../utils/is-current-month-helper';

import CALENDAR_MONTH_VIEW from './calendar-month-view';
import EVENTS from './events';

//Controller
import getAllEvents from '../controller/get-all-events';

//UTILS
import calendarLabels from '../utils/calendar-labels';
import invertDataFromDb from '../utils/invert-data-from-db';
import eventsForTheMonth from '../utils/event-of-the-month';
import getLocalHolidays from '../utils/localholiday';
import localHolidaysAPIInverter from '../utils/localHolidayAPIInverter';
import { useSelect } from '@mui/base';

const months = calendarLabels.months;


function calendarDateHeaderTextForMonthView(date = new Date(), view ) {
    return (isToday(date) || isCurrentMonth(date)) && view === 'month'? `${months[date.getMonth()]} ${new Date().getDate()}, ${date.getFullYear()}` : `${months[date.getMonth()]}, ${date.getFullYear()}`
}

function calendarDateHeaderTextForDayView(date = new Date()) {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const CALENDAR = () => {
    const user_auth = useSelector(state => state.userAuthReducer)
    const screen440 = useMediaQuery('(max-width:440px)');

    const calendarEvents = useSelector((state) => state.eventListReducer);
    const dispatcher = useDispatch();
    const [onViewDate, setOnViewDate] = useState(new Date);
    const [onViewDateText, updateOnViewDateText] = useState('')
    const [calendarView, switchCalendarView] = useState('month');
    const [dateView, setDateView] = useState('month'); 
    // const [calendarToggleType, setCalendarToggleType] = useState('month');
    const [calendarDateToggle, switchDateToggle] = useState(monthToggle);

    const [eventsOfTheMonth, setEventsOfMonth] = useState(null);
    const [localHolidays, setLocalHolidays] = useState(null);

    useEffect(() => {
        if(dateView === 'month') switchDateToggle(monthToggle);
        if(dateView === 'day') switchDateToggle(dateToggle);
    }, [dateView]);

    
    useEffect(() => {
        dateView === 'month'? updateOnViewDateText(calendarDateHeaderTextForMonthView(onViewDate, calendarView)) : updateOnViewDateText(calendarDateHeaderTextForDayView(onViewDate));
    }, [onViewDate, dateView, calendarView]);

    useEffect(() => {
        if(calendarView === 'month') setDateView('month');
        if(calendarView === 'day') setDateView('day');
    }, [calendarView]);

    useEffect(() => {
        setEventsOfMonth(eventsForTheMonth(onViewDate, calendarEvents || [], localHolidays || []));
    }, [calendarEvents, onViewDate, localHolidays]);

    useEffect(() => {
        getLocalHolidays('PH', 2021, (response) => {
            if(response.error) {
                dispatcher({type: 'NEW_SNACKBAR', payload: {severity: 'error', message: `Error Getting Local Holidays. Refresh the page`}})
            } else {
                setLocalHolidays(localHolidaysAPIInverter(response.holidays));
            }
        })
    }, []);

    useEffect(() => {
        if(user_auth === 'authenticated') {
            getAllEvents(
                (events) => {
                    dispatcher(
                        {
                            type: 'SET_EVENT_LIST',
                            payload: invertDataFromDb(events)
                        }
                    )
                },
                (err) => {
                    dispatcher({type: 'NEW_SNACKBAR', payload: {severity: 'error', message: `Error Retrieving Events ${err}`}})
                }
            );
        }
    }, [user_auth]);

    return <>
        <Box sx={{
        display: 'flex',
        flex: '0 1 100%',
        flexWrap: 'wrap',
        height: 'fit-content',
        marginTop: '25px',
        }}>
            <Box sx={{display: 'flex', flex: '0 1 100%', alignItems: 'center'}}>
                <Box sx={{width: 'fit-content'}}>
                    <CALENDAR_DATE_TOGGLE dateToToggle={onViewDate} toggle={calendarDateToggle} cb={(newDate) => setOnViewDate(newDate)} />
                </Box> 
                <Box sx={{width: 'fit-content', marginLeft: '10px'}} 
                onClick={() => {
                    if(calendarView === 'event' && dateView === 'month') {
                        setDateView('day')
                    } 
                    setOnViewDate(new Date())
                }}>
                    <Button variant="contained" size="small">Today</Button>
                </Box>
                {
                    !screen440? <Typography sx={{marginRight: 'auto', marginLeft: 'auto'}}>
                        {
                            onViewDateText
                        }
                    </Typography> : ''
                }
                
                <CALENDAR_TYPE_TOGGLE init={calendarView} dispatcher={(value) => switchCalendarView(value)} />
            </Box>
            {
                screen440? <>
                    <Box sx={{display: 'flex', flex: '0 1 100%', alignItems: 'center', marginTop: '10px'}}>
                        <Typography sx={{marginRight: 'auto', marginLeft: 'auto'}}>
                            {
                                onViewDateText
                            }
                        </Typography>
                    </Box>
                
                </> : ''
            }
                {
                    calendarView === 'month'? <CALENDAR_MONTH_VIEW onViewDate={onViewDate} events={eventsOfTheMonth} 
                    dateClickedCb={(date) => {
                        setOnViewDate(date);
                        switchCalendarView('event');
                        setDateView('day');
                    }} /> : ''
                }
                {
                    calendarView === 'event'? <EVENTS events={eventsOfTheMonth} dateView={dateView} onViewDate={onViewDate} /> : ''
                }
        </Box>
    </>
}

const CALENDAR_TYPE_TOGGLE = ({init, dispatcher}) => {
    const screen440 = useMediaQuery('(max-width:440px)');
    const [alignment, setAlignment] = useState(init);

    const handleChange = (event, newAlignment) => {
        // setAlignment(newAlignment);
        if (newAlignment !== null) {
            setAlignment(newAlignment);
          }
    };

    useEffect(() => {
        dispatcher(alignment)
    }, [alignment]);

    useEffect(() => {
        setAlignment(init);
    }, [init])
    return <>
        <ToggleButtonGroup
        size='small'
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{width: 'fit-content', marginLeft: screen440? 'auto' : ''}}
        >
            <ToggleButton value="month">MONTH</ToggleButton>
            <ToggleButton value="event">EVENT</ToggleButton>
        </ToggleButtonGroup>
    </>
}

const CALENDAR_DATE_TOGGLE = ({dateToToggle, toggle, cb}) => {
    return <>
    <span 
    style={{width: 'fit-content', height: 'fit-content'}}
    onClick={() => {
        toggle.prev(dateToToggle, cb)
        }}>
        <IconButton size="small" aria-label="prev">
            <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
    </span>
    <span 
    style={{width: 'fit-content', height: 'fit-content'}}
    onClick={() => toggle.next(dateToToggle, cb)}>
        <IconButton size="small" aria-label="next">
            <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
    </span>
    </>
}



export default CALENDAR;