import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { getLTP, placeOrder, getProfile, getQuote, placeOrderforMultipleUsers } from '../../actions/actions';

import useStyles from './styles';

const Form = () => {
    const [orderData, setOrderData] = useState({
        tradingsymbol: 'YESBANK',
        exchange: '',
        quantity: 0,
        price: 0,
        order_type: '',
        product: '',
        transaction_type: ''
    });

    const classes = useStyles();
    const clear = () => {
        getQuote()
            .then((ltp) => {
                orderData.price = (ltp['NSE:YESBANK'].last_price)
                orderData.transaction_type = 'SELL';
                console.log(orderData);
                placeOrder(orderData);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleSubmitSell = (e) => {
        console.log(orderData);
        e.preventDefault();
        //console.log(e);
        getQuote()
            .then((ltp) => {
                orderData.price = (ltp['NSE:YESBANK'].last_price)
                orderData.transaction_type = 'SELL';
                console.log(orderData);
                placeOrderforMultipleUsers(orderData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSubmitBuy = (e) => {
        e.preventDefault();
        //console.log(e);
        getQuote()
            .then((ltp) => {
                console.log(ltp);
                orderData.price = (ltp['NSE:YESBANK'].last_price)
                orderData.transaction_type = 'BUY';
                console.log('orderData in handleSubmitBuy', orderData);
                placeOrderforMultipleUsers(orderData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e);
        getQuote()
            .then((ltp) => {
                orderData.price = (ltp['NSE:YESBANK'].last_price);
                console.log(orderData);
                placeOrder(orderData);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{'Place your order'}</Typography>
                <TextField name="Exchange" variant="outlined" label="Exchange" fullWidth value={orderData.exchange} onChange={(e) => setOrderData({ ...orderData, exchange: e.target.value })} />
                <TextField name="quantity" variant="outlined" label="Quantity" fullWidth value={orderData.title} onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })} />
                <TextField name="order_type" variant="outlined" label="Order_type" fullWidth value={orderData.order_type} onChange={(e) => setOrderData({ ...orderData, order_type: e.target.value })} />
                <TextField name="product" variant="outlined" label="Product" fullWidth value={orderData.product} onChange={(e) => setOrderData({ ...orderData, product: e.target.value })} />

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={() => setOrderData({ ...orderData, transaction_type: "BUY" })}>BUY</Button>
                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={clear}>SELL</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmitBuy}>BUY MU</Button>
                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={handleSubmitSell}>SELL MU</Button>
                </div>
            </form>
        </Paper>
    );
};

export default Form;