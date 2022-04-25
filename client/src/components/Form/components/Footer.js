import React from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
const Footer = ({
    checked, 
    setChecked,
    totalPrice,
    handleSubmitBuy,
    toggleModalHandler,
}) => {
  return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3e3e3', flex: 1, padding: 20, borderTop: '1px solid'}}>
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