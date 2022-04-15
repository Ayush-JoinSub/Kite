import axios from 'axios';
import KiteConnect from 'kiteconnect/';

// https://kite.zerodha.com/connect/login?v=3&api_key=bmy0rym28xrmp6d2


const root_url = 'http://localhost:5005';

export const fetchLtp = () => axios.get(`${root_url}/ltp`);

// export const placeOrderMultileUser = () => axios.post()

export const getAccessToken = (userID, requestToken) => axios.post(`${root_url}/user`, { requestToken: requestToken, userID: userID });

export const multiUserorder = (orderParams, access_token) => axios.post(`${root_url}/ordermultipleUser`, {orderParams: orderParams, access_token: access_token})

export const fetchQuote = () => axios.get(`${root_url}/quote`);

export const placeOrder = (orderParams) => axios.post(`${root_url}/order`, orderParams);

export const placeBucketOrder = (ordersParams) => axios.post(`${root_url}/bucketOrder`, ordersParams);

export const getProfile = () => axios.get(`${root_url}/profile`);

export const getAllInstruments = (segment) => axios.get(`${root_url}/instruments`, segment);

export const getMargins = () => axios.get(`${root_url}/margins`);

export const getLoginURL = () => axios.get(`${root_url}/login`);