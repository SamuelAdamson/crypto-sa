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


// ----------- ETHEREUM REQUESTS --------------
app.get('/ethDay', (req, res) => { // One Day
    // ID
    let ID = 'ethereum';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let oneDay = helper.oneDay();

    // Store URL
    let dayURL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${oneDay}&to=${now}`;
    let priceURL = `https://api.coingecko.com/api/v3/simple/price?ids=${ID}&vs_currencies=usd`;

    // Store requests
    let dayReq = axios.get(dayURL);
    let priceReq = axios.get(priceURL);

    axios
        .all([dayReq, priceReq])
        .then(response => {
            // Store results
            let dayRes = response[0]['data'];
            let priceRes = response[1]['data'];

            // Check not null
            if(dayRes && priceRes) {
                // Store result
                let resObj = {
                    day: dayRes['prices'],
                    price: helper.trim(priceRes[ID]['usd'])
                }
                // Send Result
                res.send(resObj);
                console.log(`${ID}  day response sent!`);
            } else {
                console.log('Null Response!');
                res.send(null);
            }

        })
        .catch(function(error) {
            console.log(error);
            res.send(null);
        });
});

app.get('/ethWeek', (req, res) => { // One Week
    // ID
    let ID = 'ethereum';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let sevenDay = helper.sevenDay(); // One week ago

    // Store URL
    let URL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${sevenDay}&to=${now}`;
    
    // Axios Request
    axios.get(URL)
        .then(response => {
            // Store body
            let body = response['data'];

            // Check not null
            if(body) {
                // Send prices
                console.log(`${ID} week response sent!`)
                res.send(body['prices']);
            } else {
                console.log('Null Response!');
                res.send(null);
            }
        })
        .catch(function(error) {
            console.log(error);
            res.send(null);
        });
});

app.get('/ethMonth', (req, res) => { // One Month
    // ID
    let ID = 'ethereum';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let thirtyDay = helper.thirtyDay(); // Thirty Days ago

    // Store URL
    let URL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${thirtyDay}&to=${now}`;
    
    // Axios Request
    axios.get(URL)
        .then(response => {
            // Store body
            let body = response['data'];

            // Check not null
            if(body) {
                // Send prices
                console.log(`${ID} month response sent!`)
                res.send(body['prices']);
            } else {
                console.log('Null Response!');
                res.send(null);
            }
        })
        .catch(function(error) {
            console.log(error);
            res.send(null);
        });
});

app.get('/ethYear', (req, res) => { // One Year
    // ID
    let ID = 'ethereum';
    
    // Store timeframes
    let now = helper.now(); // Current timestamp
    let year = helper.year();

    // Store URL's
    let URL = `https://api.coingecko.com/api/v3/coins/${ID}/market_chart/range?vs_currency=usd&from=${year}&to=${now}`;

    // Axios Request
    axios.get(URL)
        .then(response => {
            // Store body
            let body = response['data'];

            // Check not null
            if(body) {
                // Send prices
                console.log(`${ID} year response sent!`)
                res.send(body['prices']);
            } else {
                console.log('Null Response!');
                res.send(null);
            }
        })
        .catch(function(error) {
            console.log(error);
            res.send(null);
        });
});


// Bitcoin and Cardano Requests ?


// Listening on port 5000
app.listen(PORT, function() {
    console.log('express running on port 5000');
})