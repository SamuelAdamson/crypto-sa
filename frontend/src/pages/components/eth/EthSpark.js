// ETH Page -- Sparkline
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
import { Container, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Chart from 'react-apexcharts';

class EthSpark extends Component {
    constructor() {
        super();
        // Axios Promise
        this.axPromise = null;

        // State Values -- Chart Data/Configuration
        this.state = {
            price: 0,
            // ApexCharts options
            options: {
                colors: ['#802bb1'],
                chart: {
                    type: 'area',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                stroke: {
                    show: true,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    show: false,
                    labels: {
                        show: false,
                        formatter: function(timestamp) {
                            return new Date(timestamp);
                        }
                    },
                    axisTicks: {
                        show: true,
                        color: '#ffffff'
                    }
                    
                },
                yaxis: {
                    show: false,
                    labels: {
                        show: false,
                        formatter: function(value) {
                            return '$' + value;
                        }
                    }
                },
                grid: {
                    show: false
                },
                tooltip: {
                    enabled: true,
                    theme: 'dark',
                    fillSeriesColor: true,
                    style: {
                        fontSize: '14px'
                    },
                    y: {
                        formatter: function(value) {
                            return '$' + value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                        }
                    }
                },
                noData: {
                    text: 'Loading...',
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: '#802bb1',
                        fontSize: '7rem'
                    }
                }
            },
            series: [] // Chart Series (data)
        };
    };  

    // Get Data from backend
    storeData() {
        // Make request
        const promise = axios.get('/ethSpark');
        // Store promise result
        this.axPromise = promise.then((response) => response.data);
    }

    // Load Chart Timeseries with 1 Day Data
    loadDay() {
        // Access promise data
        this.axPromise.then(body => {
            // Check not null
            if(body) {
                // Store daydata in chart series
                this.setState({
                    price: body['price'],
                    series: [{
                        name: 'ETH-USD',
                        data: body['day']
                    }]
                });
            } else { // Null Response
                console.log('Null Response!');
            }

        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // On Component Mount
    componentDidMount = () => {
        this.storeData(); // Store Data for Sparklines
        this.loadDay();   // Load one day data by default
        console.log(this.state.series);
    };

    render() {
        return(
            <div className="EthSpark spark">
                <Container className="pt-5 pb-5">
                    <Row>
                        <Col>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
                                <ToggleButton id="tbg-radio-0" size="lg" value={0}> <strong> 1D </strong> </ToggleButton>
                                <ToggleButton id="tbg-radio-1" size="lg" value={1}> <strong> 1W </strong> </ToggleButton>
                                <ToggleButton id="tbg-radio-2" size="lg" value={2}> <strong> 1M </strong> </ToggleButton>
                                <ToggleButton id="tbg-radio-3" size="lg" value={3}> <strong> 1Y </strong> </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                        <Col>
                            <h6> ${this.state.price} </h6>
                            <h5> ETH </h5>
                        </Col>
                    </Row>

                    <Chart 
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        width="100%" 
                    />
                </Container>
            </div>
        );
    }
}

export default EthSpark;