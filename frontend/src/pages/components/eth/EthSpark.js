// ETH Page -- Sparkline
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
import { Line } from 'react-chartjs-2';

class EthSpark extends Component {
    constructor() {
        super();
        this.state = {
            lineData: []
        };
    };


    render() {
        return(
            <div className='EthSpark spark'>

            </div>
        );
    }
}