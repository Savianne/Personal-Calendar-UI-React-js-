import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

//Readux
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

//Components
import LOGO from './components/Logo';
import COLOR_SCHEME_MODE_TOGGLE from './components/color-scheme-toggle';
import PROFILE_TOGGLE from './components/profile-toggle';
import TODAYS_DATE from './components/todays-date';
import VERSE_OF_THE_DAY from './components/verse-of-the-day';
import CALENDAR from './components/calendar';
import SNACKBAR from './components/snackbar';
import ADD_EVENT_FORM from './components/add-event-form';
import EDIT_EVENT_FORM from './components/edit-event-form';
import BACKDROP_LOADING_INDICATOR from './components/backdrop-loading-indicator';
import LOGIN_WITH_GOOGLE_BTN from './components/login-with-google-btn';

//Controller
import getUserInfo from './controller/get-user-info';
import getAuthUrl from './controller/get-auth-url';

//Utils 
import eventsForTheMonth from './utils/event-of-the-month';
import localHolidaysAPIInverter from './utils/localHolidayAPIInverter';
import useMediaQuery from '@mui/material/useMediaQuery';
import { width } from '@mui/system';

function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');
  console.log(`(min-width:600px) matches: ${matches}`);
}

function App() {
  const user_auth = useSelector(state => state.userAuthReducer);

  const dispatcher = useDispatch();

  //Current Mode
  const mode = useSelector(state => state.themeModeReducer);

  //Edit Event Form
  const edit_event = useSelector(state => state.editEventFormReducer);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const screen515 = useMediaQuery('(max-width:515px)');
  const screen450 = useMediaQuery('(max-width:450px)');
  const screen1370 = useMediaQuery('(max-width:1370px)');

  const snackbarState = useSelector((state) => state.snackbarReducer);
  const bdli = useSelector((state) => state.backdropLoadingIndicatorReducer);

  const [user, setUser] = React.useState(null);
  const [authUrl, setAuthUrl] = React.useState(null);
  const [eventList, updateEventList] = React.useState([]);
  const [localHolidays, setLocalHolidays] = React.useState([]);
  const [addEventFormDrawer, setAddEventFormDrawer] = React.useState(false);

  React.useEffect(() => {
    setLocalHolidays('PH', 2021, (data) => setLocalHolidays(localHolidaysAPIInverter(data)));
  }, []);

  React.useEffect(() => {
    getUserInfo(
      (user) => {
        setUser(user);
        dispatcher({type: 'SET_AUTHENTICATED'});
      },
      () => {
        getAuthUrl(
          (auth_url) => {
            setAuthUrl(auth_url)
          },
          (err) => {
            console.log(err);
          }
        );
        dispatcher({type: 'SET_UNAUTHENTICATED'});
      }
    );
  }, [])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{paddingBottom: '150px'}}>
        {
          user_auth? <>
            <BACKDROP_LOADING_INDICATOR state={bdli} />
            <EDIT_EVENT_FORM state={edit_event} />
            <SNACKBAR 
            onclose={(state) => dispatcher({type: 'CLOSE_SNACKBAR'})}
            state={snackbarState.open} 
            severity={snackbarState.severity? snackbarState.severity : ''} 
            message={snackbarState.message? snackbarState.message :''} />

            {/* <NEW_EVENT_FORM /> */}
            <Box sx={{ display: 'flex', flex: '0 1 100%', flexWrap: 'wrap', height: 'fit-content', position: 'relative' }}>
              <Box sx={{ display: 'flex', flex: '0 1 100%',position: 'relative', alignItems: 'center', margin: '15px 0 25px 0', height: '50px', flexWrap: 'wrap'}}>
                <LOGO src='assets/images/app-logo.png' maxW={ screen1370? '150px' : '250px'} style={{position: 'absolute', top: 0}}/>
                <Box sx={{
                  marginLeft: 'auto', 
                  width: 'fit-content', 
                  height: 'fit-content', 
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  { screen515? '' : <COLOR_SCHEME_MODE_TOGGLE /> }
                  { screen515? '' : <Divider sx={{borderLeftWidth: '1.5px', marginLeft: '15px', marginRight: '15px'}} orientation="vertical" variant="middle" flexItem /> }
                  { user_auth === 'authenticated' && user? <PROFILE_TOGGLE avatar={user.picture} name={user.name} email={user.email}/> : authUrl? <LOGIN_WITH_GOOGLE_BTN authUrl={authUrl} /> : ''}
                </Box>
              </Box>
              {
                screen1370? '' : <>
                  <Box sx={{ 
                    position: 'sticky',
                    display: 'flex', 
                    marginTop: '60px', 
                    marginLeft: 'auto',
                    borderRadius: '5px','& > :not(style)': {
                      m: 1,
                      width: 400,
                      height: 'fit-content',
                    },
                  }}>
                    {
                      user_auth && user_auth == 'authenticated'? <ADD_EVENT_FORM /> : ''
                    }
                    
                  </Box>
                </>
              }
              {
                user_auth && user_auth == 'authenticated'? <>
                  {
                    screen1370? <>
                      {
                        !addEventFormDrawer? <>
                          <Paper elevation={10} sx={{display: 'flex', width: '80px', height: '80px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000}}
                          onClick={() => setAddEventFormDrawer(true)}>
                            <IconButton>
                              <AddIcon sx={{width: '60px', height: '60px'}} />
                            </IconButton>
                          </Paper>
                        </> : ''
    
                      }
                      <Drawer
                      open={addEventFormDrawer}
                      onClose={() => setAddEventFormDrawer(false)}>
                        <Box sx={{width: screen450? '100%' : '450px'}}>
                          <ADD_EVENT_FORM type="drawer" close={() => setAddEventFormDrawer(false)} />
                        </Box>
                      </Drawer>
                    </> : ''
                  }
                </> : ''
              }
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '900px',
                marginRight: 'auto',
                marginLeft: 'auto',
                height: 'fit-content',
              }}>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flex: '0 1 100%',
                  height: 'fit-content'
                }}>
                  <TODAYS_DATE />
                  <VERSE_OF_THE_DAY />
                </Box>
                <CALENDAR />
              </Box>
            </Box>
          </> : <>
              <Box sx={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center'}}>
                  <CircularProgress />
                  <Typography sx={{width: '100%', height: 'fit-content', textAlign: 'center', marginTop: '15px'}}>Checking Authentication...</Typography>
                </Box>
              </Box>
          </>
        }
      </Container>
    </ThemeProvider>
  );
}

export default App;
