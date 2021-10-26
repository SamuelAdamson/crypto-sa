// BTC Page -- Sparkline
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
import { Container, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Chart from 'react-apexcharts';

class BtcSpark extends Component {
    constructor() {
        super();
        // Store Promise to URl
        this.axPromise = axios.get('/btcSpark');

        // State Values -- Chart Data/Configuration
        this.state = {
            price: 0,
            // ApexCharts options
            options: {
                colors: ['#802bb1'],
                chart: {
                    sparkline: 'enabled',
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
                fill: {
                    gradient: {
                        enabled: true,
                        opacityFrom: 0.55,
                        opacityTo: 0
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: false,
                        formatter: function(timestamp) {
                            return new Date(timestamp);
                        }
                    },
                    axisTicks: {
                        show: false,
                    },
                    tooltip: {
                        enabled: false
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
        }

        // Bindings
        this.loadDay = this.loadDay.bind(this);
        this.loadWeek = this.loadWeek.bind(this);
        this.loadMonth = this.loadMonth.bind(this);
        this.loadYear = this.loadYear.bind(this);
    };  


    // Load Chart Timeseries with 1 Day Data
    loadDay() {
        this.axPromise.then(response => {
            // Store response body
            let body = response['data'];

            // Check not null
            if(body) {
                // Update State
                this.setState({
                    price: body['price'],
                    series: [{
                        name: 'BTC-USD',
                        data: body['day']
                    }]
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Load Chart Timeseries with 1 Week Data
    loadWeek() {
        this.axPromise.then(response => {
            // Store response body
            let body = response['data'];

            // Check not null
            if(body) {
                // Update State
                this.setState({
                    series: [{
                        name: 'BTC-USD',
                        data: body['week']
                    }]
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Load Chart Timeseries with 1 Week Data
    loadMonth() {
        this.axPromise.then(response => {
            // Store response body
            let body = response['data'];

            // Check not null
            if(body) {
                // Update State
                this.setState({
                    series: [{
                        name: 'BTC-USD',
                        data: body['month']
                    }]
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Load Chart Timeseries with 1 Week Data
    loadYear() {
        this.axPromise.then(response => {
            // Store response body
            let body = response['data'];

            // Check not null
            if(body) {
                // Update State
                this.setState({
                    series: [{
                        name: 'BTC-USD',
                        data: body['year']
                    }]
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }


    // On Component Mount
    componentDidMount = () => {
        this.loadDay();   // Load one day data by default
    };

    render() {
        return(
            <div className="BtcSpark spark">
                <Container className="pt-5 pb-5">
                    <Row>
                        <Col>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
                                <ToggleButton id="tbg-radio-0" size="lg" value={0}
                                 name="coinToggleGroup" onClick={this.loadDay}> 
                                    <strong> 1D </strong> 
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-1" size="lg" value={1}
                                 name="coinToggleGroup" onClick={this.loadWeek}> 
                                    <strong> 1W </strong> 
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-2" size="lg" value={2}
                                 name="coinToggleGroup" onClick={this.loadMonth}> 
                                    <strong> 1M </strong> 
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-3" size="lg" value={3}
                                 name="coinToggleGroup" onClick={this.loadYear}> 
                                    <strong> 1Y </strong> 
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                        <Col>
                            <h6> ${this.state.price} </h6>
                            <h5> BTC </h5>
                        </Col>
                    </Row>

                    <Chart 
                        options={this.state.options}
                        series={this.state.series}
                        type="area"
                        width="100%" 
                    />
                </Container>
            </div>
        );
    }
}

export default BtcSpark;