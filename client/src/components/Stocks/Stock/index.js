import React from 'react';
import { TextField, Container, Typography, Paper, AppBar, Card, Grid } from '@material-ui/core';
import { Link } from 'react-router';
const Stock = ({ symbol, lastPrice, exchange }) => {
    return (
            <Card style={{margin: 10, padding: 15}} onClick={() => console.log(`clicked on ${symbol} card`)}>  
            <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{dispaly: "flex", flex: 1}}>
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
    );
};

export default Stock;