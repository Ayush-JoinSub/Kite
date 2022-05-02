import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Card } from '@material-ui/core';
import image from '../../images/linkedin.png';

const LinkedinPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const url = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77j2mkfpbsr6tz&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&state=foobar&scope=r_liteprofile%20r_emailaddress';

    const handleSuccess = () => {
        // navigate('/linkedin');
        window.open(url, "_blank", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30");
    }

    const handleFailure = (error) => {
        setCode("");
        setError(error.errorMessage);
    }

  return (
    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} >
        <Typography variant="h4" style={{marginBottom: 20, color: 'white'}}>Hello linkedin</Typography>
        <img src={image} alt="Log in with Linked In" style={{ maxWidth: '180px', cursor: 'pointer' }} onClick={handleSuccess}/>
    </div>
  )
}

export default LinkedinPage;