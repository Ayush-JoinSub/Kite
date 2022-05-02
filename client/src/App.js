import React, { useEffect, useState } from 'react';
import { getLTP, placeOrder, getProfile, getInstruments, getMargins, getLoginURL, getAccessToken } from './actions/actions';
import { Container, AppBar, Typography, Grow, Grid, Button, TextField, Card } from '@material-ui/core';
import Form from './components/Form';
import Stocks from './components/Stocks';
import Login from './components/LoginPage';
import Register from './components/Register';
import Home from './components/Home';
import LinkedinPage from './components/Linkedin/linkedin';
import { LinkedInPopUp } from 'react-linkedin-oauth2';
import Redirect from './components/Linkedin/redirect';
import Users from './components/Users';
import Navbar from './components/Navbar';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

import * as api from './api';
const App = () => {

    const redirectUrl = "https://www.google.com";
    const URLENCODE = "https%3A%2F%2Fwww.google.com";
    const clientId = "77j2mkfpbsr6tz";
    const clientSecret = "SPV58CYTixmjpIFB";
    const code = "AQSA-Vqz8Dm8nwuIi7VlzEbi2jruG4JAZrvioAd_s7wCaZA5Ar43-MjShv4Yp3zNAPSMQB6rPDOjAMZ8S7hf2xmLeIkxI9zOlGM-_gQMHEw7oklWCmhAlNchj3NxSy4vqeTqHvr2cBlqqp5qdlcqXfQ6xLjOb0xUiuR5CManwuuQ-d2N7mm3HxxN-xXWp8TnSdfL562semLlcmcnwqU";

    const url = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77j2mkfpbsr6tz&redirect_uri=https%3A%2F%2Fwww.google.com&state=foobar&scope=r_liteprofile%20r_emailaddress';

    //     const url = "curl -X POST https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=AQQXeawKfglLYZLC7oAOk23VOw19Vsa1nJch0iQrwznWCIjv3rauFNrfD-YNTchYmvsSaYSPo20FRois7DW7WaMp7jDn37Qb76Or4E7wicreeHHJDh4OzmZWENgdoWbe49iUcr6ADo11LA2Le1wCeirSosXL1Y4M4O9uwtitFapnshFurTJeaKihtC6Q7rgtUTJ3ysik8HFCM1hwvtg&redirect_uri=https://www.google.com&client_id=77j2mkfpbsr6tz&client_secret=SPV58CYTixmjpIFB \
    // -H 'Content-Type: application/x-www-form-urlencoded'"

    // POST https://www.linkedin.com/oauth/v2/accessToken HTTP/1.1 Content-Type: application/x-www-form-urlencoded grant_type=authorization_code code={AQR9iPbXzAoBlIu_3VVaJjB2Uy2YrATu3WFRPzTgFdPku58H-lSE9MIwZ757s4cnVD38ayXfdoBBisEFe9rD2XOlrB3mJtbmZ_RUMzMLM6l-B71WJvi2PTompUaYl4IY7IvP_FwTurslk7-0x02LycW3jHGqTZF0iQ7AP9fHHpuGouHx99X4YT7c-o7sGHV1oJvdH-oTosgotOiWRlQ} redirect_uri={https%3A%2F%2Fwww.google.com} client_id={77j2mkfpbsr6tz} client_secret={SPV58CYTixmjpIFB}

    const access_token = "AQVdZuzElHe4fU2mvlmA32W6exE3VEQ4YYVsMhnbbzp5eGJc1qa1tfDV4tbzl4wdiNOynq_BtWHWiOopKAvxg_HKzRMozywQ_cJgjUN3mZlGDH_4fvnSuxw9w0p-yMYeFn_krEsyfyyuiisFZFmva3pz2JIYIaa0KaevX8hIgC320Mlq_1PK8K3_XWCJHFnlK9cKeo0uLZCImX3CY_sLafTZFr1rVUf02M3pAZVUrPkjKN8sY4jV6oX8eYPC0tHwMbNxZ10xYot8Qia0cIEBzSuFrbY80q8hwbFmun4fEyPr2dr7bbrX2ZHEeIYSDli7VJDCKCS9u4zqJzRwoPqnr3yGPUce3A";

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/form" element={<Form />} />
                <Route path="/linkedin" element={<LinkedInPopUp />} />
                <Route path="/linkedinSignin" element={<LinkedinPage />} />
                <Route path="/redirect" element={<Redirect />} />
                <Route path="userDetails" element={<Users />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
