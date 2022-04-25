//import { FETCH_LTP, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';


export const registerAction = async (userData) => {
    try {
        const { data } = await api.register(userData);
        console.log('registeractions', data);
        return data;
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
export const placeOrderforMultipleUsers = async (orderParams) => {
    try {
        const users = JSON.parse(localStorage.getItem('users'));
        const dataArray = [];
        console.log(users);
        users.map(async (user) => 
            {
                console.log('user from actions', orderParams);
                const { data } = await api.multiUserorder(orderParams, user.access_token);
                dataArray.push(data)
            }
        );
        console.log(dataArray);
    } catch (err) {
        console.log(err);
    }
};

export const placeGTT = async (gttOrder) => {
    try {
        const { data } = await api.placeGTT(gttOrder);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getAccessToken = async (userID, requestToken) => {
    try {
        console.log('getAccessToken', requestToken);
        const { data } = await api.getAccessToken(userID, requestToken);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export const getLTP = async () => {
    try {
        const { data } = await api.fetchLtp();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const getQuote = async () => {
    try {
        const {data} = await api.fetchQuote();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const placeOrder = async (orderParams) => {
    try {
        const { data } = await api.placeOrder(orderParams);
    } catch (error) {
        console.log(error.message);
    }
};

export const placeBucketOrder = async (bucket) => {
    const ltp = await getLTP(bucket);
    const orderParams = [{}];
    Object.keys(ltp).forEach(async (key) => {
        const exchangeAndSymbol = key.split(':');
        key = key.toString();
        console.log(exchangeAndSymbol[0]);
        const order = {
            tradingsymbol: exchangeAndSymbol[1],
            exchange: exchangeAndSymbol[0],
            quantity: 1,
            price: ltp[key].last_price,
            order_type: "LIMIT",
            product: "CNC",
            transaction_type: "BUY"
        }
        orderParams.push(order);
    });
    try {
        console.log('orderParams', orderParams);
        const { data } = await api.placeBucketOrder(orderParams);
        return data;
    } catch (error) {
        console.log(error.message);
        return error;
    }
};

export const getProfile = async () => {
    try {
        const { data } = await api.getProfile();
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllInstruments = async (segment) => {
    try {
        const data = await api.getAllInstruments(segment);
        return data;
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getMargins = async () => {
    try {
        const response = await api.getMargins();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getLoginURL = async () => {
    try {
        const url = await api.getLoginURL();
        return url;
    } catch (error) {
        console.log(error);
    }
}