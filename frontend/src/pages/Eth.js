// Ethereum -- Samuel Adamson
// React Elements
import { Container, Row, Col } from 'react-bootstrap';
import EthStats from './components/eth/EthStats';


const Eth = () => {
    return (
        <div className="Eth coin-page">
            <EthStats />
        </div>
    );
}

export default Eth;