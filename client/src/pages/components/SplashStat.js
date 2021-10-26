// Home Page -- Splash Screen Display
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
// Import React Elements
import { Row, Col, Container } from 'react-bootstrap';
import CountUp from 'react-countup';
// Images
import Coins from '../../img/homeIcon.png';

class SplashStat extends Component {
    constructor() {
        super();
        this.state = {
            totalCap: 0,
            postFix: 'T'
        };
    };
    
    componentDidMount = () => {
        axios
            .get('/totalCap')
            .then(response => {
                this.setState({
                    totalCap: response['data'][0],
                    postFix: response['data'][1]
                });
            });
    };

    render() {
        return (
            <div className="splash">
                <Container className="align-self-center">
                    <Row>
                        <Col className="my-auto text-start">
                            <h1> Crypto </h1>
                            <h2>
                                $<CountUp start={1.00} end={this.state.totalCap} duration={3} decimals={2} /> {this.state.postFix}
                            </h2>
                            <h3> Total Market Cap </h3>
                        </Col>
                        <Col>
                            <img src={ Coins } alt="Crypto Coins" />
                        </Col>
                    </Row>
                </Container> 
            </div>
        );
    };
}

export default SplashStat;