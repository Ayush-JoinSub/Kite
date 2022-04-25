import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { TextField, Button, Typography, Paper, Card } from '@material-ui/core';
import axios from 'axios';
import { registerAction } from '../../actions/actions';


const Register = () => {
    const [cookies] = useCookies(["cookie-name"]);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        zerodhaID: '',
        username: '',
        email: '',
    })

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            const data = await registerAction(userData);
            console.log('response from the post request', data);
            if (data) {
                if (data.errors) {
                    const { email, zerodhaID } = data.errors;
                    if ( email) generateError(email);
                } else {
                    navigate("/stocks");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const classes = useStyles();
    return (
        <Card className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{'Enter Your Credentials'}</Typography>
                <TextField name="zerodhaID" variant="outlined" label="Zerodha ID" fullWidth value={userData.zerodhaID} onChange={(e) => setUserData({ ...userData, zerodhaID: e.target.value })} />
                <TextField name="username" variant="outlined" label="Username" fullWidth value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                <TextField name="email" variant="outlined" label="Email" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={() => setUserData({ ...userData })}>Submit</Button>
                
            </form>
            <ToastContainer />
        </Card>
        
    )
}

export default Register;
