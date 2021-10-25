// ETH Page -- Sparkline
// Author: Samuel Adamson
import axios from 'axios';
import { Component } from 'react';
import { Container, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Chart from 'react-apexcharts';

class EthSpark extends Component {
    constructor() {
        super();
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
        // Make API Request
        axios
            .get('/ethDay')
            .then(response => {
                // Store body
                let body = response['data'];

                // Check not null
                if(body) {
                    // Update state
                    this.setState({
                        price: body['price'],
                        series: [{
                            name: 'ETH-USD',
                            data: body['day']
                        }]
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // Load Chart Timeseries with 1 Week Data
    loadWeek() {
        // Make API Request
        axios
            .get('/ethWeek')
            .then(response => {
                // Store body
                let body = response['data'];

                // Check not null
                if(body) {
                    // Update state
                    this.setState({
                        series: [{
                            name: 'ETH-USD',
                            data: body
                        }]
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // Load Chart Timeseries with 1 Month Data
    loadMonth() {
        // Make API Request
        axios
            .get('/ethMonth')
            .then(response => {
                // Store body
                let body = response['data'];

                // Check not null
                if(body) {
                    // Update state
                    this.setState({
                        series: [{
                            name: 'ETH-USD',
                            data: body
                        }]
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // Load Chart Timeseries with 1 Week Data
    loadYear() {
        // Make API Request
        axios
            .get('/ethYear')
            .then(response => {
                // Store body
                let body = response['data'];

                // Check not null
                if(body) {
                    // Update state
                    this.setState({
                        series: [{
                            name: 'ETH-USD',
                            data: body
                        }]
                    })
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
            <div className="EthSpark spark">
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
                            <h5> ETH </h5>
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

export default EthSpark;