import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import KiteConnect from 'kiteconnect';
import opn from 'opn';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import cookieParser from 'cookie-parser';
import Redis from 'redis';

const DEFAULT_EXPIRATION = 3600*24;

const redisClient = Redis.createClient({ url: 'redis://127.0.0.1:6379' });

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

const CONNECTION_URL = 'mongodb+srv://AyushPandey:Ayush%40303@cluster0.jny52.mongodb.net/kiteDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5005;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Server Running on Port: http://localhost:${PORT} and database is connected`))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(cookieParser());
app.use('/', authRoutes);
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

var Kiteconnect = KiteConnect.KiteConnect;
var jsonencoder = bodyParser.json();

dotenv.config();

var kc = new Kiteconnect({
    api_key: "bmy0rym28xrmp6d2"
});

//https://kite.zerodha.com/connect/login?v=3&api_key=bmy0rym28xrmp6d2

// kc.access_token = "e8gl7Bsdi9otyhWlPdNVZz0vsX5fNUu3";

// var KiteTicker = KiteConnect.KiteTicker;
// var ticker = new KiteTicker({
//     api_key: kc.api_key,
//     access_token: kc.access_token
// });

// ticker.connect();
// ticker.on("ticks", onTicks);
// ticker.on("connect", subscribe);

// function onTicks(ticks) {
//     console.log("Ticks");
// }

// function subscribe() {
//     var items = [738561, 408065, 1675521, 1716481, 3050241, 1304833];
//     ticker.subscribe(items);
//     ticker.setMode(ticker.modeFull, items);
// }

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


const addUserAndAccessToken = (user, userId, access_token) => {
    return new Promise((resolve, reject) => {
        redisClient.connect();
        redisClient.HSET(user, {[userId] : access_token}, (err, reply) => {
            if(err) {
                reject(err);
            } else {
                resolve(reply);
                console.log(reply);
            }
        })
    })
};

app.get('/login', (req, res) => {
    try {
        opn(kc.getLoginURL());
    } catch (error) {
        console.log(error);
    }
})

app.post('/allusersorder', (req,res) => {
    redisClient.connect();
    const orderParams = req.body.orderParams;
    const userId = req.body.userId;
    
    redisClient.HGET(user, userId, function (err, obj) {
        kc.access_token = obj;
        console.log(obj);
    });
    kc.placeOrder(kc.VARIETY_REGULAR, orderParams)
        .then(function (response) {
            console.log(response);
            res.send(response);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
});

app.post('/user', (req, res) => {
    console.log(req.body);
    try {
        kc.generateSession(req.body.requestToken, "f65ng4eoizttzkxq09g8g6lxkzlr3tjj")
            .then(async function (response) {
                res.send({
                    userId: req.body.userID,
                    access_token: kc.access_token,
                });
                
                let result = await redisClient.HSET('user', req.body.userID, kc.access_token)
                console.log(result);
            })
            .catch(function (err) {
                console.log(err);
            });
    } catch (error) {
        console.log(error.message);
    }
});
app.get('/ltp', async (req, res) => {
    await redisClient.connect();
    // const access_token = redisClient.get('access-token');
    // const id = redisClient.get('userID');
    // console.log(access_token);
    // console.log(id);
    kc.getLTP(["NSE:INFY", "NSE:PAYTM", "NSE:NYKAA", "NSE:ZOMATO", "NSE:YESBANK"])
        .then(function (response) {
            res.send(response);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
});

app.get('/quote', (req, res) => {
    kc.getQuote(["NSE:INFY", "NSE:PAYTM", "NSE:NYKAA", "NSE:ZOMATO", "NSE:YESBANK"])
        .then(function (response) {
            res.send(response);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
});

app.post('/order', (req, res) => {
    const orderParams = req.body;
    console.log(orderParams);
    kc.placeOrder(kc.VARIETY_REGULAR, orderParams)
        .then(function (response) {
            console.log(response);
            res.send(response);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
});

app.post('/bucketOrder', (req, res) => {
    const ordersParams = req.body;
    console.log(ordersParams);
    ordersParams.map((orderParams) => {
        setTimeout(() => {
            kc.placeOrder(kc.VARIETY_REGULAR, orderParams)
                .then(function (response) {
                    console.log(response);
                    res.send(response);
                }).catch(function (err) {
                    console.log(err);
                    res.send(err);
                });
        }, 2000);
    })
});

app.post('/ordermultipleUser', (req, res) => {
    const orderParams = req.body.orderParams;
    kc.access_token = req.body.access_token;
    console.log(kc);
    console.log(orderParams);
    kc.placeOrder(kc.VARIETY_REGULAR, orderParams)
        .then(function (response) {
            console.log(response);
            res.send(response);
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
});

app.get('/profile', (req, res) => {
    kc.getLoginURL();
});

app.get('/instruments', (rew, res) => {
    kc.getInstruments("NSE")
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/margin', (req, res) => {
    kc.getMargins("equity")
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/gtt', (req, res) => {
    console.log('consoling request body', req.body);
    const gttOrder = req.body;
    const triggerType = gttOrder.trigger_type == 'single' ? kc.GTT_TYPE_SINGLE : kc.GTT_TYPE_OCO;
    console.log('gtt order placement', gttOrder);
    const params = {
        trigger_type: triggerType,
        tradingsymbol: gttOrder.tradingsymbol,
        exchange: gttOrder.exchange,
        last_price: gttOrder.last_price,
        trigger_values: gttOrder.trigger_price,
        orders: gttOrder.orders,
    }
    kc.placeGTT(params)
        .then((response) => {
            console.log(response);
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
});