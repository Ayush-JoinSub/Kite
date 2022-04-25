import React, { useEffect, useState } from 'react';
import { getLTP, placeOrder, getProfile, getInstruments, getMargins, getLoginURL, getAccessToken } from './actions/actions';
import { Container, AppBar, Typography, Grow, Grid, Button, TextField, Card } from '@material-ui/core';
import Form from './components/Form';
import Stocks from './components/Stocks';
import Login from './components/LoginPage';
import Register from './components/Register';
import Home from './components/Home';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as api from './api';
const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/register" element={<Register /> }/>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/stocks" element={<Stocks />} />
                <Route exact path="/form" element={<Form />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
