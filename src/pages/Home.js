// Home Page -- Samuel Adamson
import '../css/Home.css'
import '../css/bootstrap.css'
// React bootstrap elements
import { Row, Col, Container } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="Home"> 
            <div className="splash">
                <Container className="align-self-center">
                    <Row>
                        <Col>
                            <h1> crypto </h1>
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;