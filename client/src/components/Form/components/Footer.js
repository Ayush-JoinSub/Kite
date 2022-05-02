import React from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
const Footer = ({
    checked, 
    setChecked,
    totalPrice,
    handleSubmitBuy,
    toggleModalHandler,
}) => {

    const allStorage = () => {

        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        console.log(keys);
        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        return values;
    }
    const values = allStorage();
  return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3e3e3', flex: 1, padding: 20, borderTop: '1px solid'}}>
        {localStorage.length !== 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', margin: 5, marginRight: 20}}>
                {values.map((value) => (
                    <div>
                        <text>{value}</text>
                    </div>
                ))}
            </div>
        ) : null}
          <div style={{ marginRight: 150, fontSize: 15 }}>
              <text>Margins Required = {totalPrice.toFixed(2)}</text>
          </div>
          <div style={{ marginLeft: 150, display: 'flex', flexDirection: 'row'}}>
              <div style={{ marginRight: 5 }} >
                  <Button variant="contained" color={checked ? 'primary' : 'secondary'} type="submit" onClick={() => console.log('Order is placed')}>
                      {checked ? 'BUY' : 'SELL'}
                  </Button>
              </div>
              <div style={{ marginLeft: 5 }} >
                  <Button variant="contained" color="default" type="cancel" onClick={toggleModalHandler}>Cancel</Button>
              </div>
          </div>
      </div>
  )
}

export default Footer