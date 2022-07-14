import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const TODAYS_DATE = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    return <>
        <Box sx={{
            display: 'flex',
            minWidth: '300px',
            flexDirection: 'column',
            width: 'fit-contenet',
            height: 'fit-content',
            marginBottom: '15px'
        }}>
            <Box sx={{display: 'flex',}}>
                <Typography sx={{ fontSize: '1em' }}>TODAY IS</Typography>
                <Typography sx={{marginLeft: '5px',  fontSize: '1em', fontWeight: 'bold', color: 'rgb(143, 170, 220)' }}>{days[today.getDay()].toLocaleUpperCase()}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography sx={{ fontSize: '4em', lineHeight: 1.3}}>{today.getDate()}</Typography>
                <Divider sx={{borderLeftWidth: '1.5px', marginLeft: '20px', marginRight: '20px'}} orientation="vertical" variant="middle" flexItem />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography sx={{ fontSize: '1.4em', lineHeight: '1.2' }}>{months[today.getMonth()]}</Typography>
                    <Typography sx={{ fontSize: '2em', fontWeight: 'bold', lineHeight: '1.2' }}>{today.getFullYear()}</Typography>
                </Box>
            </Box>
        </Box>
    </>
}

export default TODAYS_DATE;