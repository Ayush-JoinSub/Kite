import React, { useEffect, useState } from 'react';
import { getLTP, placeOrder, getProfile, getInstruments, getMargins, getLoginURL, getAccessToken } from './actions/actions';
import { Container, AppBar, Typography, Grow, Grid, Button, TextField } from '@material-ui/core';
import Form from './components/Form';
import Stocks from './components/Stocks';

import * as api from './api';
const App = () => {
    // getLoginURL();
    // console.log(getMargins());
    const [requestToken, setRequestToken] = useState('');
    
    const loginUrl = () => {
        getLoginURL();
    }
    // console.log('request token', requestToken);
    const getUserAccess = async () => {
        const data = await getAccessToken('UE9180', requestToken);
        console.log('getUserAccess', data);
        var users = JSON.parse(localStorage.getItem('users')) || [];
    
        if(!(users.find((user) => user.userId == data.userId)))
            users.push(data); 
        
        localStorage.setItem('users', JSON.stringify(users));
        console.log('getUserAccess user otput from localStorage', localStorage.getItem('users'));
    }

    
    
    return (
        <Container>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Form />
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 10}}>
                                <Button style={{ display: 'flex', alignItems: 'center' }} variant="contained" color="secondary" size="large" type="submit" onClick={loginUrl}>Login Page</Button>
                                <div>
                                    <TextField name="requestToken" placeholder="Enter the Request Token" variant="outlined" label="Request Token" fullWidth value={requestToken} onChange={(e) => setRequestToken(e.target.value)} />
                                    <Button style={{ display: 'flex', alignItems: 'center', margin: 10, justifyContent: 'center'}} variant="contained" color="secondary" size="large" type="submit" onClick={getUserAccess}>Access Token</Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stocks />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;
