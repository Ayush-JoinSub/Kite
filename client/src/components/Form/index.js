import React, { useState, useEffect } from 'react';
import { 
    TextField,
    Button, 
    Typography, 
    Paper, 
    FormControl, 
    Radio, 
    FormControlLabel, 
    RadioGroup ,
} from '@material-ui/core';
import { 
    getLTP, 
    placeOrder, 
    getProfile, 
    getQuote, 
    placeOrderforMultipleUsers,
    placeGTT, 
} from '../../actions/actions';
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import useStyles from './styles';
import Title from './components/Title';
import Footer from './components/Footer';
import GttOrder from './components/GttOrder';

const Form = ({ tradingsymbol, lastPrice, exchange, toggleModalHandler, transaction_type }) => {

    const [orderData, setOrderData] = useState({
        tradingsymbol: tradingsymbol,
        exchange: exchange,
        quantity: 1,
        price: lastPrice,
        order_type: 'MARKET',
        product: 'CNC',
        transaction_type: transaction_type,
        triggerPrice: lastPrice,
    });
    console.log('form after being selected', orderData);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checked, setChecked] = useState(true);
    const [disableTextPrice, setDisableTextPrice] = useState(true);
    const [disableTextTriggerPrice, setDisableTextTriggerPrice] = useState(true);

    const [gttOrder, setGttOrder] = useState({
        trigger_type: 'single',
        tradingsymbol: orderData.tradingsymbol,
        exchange: orderData.exchange,
        last_price: lastPrice,
        trigger_price: [orderData.triggerPrice - 1],
        orders: [{
            transaction_type: orderData.transaction_type,
            quantity: orderData.quantity,
            product: orderData.product,
            order_type: orderData.order_type,
            price: orderData.price,
        }],
    });

    console.log(gttOrder);

    const [disableStoploss, setDisableStoploss] = useState(true);
    const [disableTarget, setDisableTarget] = useState(true);

    const [stoploss, setStoploss] = useState(-5);
    const [target, setTarget] = useState(5);

    useEffect(() => {
        const st = (orderData.price - ((Math.abs(stoploss) * orderData.price)) / 100).toFixed(2);
        const tg = (orderData.price + ((Math.abs(target) * orderData.price)) / 100).toFixed(2);
        setGttOrder({
            trigger_type: 'single',
            tradingsymbol: orderData.tradingsymbol,
            exchange: orderData.exchange,
            last_price: orderData.price,
            trigger_price: [gttOrder.trigger_type == 'single' ? null : st, gttOrder.trigger_type == 'single' ? null : tg],
            orders: [{
                transaction_type: orderData.transaction_type,
                quantity: orderData.quantity,
                product: orderData.product,
                order_type: orderData.order_type,
                price: orderData.price,
            }],
        });
    }, [orderData, stoploss, target]);

    useEffect(() => {
        
        if (orderData.order_type == 'LIMIT') {
            setDisableTextPrice(false);
            setDisableTextTriggerPrice(true);
        }
        else if (orderData.order_type == 'SL-M') {
            setDisableTextPrice(true);
            setDisableTextTriggerPrice(false);
        }
        else if (orderData.order_type == 'SL') {
            setDisableTextPrice(false);
            setDisableTextTriggerPrice(false);
        }
        else if(orderData.order_type == 'MARKET') {
            setDisableTextPrice(true);
            setDisableTextTriggerPrice(true);
        }
    }, [disableTextPrice, disableTextTriggerPrice, orderData.order_type]);

    const classes = useStyles();

    const handleSubmitGTT = (e) => {
        e.preventDefault();
        //console.log(e);
        getQuote()
            .then((ltp) => {
                const symbol = `${exchange}:${tradingsymbol}`;
                gttOrder.last_price = (ltp[symbol].last_price);
                placeGTT(gttOrder);
            })
            .catch((err) => {
                console.log(err);
            })
        
    };


    // const handleSubmitSell = (e) => {
    //     console.log(orderData);
    //     e.preventDefault();
    //     //console.log(e);
    //     getQuote()
    //         .then((ltp) => {
    //             orderData.price = (ltp[tradingsymbol].last_price)
    //             orderData.transaction_type = 'SELL';
    //             console.log(orderData);
    //             placeOrderforMultipleUsers(orderData);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    const handleSubmitBuy = (e) => {
        e.preventDefault();
        //console.log(e);
        getQuote()
            .then((ltp) => {
                console.log(ltp);
                orderData.price = (ltp[tradingsymbol].last_price)
                console.log('orderData in handleSubmitBuy', orderData);
                placeOrderforMultipleUsers(orderData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSubmitBuyOneOrder = async (e) => {
        e.preventDefault();
        //console.log(e);
        getQuote()
            .then((ltp) => {
                const symbol = `${exchange}:${tradingsymbol}`;
                console.log('handleSubmitBuyOneOrder', symbol);
                orderData.price = (ltp[symbol].last_price);
                console.log(orderData);
                placeOrder(orderData);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    return (
        <Paper className={classes.paper}>
            <Title 
                tradingsymbol={orderData.tradingsymbol} 
                exchange={orderData.exchange} 
                lastPrice={orderData.price} 
                quantity={orderData.quantity} 
                transaction_type={orderData.transaction_type}
                setChecked={setChecked}
                checked={checked}
                setGttOrder={setGttOrder}
                gttOrder={gttOrder}
                setOrderData={setOrderData}
                orderData={orderData}
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>
                <FormControl component="fieldset">
                    <RadioGroup row value={orderData.product} onChange={(e) => setOrderData({ ...orderData, product: e.target.value })} defaultValue="CNC">
                        <><FormControlLabel
                            value="MIS"
                            size="small"
                            control={<Radio color="default" size="small" />}
                            style={{ color: orderData.product == 'MIS' ? 'black' : '#d9dad7' }}
                            label={`Intraday  MIS`}
                        />
                            <FormControlLabel
                                value="CNC"
                                size="small"
                                control={<Radio color="default" size="small" />}
                                style={{ color: orderData.product == 'CNC' ? 'black' : '#d9dad7' }}
                                label={`Longterm  CNC`}
                            /></>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={orderData.product == 'MIS' ?  handleSubmitBuyOneOrder : handleSubmitGTT}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <TextField 
                        name="quantity" 
                        variant="outlined" 
                        type="number" 
                        margin="normal" 
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                        }} 
                        label="Quantity" 
                        fullWidth 
                        value={orderData.quantity} 
                        onChange={(e) => { setTotalPrice(e.target.value * orderData.price); setOrderData({ ...orderData, quantity: e.target.value }); setGttOrder({ ...gttOrder, quantity: orderData.quantity }); }} 
                    />
                    <TextField 
                        name="Price" 
                        variant="outlined" 
                        label="Price" 
                        margin="normal" 
                        fullWidth
                        type="number"
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                        }} 
                        disabled={disableTextPrice}
                        value={disableTextPrice ? 0 : orderData.price} 
                        onChange={(e) => setOrderData({ ...orderData, price: e.target.value })}
                    />
                    <TextField 
                        name="triggerPrice" 
                        variant="outlined" 
                        label="triggerPrice" 
                        fullWidth 
                        type="number"
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                        }} 
                        disabled={disableTextTriggerPrice}
                        value={disableTextTriggerPrice ? 0 : orderData.triggerPrice} 
                        onChange={(e) => setOrderData({ ...orderData, triggerPrice: e.target.value })}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignItems: 'center', marginLeft: 200 }}>
                    <div>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                value={orderData.order_type}
                                onChange={(e) => {
                                    setOrderData({ ...orderData, order_type: e.target.value });
                                }}
                                defaultValue="MARKET"
                            >
                                <><FormControlLabel
                                    value="MARKET"
                                    control={<Radio color="default" size="small" />}
                                    style={{ color: orderData.order_type == 'MARKET' ? 'black' : '#d9dad7' }}
                                    label={`Market`}
                                    
                                />
                                    <FormControlLabel
                                        value="LIMIT"
                                        size="small"
                                        control={<Radio color="default" size="small" />}
                                        style={{ color: orderData.order_type == 'LIMIT' ? 'black' : '#d9dad7' }}
                                        label={`Limit`}
                                    /></>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignItems: 'center', marginLeft: 70 }}>
                    <div>
                        <FormControl component="fieldset">
                            <RadioGroup 
                                row 
                                value={orderData.order_type} 
                                onChange={(e) => {
                                    setOrderData({ ...orderData, order_type: e.target.value });
                                    }}
                            >
                                <><FormControlLabel
                                    value="SL"
                                    control={<Radio color="default" size="small" />}
                                    style={{ color: orderData.order_type == 'SL' ? 'black' : '#d9dad7' }}
                                    label={`SL`}
                                />
                                    <FormControlLabel
                                        value="SL-M"
                                        size="small"
                                        control={<Radio color="default" size="small" />}
                                        style={{ color: orderData.order_type == 'SL-M' ? 'black' : '#d9dad7' }}
                                        label={`SL-M`}
                                    /></>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div style={{marginTop: 30 , display: 'flex', flex: 1, flexDirection: 'column'}}>
                    <div>
                        {orderData.product === "CNC" ? 
                            <GttOrder
                                lastPrice={lastPrice}
                                exchange={orderData.exchange}
                                transaction_type={orderData.transaction_type}
                                quantity={orderData.quantity}
                                order_type={orderData.order_type}
                                product={orderData.product}
                                price={orderData.price}
                                tradingsymbol={orderData.tradingsymbol}
                                gttOrder={gttOrder}
                                setGttOrder={setGttOrder}
                                disableTarget={disableTarget}
                                setDisableTarget={setDisableTarget}
                                disableStoploss={disableStoploss}
                                setDisableStoploss={setDisableStoploss}
                                target={target}
                                setTarget={setTarget}
                                stoploss={stoploss}
                                setStoploss={setStoploss}
                                handleSubmitGTT={handleSubmitGTT}
                                
                            /> : null}
                    </div>
                    <Footer
                        totalPrice={totalPrice}
                        checked={checked}
                        setChecked={setChecked}
                        handleSubmitBuy={handleSubmitBuyOneOrder}
                        toggleModalHandler={toggleModalHandler}
                    />
                </div>
            </form>

            </div>
        </Paper>
    );
};

export default Form;