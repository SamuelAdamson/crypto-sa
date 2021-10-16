// Home Page -- Samuel Adamson
import '../css/Home.css'
// React elements
import { Row, Col, Container } from 'react-bootstrap';
import CountUp from 'react-countup';
// Images
import Coins from '../img/homeIcon.png';


const Home = () => {
    return (
        <div className="Home"> 
            <div className="splash">
                <Container className="align-self-center">
                    <Row>
                        <Col className="my-auto text-start">
                            <h1> Crypto </h1>
                            <h2> $2.49T  </h2>
                            <h3> Total Market Cap </h3>
                        </Col>
                        <Col>
                            <img src={ Coins } alt="Crypto Coins" />
                        </Col>
                    </Row>
                </Container> 
            </div>
        </div>
    );
}

export default Home;