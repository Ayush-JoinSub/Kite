import React, { useState, useEffect } from 'react';
import { getLTP, placeOrder, getProfile, getMargins, getAllInstruments, getQuote, placeBucketOrder } from '../../actions/actions';
const useStocks = () => {
    const [stocks, setStocks] = useState({});

    const bucket = ["NSE:INFY", "NSE:PAYTM", "NSE:NYKAA", "NSE:ZOMATO", "NSE:YESBANK"];

    const bucketOrder = async () => {
        const data = await (placeBucketOrder(bucket));
        console.log(data);
    }

    // getMargins()
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // setInterval(() => {
    //         getLTP()
    //             .then((ltp) => {
    //                 setStocks(ltp);
    //             })
    //             .catch(err => console.log(err));
    // }, 60000);
    useEffect(() => {
        getQuote()
            .then((ltp) => {
                setStocks(ltp);
                console.log(ltp);
            })
            .catch(err => console.log(err));
    }, []);
    return {
        stocks,
        bucketOrder,
    };
};

export default useStocks;
