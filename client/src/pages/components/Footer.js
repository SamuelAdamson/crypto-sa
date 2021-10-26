/* Footer Used Across Pages -- See Index.css*/
// Bootstrap Elements
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
// Social Media Icons
import GitHub from '../../img/socials/github.png';
import LinkedIn from '../../img/socials/linkedin.png';
import Instagram from '../../img/socials/instagram.png';

const Footer = () => {
    return (
        <div className="Footer">
            <Container>
                <Row>
                    <ListGroup horizontal className="justify-content-center">
                        <ListGroup.Item>
                            <a href="https://github.com/SamuelAdamson" target="_blank" rel="noreferrer"> 
                                <img src={ GitHub } height="48" width="48" alt="GitHub"/>
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a href="https://www.linkedin.com/in/samuel-adamson-4397051b8/" target="_blank" rel="noreferrer"> 
                                <img src={ LinkedIn } height="48" width="48" alt="LinkedIn"/>
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a href="https://www.instagram.com/lilgiibb/?hl=en" target="_blank" rel="noreferrer"> 
                                <img src={ Instagram } height="48" width="48" alt="Instagram"/>
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>

                <Row>
                    <Col>
                        <h2> Frameworks </h2>
                    </Col>
                    <Col>
                        <h2> Tools </h2>
                    </Col>
                    <Col>  
                        <h2> About Me </h2>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                            <h3> ReactJS </h3>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.coingecko.com/en" target="_blank" rel="noreferrer">
                            <h3> CoinGecko </h3>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://SamuelAdamson.github.io/" target="_blank" rel="noreferrer">
                            <h3> Portfolio </h3>
                        </a>
                    </Col>             
                </Row>

                <Row>
                    <Col>
                        <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
                            <h3> ExpressJS </h3>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://apexcharts.com/" target="_blank" rel="noreferrer">
                            <h3> ApexCharts </h3>
                        </a>
                    </Col>
                    <Col>
                        <a href="mailto:sadamson@uccs.edu">
                            <h3> Email </h3>
                        </a>
                    </Col>             
                </Row>

                <Row>
                    <Col>
                        <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
                            <h3> NodeJS </h3>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">
                            <h3> Bootstrap </h3>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://adamson.issacertifiedtrainer.com" target="_blank" rel="noreferrer">
                            <h3> CPT </h3>
                        </a>
                    </Col>             
                </Row>
            </Container>
        </div>
    );
}

export default Footer;