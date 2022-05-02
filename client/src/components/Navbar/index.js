import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
const Navbar = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
        if (newValue == 0) navigate('/stocks');
        if (newValue == 1) {
            localStorage.clear();
            navigate('/userDetails');
        };
    };

  return (
    <React.Fragment>
        <AppBar position="static">
            <Toolbar>
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Stocks" />
                        <Tab label="Users" />
                    </Tabs>
            </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}

export default Navbar