import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { getLoginURL, getAccessToken } from '../../actions/actions';
import { useNavigate } from 'react-router-dom';

//import useStyles from './styles';

const Login = () => {
    const navigate = useNavigate();
    const [requestToken, setRequestToken] = useState('');
    //const classes = useStyles();

    const handleSubmitZerodha = () => {
        getLoginURL();
    }

    const getUserAccess = async () => {
        const data = await getAccessToken('UE9180', requestToken);
        console.log('getUserAccess', data);
        var users = JSON.parse(localStorage.getItem('users')) || [];

        if (!(users.find((user) => user.userId == data.userId)))
            users.push(data);

        localStorage.setItem('users', JSON.stringify(users));
        console.log('getUserAccess user otput from localStorage', localStorage.getItem('users'));
        navigate('/register');
    }

    const handleSubmitUpstox = () => {
        getLoginURL();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
            <Typography variant="h5" style={{ marginBottom: '10px', color: 'white' }}>Login using</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}>

                <Button style={{
                    marginBottom: 10,
                    margin: 10,
                    backgroundColor: '#E8630A',
                }} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmitZerodha}>Login with Zerodha</Button>

                <Button style={{
                    marginBottom: 10,
                    margin: 10,
                    backgroundColor: '#E8630A',
                }} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmitUpstox}>Login with Upstox</Button>

            </div>
            <div>
                <TextField name="requestToken" placeholder="Enter the Request Token" color="primary" variant="outlined" label="Request Token" fullWidth value={requestToken} onChange={(e) => setRequestToken(e.target.value)} />
                <Button style={{ display: 'flex', alignItems: 'center', margin: 10, justifyContent: 'center', backgroundColor: '#E8630A', }} variant="contained" color="secondary" size="large" type="submit" onClick={getUserAccess}>Access Token</Button>
            </div>
        </div>
    );
}

export default Login;