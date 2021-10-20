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
    -- Makes request to Nomics
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
    -- Makes request to Nomics
    -- Responds with Ethereum,Bitcoin,Binance Prices to 2 decimals */
app.get('/tickers', (req, res) => {
    // Set Ticker
    let tick = 'ethereum%2Cbitcoin%2Ccardano';
    // API Url
    let tickURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tick}`;

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

                // Iterate through each coin
                for(let i = 0; i < body.length; i++) {
                    // Store tickers {symbol: price}
                    tickers[body[i]['symbol']] = body[i]['current_price'];
                }
                
                // Log and send response
                res.send(tickers);
                console.log('Tickers Response Success!');
            } else { // Null Response, log and send 0
                console.log('Null Response!');
                res.send({
                    ETH: 0,
                    BTC: 0,
                    ADA: 0
                })
            }
        })
        .catch(function (error) { // Error in response
            // Log Error, Send 0 response
            console.log(error);
            res.send({
                ETH: 0,
                BTC: 0,
                ADA: 0
            });
        });
});


/* Handle Request for Ethereum Detailed Data
    -- Makes request to Nomics
    -- Responds with Ethereum Details */
app.get('/ethereum', (req,res) => {

});


// Listening on port 5000
app.listen(PORT, function() {
    console.log('express running on port 5000');
})