// Home Page -- Samuel Adamson
import '../css/Home.css'
// React Bootstrap
import { Container, Row } from 'react-bootstrap';
// Components
import Fader from './components/Fader';
import SplashStat from './components/SplashStat';
import Tickers from './components/Tickers';
import Footer from './components/Footer';

const Home = () => {
    return (
        <div className="Home"> 
            <SplashStat />

            <div className="content">
                <Container className="mb-5 pb-5">
                    <Fader>
                        <Row>
                            <h1> Value in freedom </h1>
                        </Row>
                    </Fader>
                    <br />
                    <Fader>
                        <Row>
                            <h2> 
                                Over 22% of US Dollars in circulation were printed during the 
                                2020 calendar year. Unhinged government spending and bailouts inevitably
                                leads to hyper inflation.
                            </h2>
                        </Row>
                        <br />
                        <Row>
                            <h2>  
                                Unlike fiat currencies, cryptocurrencies are not controlled by a centralized 
                                authority. No single government can have full control over the supply and value 
                                of a cryptocurrency. 
                            </h2>
                        </Row>
                    </Fader>
                </Container>
                <br />
                
                <Tickers />
                <br />

                <Footer />

            </div>    
        </div>
    );
}

export default Home;