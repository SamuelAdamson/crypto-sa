### Crypto
<strong> Sparkline for Crypto Currencies and Portfolio </strong> <br>
In this project I utilized ReactJS, NodeJS, ExpressJS, ApexCharts, and the CoinGecko API to produce live updating sparklines for popular cryptocurrencies. Additional data like market cap, daily percentage change, and circulating supply is also provided on the site. <br>

<br>
<div>
  <img src="https://user-images.githubusercontent.com/70236734/177060539-7903a05e-a67c-47f3-8605-0f75a19e9dbb.png"/>
  <img src="https://user-images.githubusercontent.com/70236734/177060563-aa3d0594-0f67-4258-bf75-5bc629f9fb9f.png"/>
</div>
<br>

<strong>Design</strong> <br>
The frontend of the website is a single page application (SPA) built using React Router. There is no database for this application, as all required data points are publicly available via the CoinGecko API. For this reason, all requests to CoinGecko could have been set up on the client-side of the application. However, I wanted to gain experience using ExpressJS in this project, so I set up the serverside using . When the client makes a request to the server (loading a new page in react router), the server then makes a request to the CoinGecko API, parses the response, and sends it in the response to the original request back to the client. In this set up, we are essentially using the CoinGecko API as if it were a standard database in terms of server/client interaction. <br>

Checkout the project hosted [here](https://crypto-sparkline.herokuapp.com/).
