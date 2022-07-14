import { useState, useEffect } from 'react';
// import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
// import { DesktopDatePicker } from '@mui/lab';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'date-fns';

import { useSelector, useDispatch } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';

//Icons
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
// import { Typography } from '@mui/material';
// import { startOfWeekYear } from 'date-fns';
// import { duration } from '@material-ui/core';

//Utils
import getEndDateByOccurences from '../utils/end_date_by_occurences';
import formatAMPM from '../utils/format-ampm';

//Controller
import addNewEventToDb from '../controller/add-new-event';

const sampleData = {
    title: 'Title of Event',
    date: 'yyyy-mm-dd',
    repeat: {

    }
}


const ADD_EVENT_FORM = ({type = 'desktop', close}) => {
    const dispatcher = useDispatch();

    const [isLoading, setLoadingState] = useState(false);
    const [title, setTitle] = useState(null);
    const [eventDate, setEventDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [duration, setDuration] = useState(5);
    const [isAllDay, setIsAllDayValue] = useState(true);
    const [repeatingRule, setRepeatingRule] = useState(null);
    const [ends, setEnds] = useState('never');
    const [occurrences, setOccurences] = useState(5);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if(repeatingRule) {
            if(ends === 'never') {
                setEndDate(null)
            } else if(ends === 'after') {
                setEndDate(getEndDateByOccurences(eventDate, repeatingRule, occurrences));
            }
        } 
    }, [repeatingRule, ends, eventDate, occurrences])
    return <>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper elevation={0} sx={{display: 'flex', flexWrap: 'wrap', flex: '0 1 350px', padding: '0px 20px 20px 20px', alignItems: 'center'}}>
                <h4 style={{width: '80%'}}>Add New Event</h4>
                {
                    type === 'drawer'? <IconButton sx={{color: 'text.primary', marginLeft: 'auto', height: '40px', width: '40px'}} aria-label="upload picture" component="span"
                    onClick={() => close()}>
                        <CloseIcon />
                    </IconButton> : ''
                }
                <Stack spacing={3} sx={{width: '100%'}}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <EventNoteIcon sx={{width: '25px', height: '25px', marginRight: '15px'}} />
                        <TextField id="standard-basic" label="Event Title" variant="standard" size="small" sx={{display: 'flex', flex: '1'}}
                        disabled={isLoading}
                        error={!(title === null) && (title.length <= 0 || title.length > 100)}
                        value={title === null? '' : title}
                        onChange={(e) =>setTitle(e.target.value)} 
                        helperText={!(title === null) && (title.length <= 0 || title.length > 100)? "title must be between 1 - 100 characters" : ''} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <EventIcon sx={{width: '25px', height: '25px', marginRight: '15px'}} />
                        <DesktopDatePicker
                        disabled={isLoading}
                        label="Event Date"
                        inputFormat="MM/dd/yyyy"
                        value={eventDate}
                        onChange={(e) => setEventDate(e)}
                        renderInput={(params) => <TextField {...params} variant="standard" sx={{flex: '1'}} />}
                        sx={{display: 'flex', flex: '1', color: 'white'}}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                        <AccessTimeIcon sx={{width: '25px', height: '25px', marginRight: '15px'}} />
                        <TimePicker
                        label="Start Time"
                        value={startTime}
                        disabled={isLoading || isAllDay}
                        onChange={(e) => setStartTime(e)}
                        renderInput={(params) => <TextField {...params} variant="standard" sx={{flex: '1'}} />}
                        sx={{display: 'flex', flex: '1'  }}
                        />
                        <TextField
                        value={duration}
                        error={duration < 5 || duration > 1440}
                        helperText={duration < 5 || duration > 1440? 'Duration must be between  5 to 1440 minutes' : ''}
                        onChange={(e) => setDuration(e.target.value)}
                        disabled={isLoading || isAllDay}
                        id="standard-number"
                        label="Duration: (Minutes)"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        sx={{display: 'flex', flex: '0 1 100%', marginLeft: '40px', marginTop: '15px'}}
                        size="small"
                        />
                        <FormControlLabel 
                        control={<Checkbox disabled={isLoading} defaultChecked={isAllDay} value={isAllDay} onChange={(e) => setIsAllDayValue(e.target.checked)}/>} 
                        label="All Day" 
                        sx={{display: 'flex', flex: '0 1 100%', marginLeft: '30px', marginTop: '5px'}}/>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        flexWrap: 'wrap',
                        marginTop: '0'
                    }}>
                        <EventRepeatIcon sx={{width: '25px', height: '25px', marginRight: '15px'}} />
                        <FormControl variant="standard" sx={{ display: 'flex', flex: '1' }}>
                            <InputLabel id="demo-simple-select-standard-label">Repeat Event</InputLabel>
                            <Select
                            disabled={isLoading}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={repeatingRule}
                            onChange={(e)=> setRepeatingRule(e.target.value)}
                            label="Repeat Event"
                            >
                            <MenuItem value={null}>
                                <em>Does not Repeat</em>
                            </MenuItem>
                            <MenuItem value='d'>Daily</MenuItem>
                            <MenuItem value='w'>Weekly</MenuItem>
                            <MenuItem value='a'>Annualy</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{display: 'flex', flex: '0 1 100%', flexWrap: 'wrap', marginLeft: '40px', marginTop: '10px'}}>
                            <FormControl>
                                <FormLabel id="demo-form-control-label-placement">Ends</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-form-control-label-placement"
                                    name="position"
                                    value={ends}
                                    onChange={(e) =>  setEnds(e.target.value)}
                                >
                                    <FormControlLabel value="never" control={<Radio />} label="Never" sx={{width: '100%'}} disabled={isLoading || !repeatingRule} />
                                    <FormControlLabel value="on" control={<Radio />} label="On" sx={{width: '40%'}} disabled={isLoading || !repeatingRule}/>
                                        <DesktopDatePicker
                                        disabled={ends === 'on'? isLoading? true : false : true}
                                        label="End Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e)}
                                        renderInput={(params) => <TextField {...params} 
                                        variant="standard" 
                                        sx={{flex: '1 0 40%'}}
                                        error={ends === 'on' && endDate && eventDate && new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() <= new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime()}
                                        helperText={ends === 'on' && endDate && eventDate && new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() <= new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime()? 'End Date must be > to Event Date' : ''} />}
                                        />
                                    <FormControlLabel value="after" control={<Radio />} label="After" sx={{width: '40%'}} disabled={repeatingRule? false : true} />
                                    <TextField
                                    disabled={ends === 'after'? isLoading? true : false : true}
                                    value={occurrences}
                                    error={ends === 'after' && occurrences <= 1}
                                    helperText={ends === 'after' && occurrences <= 1? 'Occurences must be > 1' : ''}
                                    onChange={(e) => setOccurences(e.target.value)}
                                    id="standard-number"
                                    label="Occurrences"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size="small"
                                    sx={{display: 'flex', flex: '1 0 40%', marginTop: '15px'}}
                                    variant="standard"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Stack spacing={2} direction="row" sx={{marginTop: '30px', marginLeft: 'auto'}}>
                            {/* <Button variant="text">Cancel</Button> */}
                            <LoadingButton variant="contained" 
                            onClick={() => {
                                const data = {
                                    title: title,
                                    date: `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`,
                                    time: !isAllDay? {start_time: `${startTime.getHours()}:${startTime.getMinutes()}`, length_in_min: duration} : null,
                                    repeating: repeatingRule? {
                                        rule: repeatingRule,
                                        end_date: endDate? `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}` : null,
                                    } : null
                                }

                                setLoadingState(true);
                                addNewEventToDb(
                                    data, 
                                    (e) => {
                                        setTitle(null);
                                        setLoadingState(false);
                                        setEventDate(new Date());
                                        setStartTime(new Date());
                                        setDuration(5);
                                        setIsAllDayValue(true);
                                        setRepeatingRule(null);
                                        setEnds('never');
                                        setOccurences(5);
                                        setEndDate(null);

                                        dispatcher({
                                            type: 'ADD_ONE_ITEM_TO_EVENT_LIST',
                                            payload: {
                                                event_id: e.event_id,
                                                title: title,
                                                date: eventDate,
                                                time: !isAllDay? {
                                                    start: formatAMPM(new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTime.getHours(), startTime.getMinutes())), 
                                                    end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTime.getHours(), startTime.getMinutes() + duration)
                                                } : 'All day',
                                                repeating: repeatingRule? {
                                                    rule: repeatingRule,
                                                    end: endDate? endDate : null,
                                                } : null
                                            }
                                        });

                                        dispatcher({
                                            type: 'NEW_SNACKBAR',
                                            payload: {
                                              severity: 'success',
                                              message: 'Event Created Successfully'
                                            }
                                          });
                                    }, 
                                    (err) => {
                                        setLoadingState(false);
                                        dispatcher({type: 'NEW_SNACKBAR', payload: {severity: 'error', message: `Operation Failed ${err}`}})
                                    }
                                );
                            }} 
                            disabled={(
                                () => {
                                    try {
                                        if(title.length < 1 || title.length > 100) throw 'error';
                                        if(!eventDate) {
                                            throw 'error';
                                        }
                                        if(!isAllDay) {
                                            if(!startTime) throw 'error';
                                            if(duration < 5 || duration > 1440) throw 'error';
                                        } 
                                
                                        if(repeatingRule) {
                                            if(ends === 'on') {
                                                if(eventDate && new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() <= new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime()) throw 'error';
                                            }
                                            if(ends === 'after') {
                                                if(occurrences <= 1) throw 'error'
                                            }
                                        }
                                
                                        return false
                                
                                    }
                                    catch(err) {
                                        return true
                                    }
                                }
                            )()}
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<AddIcon />}>Create Event</LoadingButton>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </LocalizationProvider>
    </>
}

export default ADD_EVENT_FORM;