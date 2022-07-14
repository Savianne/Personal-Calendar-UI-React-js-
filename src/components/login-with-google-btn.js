import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
const LOGIN_WITH_GOOGLE_BTN = ({authUrl}) => {

    const [url, setUrl] = useState(authUrl);

    const screen400 = useMediaQuery('(max-width:400px)');

    useEffect(() => {
        setUrl(authUrl);
    }, [authUrl])
    return <>
        <div id="custom-signin-w-google-btn" style={{display: 'flex', alignItems: 'center'}}
        onClick={() => {
            window.location = authUrl
        }}>
            <span className="goggle-logo" style={{display: 'flex', alignItems: 'center'}}>
                <img src="assets/images/google-logo.png" style={{width: '20px', height: '20px'}} alt="Google logo" />
            </span>
            {
                !screen400? <h1 style={{color: 'inherit', fontSize: '13px', fontWeight: 'normal', margin: '0 10px'}}>Login with Google</h1> : '' 
            }
        </div>
    </>
  }
  
  export default LOGIN_WITH_GOOGLE_BTN;