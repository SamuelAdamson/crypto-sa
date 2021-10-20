// ETH Page -- Stats Display
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
// Import React Elements
import { Row, Col, Container } from 'react-bootstrap';

class EthStats extends Component {
    constructor() {
        super();
        this.state = {
            price: 0,
            marketCap: 0,
            volume: 0,

        };
    };


    render() {
        return (
            <div className="EthStats">
                <Container className="mt-4">
                    <Row>
                        <Col sm={8}>
                            <h1> Ethereum </h1>
                        </Col>
                        <Col sm={4} className="my-auto">
                            <h2> ${this.state.price} </h2>
                        </Col>
                    </Row>
                </Container>
                <Container className="mt-5">
                    <Row>
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
                        
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default EthStats;