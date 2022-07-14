import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

//Redux
import { useDispatch } from 'react-redux';

//Controller
import deleteEvent from '../controller/delete-event';

//UTILS
import eventDataInverter from '../utils/event-data-inverter';
import calendarLabels from '../utils/calendar-labels';
import formatAMPM from '../utils/format-ampm';

//Components
import EDIT_EVENT_FORM from './edit-event-form';

const shortDays = calendarLabels.shortDays;
const shortMonths = calendarLabels.shortMonths;

const EVENTS = ({events, dateView, onViewDate}) => {
    const [eventList, updateEventList] = useState(null);

    useEffect(() => {
        if(events) {
            if(dateView === 'month') {
                updateEventList(eventDataInverter(events).sort(function(a, b){return a.date - b.date}));
            } else {
                const key = `${onViewDate.getFullYear()}-${onViewDate.getMonth() + 1}-${onViewDate.getDate()}`;
                events.hasOwnProperty(key)? updateEventList(eventDataInverter({[key] : events[key]})) : updateEventList([]);
                
            }
        }
    }, [events]);

    // useEffect(() => {
    //     updateEventList()
    // }, [eventList])
    
    // useEffect(() => {

    // }, [onViewDate])
    return <>
        
        <Box sx={{
            display: 'flex',
            flex: '0 1 100%',
            flexWrap: 'wrap',
            marginTop: '15px',
            height: 'fit-content',
        }}>
            {
                eventList? <>
                    {
                        React.Children.toArray(
                            eventList.map((item, index) => {
                                return new Date(item.date).getMonth() === onViewDate.getMonth()? <EVENT_DATA_HOLDER eventData={item} /> : ''
                            })
                        )
                    }
                </> : 'loading...'
            }

            {
                eventList && eventList.length <= 0? <>
                    <Box sx={{display: 'flex', flex: '0 1 100%', height: '400px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <CalendarTodayIcon sx={{color: 'text.disabled', fontSize: '80px', marginBottom: '10px'}} />
                        <Typography sx={{fontSize: '20px'}} color='text.disabled'>No Schedule for this Date!</Typography> 
                    </Box>
                </> : ''
            }
        </Box>
    </>
}

const EVENT_DATA_HOLDER = ({eventData}) => {
    function eventDataHolderColor(event) {
        if(event.holiday) return 'orange';
        if(!(event.holiday) && typeof(event.time) === 'string' && event.time.toLowerCase() === 'whole day') return '#1976d2';
        return '#047776';
    }
    return <>
        <Box sx={{display: 'flex', flex: '0 1 100%', padding: '15px 0', borderTop: (theme) => `1px solid ${theme.palette.divider}`,}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px', height: 'fit-content', border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '10px'}}>
                <Typography sx={{fontSize: '20px'}} color={'text.disabled'}>{eventData.day}</Typography>
                <Divider orientation="horizontal" variant="middle" flexItem />
                <Typography sx={{fontSize: '30px', fontWeight: 'bold'}}>{eventData.date_label.toString().padStart(2, '0')}</Typography>
            </Box>
            <Divider sx={{marginLeft: '15px', marginRight: '15px'}} orientation="vertical" variant="middle" flexItem />
            <Box sx={{ display: 'flex', flex: '1', flexWrap: 'wrap',  alignItems: 'center'}}>
                {
                    React.Children.toArray(
                        eventData.events.map((item, index) => {
                            return <>
                                <Box sx={{ display: 'flex', flex: '0 1 100%', padding: '0.5px 5px', height: 'fit-content', marginBottom: '5px', alignItems: 'center', borderRadius: '5px', backgroundColor: eventDataHolderColor(item)}}>
                                    <Typography sx={{ color: 'white', fontSize: '11px'}} variant="inherit" noWrap>{item.title}</Typography>
                                    <Divider sx={{margin: '1px 5px', height: '15px', borderLeftWidth: '1.5px', borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderColor: 'white'}} orientation="vertical" variant="middle" />
                                    <Typography sx={{ color: 'white', fontSize: '11px', fontWeight: 'bold'}} variant="inherit" noWrap>
                                        {
                                            typeof(item.time) === 'string'? item.time : item.date.getDate() === item.time.end.getDate()? `${item.time.start} - ${formatAMPM(item.time.end)}` : `${item.time.start} - ${shortDays[item.time.end.getDay()]} ${shortMonths[item.time.end.getMonth()]} ${item.time.end.getDate().toString().padStart(2,0)} ${formatAMPM(item.time.end)}`
                                        }
                                    </Typography>
                                    <span style={{ marginLeft: 'auto'}}>
                                        <EVENT_POPOVER_TOGGLE eventData={item} bullet={eventDataHolderColor(item)} />
                                    </span>
                                </Box>
                            </>
                        })
                    )
                }
            </Box>
        </Box>
    </>
}

const EVENT_POPOVER_TOGGLE = ({eventData, bullet, editEventForm}) => {

    const dispatcher = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // useEffect(() => {
    //     console.log(eventData)
    // })

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return <>
        
        <span style={{ width: 'fit-content', height: 'fit-content'}} onClick={handleClick}>
            <IconButton sx={{ padding: '5px'}} aria-label="More" component="span">
                <MoreHorizIcon sx={{fontSize: '15px', color: 'white'}} />
            </IconButton>
        </span>
        <div>
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            elevation={20}
            >
                <Box sx={{ display: 'flex', flex: '0 1 100%', padding: '5px', height: 'fit-content', justifyContent: 'flex-end'}}>
                    {
                        !eventData.holiday? <>
                            {/* <IconButton  sx={{ marginLeft: '5px'}} aria-label="Edit" component="span"
                            onClick={() => {
                                // console.log(eventData.event_id)
                                dispatcher({type: 'EDIT_EVENT', payload: eventData.event_id});
                                handleClose();
                            }}>
                                <EditIcon sx={{ fontSize: '18px' }} />
                            </IconButton> */}
                            <IconButton sx={{ marginLeft: '5px'}} aria-label="Delete" component="span"
                            onClick={() => {
                                dispatcher({type: 'OPEN_BDLI'});
                                deleteEvent(eventData.event_id,  
                                    () => {
                                        dispatcher({type: 'REMOVE_ONE_ITEM_IN_EVENT_LIST', payload: eventData.event_id});
                                        dispatcher({type: 'CLOSE_BDLI'});
                                        dispatcher({
                                            type: 'NEW_SNACKBAR',
                                            payload: {
                                              severity: 'success',
                                              message: 'Event Deleted Successfully'
                                            }
                                        });
                                    }, 
                                    (err) => {
                                        console.log(err)
                                        dispatcher({type: 'CLOSE_BDLI'});
                                        dispatcher({
                                            type: 'NEW_SNACKBAR',
                                            payload: {
                                              severity: 'error',
                                              message: 'Failed to delete event'
                                            }
                                        });
                                    }
                                );
                                handleClose();
                            }}>
                                <DeleteIcon sx={{ fontSize: '18px' }} />
                            </IconButton>
                        </> : ''
                    }
                    
                    <IconButton sx={{ marginLeft: '5px'}} aria-label="Close" component="span" onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: '18px' }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', width: '350px', height: 'fit-content', padding: '5px 15px 35px 15px'}}>
                    <Box sx={{ display: 'flex', flex: '1', flexWrap: 'wrap', alignItems: 'center', height: 'fit-content'}}>
                        <i style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: bullet, marginRight: '10px'}}></i>
                        <Typography>{eventData.title}</Typography>
                        <Typography sx={{ display: 'flex', flex: '0 1 100%', marginLeft: '22px', fontSize: '12px', fontWeight: '100'}}>
                            {
                                typeof(eventData.time) === 'string'? eventData.time : eventData.date.getDate() === eventData.time.end.getDate()? `${eventData.time.start} - ${formatAMPM(eventData.time.end)}` : `${eventData.time.start} - ${shortDays[eventData.time.end.getDay()]} ${shortMonths[eventData.time.end.getMonth()]} ${eventData.time.end.getDate().toString().padStart(2,0)} ${formatAMPM(eventData.time.end)}`
                            }
                        </Typography>
                    </Box>
                </Box>
            </Popover>
        </div>
    </>
}
export default EVENTS;