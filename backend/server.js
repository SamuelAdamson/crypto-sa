// Backend Server for Crypto -- 
// Author: Samuel Adamson
const express = require('express');
const app = express();
// Axios for API Data
const axios = require('axios');
// Environment Variables
const dotenv = require('dotenv');
const { request } = require('express');
dotenv.config();
// Helper Functions
const helper = require('./helper');

// Store port
PORT = process.env.PORT;

/* Handle Request for Total Market Cap Data 
    -- Makes request to CoinGecko
    -- Responds with Total Market Cap */
app.get('/totalCap', (req, res) => {
    // Get start/end date for market cap
    let startDate = helper.totalCapDate();
    // Request URL
    let totalCapURL = 'https://api.coingecko.com/api/v3/global';
    
    // Make Request
    axios
        .get(totalCapURL)
        .then(response => {
            // Store Response body
            let body = response['data'];

            // Check not null
            if(body) {
                // Store Total Crypto Market cap in usd
                let totalCap = body['data']['total_market_cap']['usd'];
                
                //Send response, log success
                let totalCapRes = helper.toShort(totalCap);
                res.send(totalCapRes); // Send array
                console.log('Total Cap Response Success!');
            } else { // Log Error
                console.log('Null Response');
                res.send(0);
            }
        })
        .catch(function (error) { // Error in response
            // Log Error, Send 0 response
            console.log(error);
            res.send(0);
        });
});


/* Handle Request for Ethereum,Bitcoin,Binance Current Price
    -- Makes request to CoinGecko
    -- Responds with Ethereum,Bitcoin,Binance Prices to 2 decimals */
app.get('/tickers', (req, res) => {
    // Set Ticker
    let tick = 'ethereum%2Cbitcoin%2Ccardano';
    // API Url
    let tickURL = `https://api.coingecko.com/api/v3/simple/price?ids=${tick}&vs_currencies=usd`;

    // Make Request
    axios
        .get(tickURL)
        .then(response => {
            // Store Response body
            let body = response['data'];

            // Check not null
            if(body){
                // Store tickers
                let tickers = {};

                // Store tickers
                tickers['eth'] = body['ethereum']['usd'];
                tickers['btc'] = body['bitcoin']['usd'];
                tickers['ada'] = body['cardano']['usd'];

                res.send(tickers);
                console.log('Tickers Response Success!');
            } else { // Null Response, log and send 0
                console.log('Null Response!');
                res.send({
                    eth: 0,
                    btc: 0,
                    ada: 0
                })
            }
        })
        .catch(function (error) { // Error in response
            // Log Error, Send 0 response
            console.log(error);
            res.send({
                eth: 0,
                btc: 0,
                ada: 0
            });
        });
});


/* Handle Request for Ethereum Detailed Data
    -- Makes request to CoinGecko
    -- Responds with Ethereum Details */
app.get('/ethereum', (req,res) => {
    // ID
    let ID = 'ethereum';
    // API Url
    let ethURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ID}`;

    // Make API Request
    axios
        .get(ethURL)
        .then(response => {
            // Store body of response
            body = response['data'][0];

            // Check not null
            if(body) {
                // Create response object
                let marketData = {}
                
                // Store normal values
                marketData['price'] = helper.trim(body['current_price']);
                marketData['high'] = helper.trim(body['high_24h']);
                marketData['low'] = helper.trim(body['low_24h']);
                marketData['ath'] = helper.trim(body['ath']);
                marketData['atl'] = helper.trim(body['atl']);

                // Store special values
                marketData['marketCap'] = helper.toShort(body['market_cap']);
                marketData['volume'] = helper.toShort(body['total_volume']);
                marketData['supply'] = helper.toShort(body['circulating_supply']);
                marketData['maxSupply'] = helper.toShort(body['max_supply']);
                marketData['change24'] = helper.changeMod(body['price_change_percentage_24h']);

                // Send response, and log success
                res.send(marketData);
                console.log('Ethereum Response Success!');
            } else {
                // Log Error, send 0 response
                console.log('Null Response!');
                res.send({
                    price: 0, marketCap: 0, volume: 0, change24: 0,
                    high: 0, low: 0, supply: 0,
                    ath: 0, atl: 0, maxSupply: 0
                });    
            }
        })
        .catch(function (error) {
            // Log Error, send 0 response
            console.log(error);
            res.send({
                price: 0, marketCap: 0, volume: 0, change24: 0,
                high: 0, low: 0, supply: 0,
                ath: 0, atl: 0, maxSupply: 0
            });
        });
});


/* Handle Request for Bitcoin Detailed Data
    -- Makes request to CoinGecko
    -- Responds with Bitcoin Details */
app.get('/bitcoin', (req,res) => {
    // ID
    let ID = 'bitcoin';
    // API Url
    let ethURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ID}`;

    // Make API Request
    axios
        .get(ethURL)
        .then(response => {
            // Store body of response
            body = response['data'][0];

            // Check not null
            if(body) {
                // Create response object
                let marketData = {}
                
                // Store normal values
                marketData['price'] = helper.trim(body['current_price']);
                marketData['high'] = helper.trim(body['high_24h']);
                marketData['low'] = helper.trim(body['low_24h']);
                marketData['ath'] = helper.trim(body['ath']);
                marketData['atl'] = helper.trim(body['atl']);

                // Store special values
                marketData['marketCap'] = helper.toShort(body['market_cap']);
                marketData['volume'] = helper.toShort(body['total_volume']);
                marketData['supply'] = helper.toShort(body['circulating_supply']);
                marketData['maxSupply'] = helper.toShort(body['max_supply']);
                marketData['change24'] = helper.changeMod(body['price_change_percentage_24h']);

                // Send response, and log success
                res.send(marketData);
                console.log('Bitcoin Response Success!');
            } else {
                // Log Error, send 0 response
                console.log('Null Response!');
                res.send({
                    price: 0, marketCap: 0, volume: 0, change24: 0,
                    high: 0, low: 0, supply: 0,
                    ath: 0, atl: 0, maxSupply: 0
                });    
            }
        })
        .catch(function (error) {
            // Log Error, send 0 response
            console.log(error);
            res.send({
                price: 0, marketCap: 0, volume: 0, change24: 0,
                high: 0, low: 0, supply: 0,
                ath: 0, atl: 0, maxSupply: 0
            });
        });
});


/* Handle Request for Cardano Detailed Data
    -- Makes request to CoinGecko
    -- Responds with Cardano Details */
app.get('/cardano', (req,res) => {
    // ID
    let ID = 'cardano';
    // API Url
    let ethURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ID}`;

    // Make API Request
    axios
        .get(ethURL)
        .then(response => {
            // Store body of response
            body = response['data'][0];

            // Check not null
            if(body) {
                // Create response object
                let marketData = {}
                
                // Store normal values
                marketData['price'] = helper.trim(body['current_price']);
                marketData['high'] = helper.trim(body['high_24h']);
                marketData['low'] = helper.trim(body['low_24h']);
                marketData['ath'] = helper.trim(body['ath']);
                marketData['atl'] = helper.trim(body['atl']);

                // Store special values
                marketData['marketCap'] = helper.toShort(body['market_cap']);
                marketData['volume'] = helper.toShort(body['total_volume']);
                marketData['supply'] = helper.toShort(body['circulating_supply']);
                marketData['maxSupply'] = helper.toShort(body['max_supply']);
                marketData['change24'] = helper.changeMod(body['price_change_percentage_24h']);

                // Send response, and log success
                res.send(marketData);
                console.log('Cardano Response Success!');
            } else {
                // Log Error, send 0 response
                console.log('Null Response!');
                res.send({
                    price: 0, marketCap: 0, volume: 0, change24: 0,
                    high: 0, low: 0, supply: 0,
                    ath: 0, atl: 0, maxSupply: 0
                });    
            }
        })
        .catch(function (error) {
            // Log Error, send 0 response
            console.log(error);
            res.send({
                price: 0, marketCap: 0, volume: 0, change24: 0,
                high: 0, low: 0, supply: 0,
                ath: 0, atl: 0, maxSupply: 0
            });
        });
});



/*                      ------------------------------                            */
// ===================== Sparkline Charting Endpoints ============================
/*                      ------------------------------                            */

// Get Spark Data from CoinGecko -- Takes 4 separate responses
const getSparkData = (dayURL, weekURL, monthURL, yearURL, priceURL, coinID) => {
    // Store promises
    let dayReq = axios.get(dayURL);
    let weekReq = axios.get(weekURL);
    let monthReq = axios.get(monthURL);
    let yearReq = axios.get(yearURL);
    let priceReq = axios.get(priceURL);

    // Get data w/ axios
    return axios
        .all([dayReq, weekReq, monthReq, yearReq, priceReq])
        .then(response => {
            // Create response object
            let resObj = {};

            // Get response body
            let dayRes = response[0]['data'];   // Day Data
            let weekRes = response[1]['data'];  // Week Data
            let monthRes = response[2]['data']; // Month Data
            let yearRes = response[3]['data'];  // Year Data
            let priceRes = response[4]['data']; // Current price

            // Check not null -- Day Response
            if(dayRes) {
                resObj['day'] = dayRes['prices'];
            } else { // Store null
                resObj['day'] = null;
            }

            // Check not null -- Week Response
            if(weekRes) {
                resObj['week'] = weekRes['prices'];
            } else { // Store null
                resObj['week'] = null;
            }

            // Check not null -- Month Response
            if(monthRes) {
                resObj['month'] = monthRes['prices'];
            } else { // Store null
                resObj['month'] = null;
            }

            // Check not null -- Day Response
            if(yearRes) {
                resObj['year'] = yearRes['prices'];
            } else { // Store null
                resObj['year'] = null;
            }
    
            // Check not null -- Price Response
            if(priceRes) {
                resObj['price'] = helper.trim(priceRes[coinID]['usd']);
            } else {
                resObj['price'] = 0;
            }

            // Return response object
            return resObj;
        })
        .catch(function(error) {
            console.log(error);
            return null;
        });
}

/* Handling Request ethereum sparkline
    -- Makes coingecko API request
    -- Returns prices for 1d, 7d, 30d, 1y */
app.get('/ethSpark', (req, res) => {
    // ID
    let ID = 'ethereum';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let oneDay = helper.oneDay();
    let sevenDay = helper.sevenDay();
    let thirtyDay = helper.thirtyDay();
    let year = helper.year();

    // Store URL's
    let dayURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${oneDay}&to=${now}`;
    let weekURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${sevenDay}&to=${now}`;
    let monthURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${thirtyDay}&to=${now}`;
    let yearURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${year}&to=${now}`;
    let priceURL = `https://api.coingecko.com/api/v3/simple/price?ids=${ID}&vs_currencies=usd`;

    getSparkData(dayURL, weekURL, monthURL, yearURL, priceURL, ID)
        .then(ethData => {
            // Send Response
            res.send(ethData);
            console.log('Ethereum Spark Sent');
        });
});

/* Handling Request bitcoin sparkline
    -- Makes coingecko API request
    -- Returns prices for 1d, 7d, 30d, 1y */
app.get('/btcSpark', (req, res) => {
    // ID
    let ID = 'bitcoin';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let oneDay = helper.oneDay();
    let sevenDay = helper.sevenDay();
    let thirtyDay = helper.thirtyDay();
    let year = helper.year();

    // Store URL's
    let dayURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${oneDay}&to=${now}`;
    let weekURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${sevenDay}&to=${now}`;
    let monthURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${thirtyDay}&to=${now}`;
    let yearURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${year}&to=${now}`;
    let priceURL = `https://api.coingecko.com/api/v3/simple/price?ids=${ID}&vs_currencies=usd`;

    getSparkData(dayURL, weekURL, monthURL, yearURL, priceURL, ID)
        .then(btcData => {
            // Send Response
            res.send(btcData);
            console.log('Bitcoin Spark Sent');
        });
});
    
/* Handling Request cardano sparkline
    -- Makes coingecko API request
    -- Returns prices for 1d, 7d, 30d, 1y */
app.get('/adaSpark', (req, res) => {
    // ID
    let ID = 'cardano';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let oneDay = helper.oneDay();
    let sevenDay = helper.sevenDay();
    let thirtyDay = helper.thirtyDay();
    let year = helper.year();

    // Store URL's
    let dayURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${oneDay}&to=${now}`;
    let weekURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${sevenDay}&to=${now}`;
    let monthURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${thirtyDay}&to=${now}`;
    let yearURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${year}&to=${now}`;
    let priceURL = `https://api.coingecko.com/api/v3/simple/price?ids=${ID}&vs_currencies=usd`;

    getSparkData(dayURL, weekURL, monthURL, yearURL, priceURL, ID)
        .then(adaData => {
            // Send Response
            res.send(adaData);
            console.log('Cardano Spark Sent');
        });
});


// Listening on port 5000
app.listen(PORT, function() {
    console.log('express running on port 5000');
})