import React, { useState, useEffect, setTimeout } from 'react';
import { TextField, Container, Typography, Paper, AppBar, Card, Button } from '@material-ui/core';
import useStocks from './useStocks';
import { getLTP, placeOrder, getProfile } from '../../actions/actions';
import Stock from './Stock';
const Stocks = () => {
    // const [stocks, setStocks] = useState({});
    // const [lastPrice, setLastPrice] = useState(0);
    // setTimeout(() => {
    //     getLTP()
    //         .then((res) => setStocks(res))
    //         .catch((err) => console.log(err));
    // }, 3000);
    // setLastPrice(stocks["NSE:INFY"].last_price);
    const { 
        stocks,
        bucketOrder
    } = useStocks();

    // const eachStock = () => (
    //     Object.keys(stocks).map((stock) => (
    //         <Stock lastPrice={stock.last_price} symbol={"INFY"} exchange={"NSE"} />
    //         )
    //     )
    // );

    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
            {Object.keys(stocks).map((stock) => {
                const symbolAndExchange = stock.split(':');
                const key = stock.toString();
                return (<Stock lastPrice={stocks[key].last_price} symbol={symbolAndExchange[1]} exchange={symbolAndExchange[0]} />)
            })}

            <Card style={{ margin: 10, padding: 15 }} onClick={bucketOrder}>
                <Typography variant="h5" style={{ display: 'flex', marginTop: '5px', alignItem: 'center', justifyContent: 'center' }}>
                    Bucket Order
                </Typography>
            </Card>
        </Container>
    )
}

export default Stocks;