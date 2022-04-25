import React, { useState } from 'react'
import useStyles from '../styles';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Switch,
} from '@material-ui/core';
import { getQuote } from '../../../actions/actions';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      border: `1px ${theme.palette.common.white}`,
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px ${theme.palette.common.white}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.error.light,
  },
  checked: {},
}))(Switch);


const Title = ({ 
  tradingsymbol, 
  exchange, 
  lastPrice, 
  quantity, 
  transaction_type,
  setOrderData,
  setChecked,
  checked, 
  orderData,
  setGttOrder,
  gttOrder,
}) => {
  const [exchangeName, setExchangeName] = useState(exchange);
  const [price, setPrice] = useState(lastPrice);
  const classnames = useStyles();
  const [radioChecked, setRadioChecked] = useState(false);
  console.log(transaction_type);
  const ruppee = "\u20B9";
  const getLTPofParticularExchange = () => {
    // getQuote()
    //   .then((ltp) => {
    //     console.log(ltp);
    //     setPrice(ltp[tradingsymbol].last_price);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div style={{
        backgroundColor: checked ? '#0061d0' : '#f44336',
        borderTop: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
      }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 2, alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div >
            <text style={{ fontSize: 15, color: 'white' }} >{transaction_type}</text>
            <text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', margin: 4 }} >{tradingsymbol}</text>
            <text style={{ fontSize: 10, color: 'white' }}>{exchangeName}</text>
            <text style={{ fontWeight: 'bold', fontSize: 10, color: 'white', marginLeft: 8 }}> X </text>
            <text style={{ fontWeight: 'bold', fontSize: 15, color: 'white', marginLeft: 7 }}> {quantity} </text>
            <text style={{ fontWeight: 'bold', fontSize: 15, color: 'white', marginLeft: 2 }}> Qty </text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onChange={(e) => {
              setChecked(e.target.checked);
              !checked ? setOrderData({ ...orderData, transaction_type: 'BUY' }) : setOrderData({ ...orderData, transaction_type: 'SELL' });
              setGttOrder({ ...gttOrder, exchange: orderData.transaction_type });
            }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup row defaultValue="NSE" >
              <><FormControlLabel 
                  value="BSE" 
                  control={<Radio color="default" />}
                style={{ color: exchangeName == "BSE" ? 'white' : '#d9dad7' }}
                label={`BSE: ${ruppee} ${price}`}   
                  onChange={(e) => setExchangeName(e.target.value)} 
                />
                <FormControlLabel 
                  value="NSE" 
                  control={<Radio color="default" />} 
                  style={{ color: exchangeName == "NSE" ? 'white' : '#d9dad7' }}
                  label={`NSE: ${ruppee} ${price}`} 
                  onChange={(e) => setExchangeName(e.target.value) }
                /></>
            </RadioGroup>
          </FormControl>
        </div>
      </div>

    </div>
  );
};

export default Title;