import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';

//Redux
import { useSelector } from 'react-redux';

//Components
import COLOR_SCHEME_MODE_TOGGLE from './color-scheme-toggle';
import LOGIN_WITH_GOOGLE_BTN from './login-with-google-btn';

const PROFILE_TOGGLE = ({avatar}) => {

    const screen515 = useMediaQuery('(max-width:515px)');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Box sx={{
            border: (theme) => `4px solid ${theme.palette.divider}`,
            width: 'fit-content',
            height: 'fit-content',
            borderRadius: '50%',
            cursor: 'pointer'
        }}
        onClick={handleClick}>
            <Avatar sx={{ width: 35, height: 35 }} alt="Mark Baylon" src={avatar} />
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Box sx={{display: 'flex', flexWrap: 'wrap', width: '250px', height: 'fit-content', padding: '15px', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', flex: '0 1 100%', height: 'fit-content', alignItems: 'center', paddingBottom: '10px',border: (theme) => `1px solid ${theme.palette.divider}`, borderTopWidth: 0, borderLeftWidth: 0,borderRightWidth: 0}}>
                    <Box sx={{
                        border: (theme) => `2px solid ${theme.palette.divider}`,
                        width: 'fit-content',
                        height: 'fit-content',
                        borderRadius: '50%',
                        marginRight: '15px',
                    }}>
                        <Avatar sx={{width: 35, height: 35}} alt="avatar" src={avatar} />
                    </Box>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', height: 'fit-content'}}>
                        <Typography sx={{flex: '0 1 100%', fontSize: '15px'}}>Mark Nino Baylon</Typography>
                        <Typography sx={{flex: '0 1 100%', fontSize: '11px'}}>www.ninzxky@gmail.com</Typography>
                    </Box>
                </Box>
                { screen515? <COLOR_SCHEME_MODE_TOGGLE /> : '' }
                <Box sx={{display: 'flex', flex: '0 1 100%', justifyContent: 'center', height: 'fit-content', alignItems: 'center', paddingTop: '10px',border: (theme) => `1px solid ${theme.palette.divider}`, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}>
                    <Button size="small" variant="outlined" startIcon={<LogoutIcon />} onClick={() => window.location = '/logout.php'}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </Menu>
    </>
}

export default PROFILE_TOGGLE;