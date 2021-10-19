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
const e = require('express');

// Store port
PORT = process.env.PORT;
// Store P.Nomics Key -- Serves as our 'database' for Crypto
NOMICS_KEY = process.env.NOMICS_KEY;


/* Handle Request for Total Market Cap Data 
    -- Makes request to Nomics
    -- Responds with Total Market Cap */
app.get('/totalCap', (req, res) => {
    // Get start/end date for market cap
    let startDate = helper.totalCapDate();
    // Request URL
    let totalCapURL = `https://api.nomics.com/v1/market-cap/history?key=${NOMICS_KEY}&start=${startDate}`;
    
    // Make Request
    axios
        .get(totalCapURL)
        .then(response => {
            if(response['status'] == 200 && response['statusText'] == 'OK') { // Successful Response
                // Most recent market Cap
                let cap = response['data'][response['data'].length - 1]['market_cap'];
                
                // Check not null
                if(cap) {
                    // Convert to number
                    cap = parseFloat(cap);
                    // Send Response
                    res.send(cap.toExponential().substring(0,4));
                } else { // Error in Response
                    res.send('2.70');
                }
            } else { // Error in Response
                res.send('2.70');
            }
        });
});


/* Handle Request for Ethereum,Bitcoin,Binance Current Price
    -- Makes request to Nomics
    -- Responds with Ethereum,Bitcoin,Binance Prices to 2 decimals */
app.get('/tickers', (req, res) => {
    // Set Ticker
    let tick = 'ETH,BTC,ADA';
    // API Url
    let tickURL = `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&ids=${tick}&interval=1h`

    // Make Request
    axios
        .get(tickURL)
        .then(response => {
            if(response['status'] == 200 && response['statusText'] == 'OK') { // Successful Response
                // Store data value
                let data = response['data'];

                // Check data not null
                if(data) {
                    // JS Object to hold {ticker: price}
                    let tickers = {}

                    // Iterate through responses
                    for(let i = 0; i < data.length; i++) {
                        // Check response not null
                        if(data[i]['symbol'] && data[i]['price']) {
                            // Convert to float
                            let price = parseFloat(data[i]['price']);
                            
                            // Add to tickers object {ticker: price}
                            tickers[data[i]['symbol']] = price;
                        }
                    }

                    // Send response
                    res.send(tickers);
                    console.log('Response Success');
                }
                
            } else { // Error in Response
                console.log('Error: Nomics Failure');
                res.send('Unavailable');
            }
        });
});



// Listening on port 5000
app.listen(PORT, function() {
    console.log('express running on port 5000');
})