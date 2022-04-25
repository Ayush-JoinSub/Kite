import React, { useState, useEffect } from 'react';
import useStyles from '../styles';
import {
    TextField,
    Button,
    Typography,
    Paper,
    FormControl,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormGroup,
    Checkbox,
    Line,
} from '@material-ui/core';

const GttOrder = ({ 
    lastPrice, 
    exchange, 
    transction_type, 
    quantity, 
    order_type, 
    product, 
    price, 
    tradingsymbol,
    gttOrder,
    setGttOrder, 
    disableTarget,
    setDisableTarget,
    disableStoploss,
    setDisableStoploss,
    target,
    setTarget,
    stoploss,
    setStoploss,
    handleSubmitGTT, 
}) => {

    console.log(disableTarget, disableStoploss);
    const [checkedStoploss, setCheckedStoploss] = useState(false);
    const [checkedTarget, setCheckedTarget] = useState(false);
    const classes = useStyles();

    return (
    <div style={{ 
            display: 'flex', 
            backgroundColor: 'white', 
            flex: 1, 
            padding: 20, 
            flexDirection: 'column',
            borderTop: '1px solid #e3e3e3',
        }}>
        <Typography style={{ marginRight: 20, fontSize: 15 }}>GTT Order</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmitGTT}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                            control={<Checkbox checked={checkedStoploss} color="primary" disabled={gttOrder.trigger_type == 'single'} onChange={(e) => {
                                setDisableStoploss(!e.target.checked);
                                setCheckedStoploss(prev => !prev);
                                }} name="Stoploss" />}
                        label="Stoploss" 
                    />
                    <TextField
                        name="stoploss"
                        variant="outlined"
                        type="number"
                        margin="normal"
                        label="Stoploss"
                        disabled={!checkedStoploss}
                        inputProps={{
                            step: "0.05",
                        }}
                        size="small"
                        fullWidth
                        value={stoploss}
                        onChange={(e) => { 
                            const value = lastPrice - (Math.abs(e.target.value) * lastPrice) / 100;
                            console.log(value);
                            setStoploss(e.target.value);
                        }}
                    />
                    <FormControlLabel
                            control={<Checkbox checked={checkedTarget} color="primary" disabled={gttOrder.trigger_type == 'single'} onChange={(e) => {
                                setDisableTarget(!e.target.checked);
                                setCheckedTarget(prev => !prev);
                                }} name="Target" />}
                        label="Target"
                    />
                    <TextField
                        name="target"
                        variant="outlined"
                        type="number"
                        margin="normal"
                        size="small"
                        disabled={!checkedTarget}
                        inputProps={{
                            step: "0.05",
                        }}
                        label="Target"
                        fullWidth
                        value={target}
                        onChange={(e) => {
                            const value = lastPrice + (Math.abs(e.target.value) * lastPrice)/100;
                            console.log(value);
                            setTarget(e.target.value); 
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={gttOrder.trigger_type}
                            onChange={(e) => {
                                setGttOrder({ ...gttOrder, trigger_type: e.target.value });
                                setCheckedStoploss(false);
                                setCheckedTarget(false);
                            }}
                            defaultValue="single"
                        >
                            <><FormControlLabel
                                value="single"
                                control={<Radio color="default" size="small" />}
                                style={{ color: gttOrder.trigger_type == 'single' ? 'black' : '#d9dad7' }}
                                label={`single`}
                            />
                                <FormControlLabel
                                    value="two-leg"
                                    size="small"
                                    control={<Radio color="default" size="small" />}
                                    style={{ color: gttOrder.trigger_type == 'two-leg' ? 'black' : '#d9dad7' }}
                                    label={`two-leg`}
                                /></>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </form>
    </div>
    )
}

export default GttOrder