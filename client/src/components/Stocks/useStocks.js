import React, { useState, useEffect } from 'react';
import { getLTP, placeOrder, getProfile, getMargins, getAllInstruments, getQuote, placeBucketOrder } from '../../actions/actions';
const useStocks = () => {
    const [stocks, setStocks] = useState({});
    const [toggleModal, setToggleModal] = useState(false);
    const bucket = ["NSE:INFY", "NSE:PAYTM", "NSE:NYKAA", "NSE:ZOMATO", "NSE:YESBANK"];

    const bucketOrder = async () => {
        const data = await (placeBucketOrder(bucket));
        console.log(data);
    }

    const toggleModalHandler = () => {
        setToggleModal(prev => !prev);
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
    // }, 6000);
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
        toggleModalHandler,
        toggleModal,
    };
};

export default useStocks;
