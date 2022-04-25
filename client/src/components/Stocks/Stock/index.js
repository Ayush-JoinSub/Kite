import React, { useState } from 'react';
import { TextField, Container, Typography, Paper, AppBar, Card, Grid, Modal } from '@material-ui/core';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Form from '../../Form';
const Stock = ({ 
    symbol, 
    lastPrice, 
    exchange, 
    toggleModalHandler, 
    toggleModal,
    setStock,
 }) => {

    const navigate = useNavigate();


    const handleSelect = () => {
        console.log(symbol, lastPrice, exchange);
        setStock({
            tradingSymbol: symbol,
            exchange: exchange,
            lastPrice: lastPrice,
            transaction_type: 'BUY',
        });
        toggleModalHandler();
        // navigate('/form', {
        //     state: {
        //         tradingsymbol: symbol, exchange: exchange, lastPrice: lastPrice
        //     }
        // });
    };

    return (
        <>
            <Card style={{ margin: 10, padding: 15 }} onClick={handleSelect}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ dispaly: "flex", flex: 1 }}>
                        <Typography variant="h5" style={{ marginTop: '5px' }}>
                            {symbol}
                        </Typography>
                        <text style={{ marginTop: '2px', fontSize: '10px' }}>
                            {exchange}
                        </text>
                    </div>
                    <Typography variant="h5" style={{ marginTop: '5px' }}>
                        {lastPrice}
                    </Typography>
                </div>
            </Card>
        </>
        
    );
};

export default Stock;