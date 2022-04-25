import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Card } from '@material-ui/core';
import useStyles from './styles';
const Home = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const login = () => {
    navigate('/login');
  }

  return (
    <div>
      <h1>Home</h1>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={login}>Start</Button>
    </div>
  )
}

export default Home