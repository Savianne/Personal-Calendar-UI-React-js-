import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const VERSE_OF_THE_DAY = () => {
    return <>
        <Box sx={{width: '300px', marginLeft: 'auto'}}>
                <Typography sx={{ fontSize: '1em', fontWeight: 'bold', color: 'rgb(143, 170, 220)', textAlign: 'right' }}>VERSE OF THE DAY</Typography>
                <Typography sx={{fontWeight: 'bold', textAlign: 'right'}}>John 16:13</Typography>
                <Typography sx={{fontSize: '12.5px', fontWeight: 'light', textAlign: 'justify'}}> "In the world you will have tribulation. But take heart; I have overcome the world."</Typography>
        </Box>
    </>
}

export default VERSE_OF_THE_DAY;