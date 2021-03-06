// Tickers -- Link to coin pages, ticker, and coin description
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
// Import React Elements
import Fader from '../components/Fader';
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Tickers extends Component {
    constructor() {
        super();
        this.state = {
            ethPrice: 3000.00.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            btcPrice: 50000.00.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
            adaPrice: 2.15.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        };
    };

    // On component mount
    componentDidMount = () => {
        // Call Api 
        setTimeout(() => {
            axios
                .get('/tickers')
                .then(response => {
                    this.setState({
                        ethPrice: response['data']['eth'].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                        btcPrice: response['data']['btc'].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                        adaPrice: response['data']['ada'].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
                    });
                })
                .catch( function(error) {
                    // Catch Error -- no need to update prices
                    console.log(error);
                });
        }, 250) 
    }

    render() {
        return (
            <div className="Tickers">
                <Fader>
                    <Container className="ticker">
                        <NavLink exact to="/ethereum">
                            <Row>
                                <Col sm={8}>
                                    <h1> Ethereum </h1>
                                    <p>
                                        Ethereum is a decentralized, open-source blockchain with smart contract 
                                        functionality. Ether is the native cryptocurrency of the Ethereum platform.
                                        Ethereum was created by Vitalik Buterin in 2013.
                                    </p>
                                </Col>
                                <Col sm={4} className="tickerPrice my-auto">
                                    <h2> ETH </h2>
                                    <h2> ${this.state.ethPrice} </h2>
                                </Col>
                            </Row>
                        </NavLink>
                    </Container>
                </Fader>

                <Fader>
                    <Container className="ticker">
                        <NavLink exact to="/bitcoin">
                            <Row>
                                <Col sm={8}>
                                    <h1> Bitcoin </h1>
                                    <p>
                                        Bitcoin, the world's first decentralized cryptocurrency, was founded in 
                                        2009 by an anonymous entity under the pseudonym Satoshi Nakamoto. With a 
                                        set limit of 21 million coins, Bitcoin is particularly resistent to inflation.
                                    </p>
                                </Col>
                                <Col sm={4} className="tickerPrice my-auto">
                                    <h2> BTC </h2>
                                    <h2> ${this.state.btcPrice} </h2>
                                </Col>
                            </Row>
                        </NavLink>
                    </Container>
                </Fader>

                <Fader>
                    <Container className="ticker">
                        <NavLink exact to="/cardano">
                            <Row>
                                <Col sm={8}>
                                    <h1> Cardano </h1>
                                    <p>
                                        Cardano is a public blockchain platform. The Cardano blockchain utilizes 
                                        proof-of-stake (POS) as an efficient alternative to Bitcoin's proof-of-work (POW)
                                        blockchain. As a result, the Cardano platform offers lower energy usage and
                                        quicker transaction speeds.
                                    </p>
                                </Col>
                                <Col sm={4} className="tickerPrice my-auto">
                                    <h2> ADA </h2>
                                    <h2> ${this.state.adaPrice} </h2>
                                </Col>
                            </Row>
                        </NavLink>
                    </Container>
                </Fader>
            </div>
        );
    }
}

export default Tickers;