// BTC Page -- Stats Display
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
// Import React Elements
import { Row, Col, Container } from 'react-bootstrap';

class BtcStats extends Component {
    constructor() {
        super();
        this.state = {
            price: 0, marketCap: 0, volume: 0, change24: 0,
            high: 0, low: 0, supply: 0,
            ath: 0, atl: 0, maxSupply: 0
        };
    };

    // Load in data
    loadData() {
        // Make request
        axios
            .get('/bitcoin')
            .then(response => {
                // Store response
                let body = response['data'];
                
                // Check Null
                if(body) {
                    // Configure possible null
                    if(!body['maxSupply']) {
                        var maxSupply_mod = 'Uncapped';
                    } else {
                        maxSupply_mod = body['maxSupply'][0] + body['maxSupply'][1];
                    }

                    // Set State
                    this.setState({
                        price: body['price'],
                        marketCap: body['marketCap'][0] + body['marketCap'][1],
                        volume: body['volume'][0] + body['volume'][1],
                        change24: body['change24'][0] + body['change24'][1],
                        high: body['high'],
                        low: body['low'],
                        supply: body['supply'][0] + body['supply'][1],
                        ath: body['ath'],
                        atl: body['atl'],
                        maxSupply: maxSupply_mod
                    });
                } else {
                    console.log('Null Response!');
                }
            })
            .catch( function(error) {
                // Log error
                console.log(error);
            });
    };

    // Fade in objects
    async fadeIn() {
        // Fade in elements
        let faders = document.querySelectorAll('.stat-row');
        // Timer to space out fade
        let timer = (ms) => new Promise(res => setTimeout(res, ms));

        // For each element
        for(let i = 0; i < faders.length; i++) {
            // Fade in every 700 ms
            await timer(700);
            faders[i].classList.add('is-visible');
        };
    };

    // On Component Mount
    componentDidMount = () => {
        // Update values
        this.loadData();
        this.fadeIn();
    }

    render() {
        return (
            <div className="BtcStats">
                <Container className="mt-4">
                    <Row>
                        <Col sm={8}>
                            <div className="stats-head"> 
                                <h1> Bitcoin </h1>
                                <h4> (BTC) </h4>
                            </div>
                        </Col>
                        <Col sm={4} className="my-auto">
                            <h2> ${this.state.price} </h2>
                        </Col>
                    </Row>
                </Container>
                <Container className="mt-5">
                    <Row className="stat-row">
                        <Col>
                            <h3> Market Cap </h3>
                            <div className="sep"/>
                            <h4> ${this.state.marketCap} </h4>                            
                        </Col>
                        <Col>
                            <h3> Volume </h3>
                            <div className="sep"/>
                            <h4> ${this.state.volume} </h4>
                        </Col>
                        <Col>
                            <h3> Change </h3>
                            <div className="sep"/>
                            <h4> {this.state.change24}% </h4>                     
                        </Col>
                    </Row>

                    <Row className="stat-row">
                        <Col>
                            <h3> High </h3>
                            <div className="sep"/>
                            <h4> ${this.state.high} </h4>                            
                        </Col>
                        <Col>
                            <h3> Low </h3>
                            <div className="sep"/>
                            <h4> ${this.state.low} </h4>
                        </Col>
                        <Col>
                            <h3> Supply </h3>
                            <div className="sep"/>
                            <h4> {this.state.supply} </h4>                     
                        </Col>
                    </Row>

                    <Row className="stat-row">
                        <Col>
                            <h3> All Time High </h3>
                            <div className="sep"/>
                            <h4> ${this.state.ath} </h4>                            
                        </Col>
                        <Col>
                            <h3> All Time Low </h3>
                            <div className="sep"/>
                            <h4> ${this.state.atl} </h4>
                        </Col>
                        <Col>
                            <h3> Max Supply </h3>
                            <div className="sep"/>
                            <h4> {this.state.maxSupply} </h4>                     
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default BtcStats;