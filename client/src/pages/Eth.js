// Ethereum -- Samuel Adamson
// React Elements
import EthStats from './components/eth/EthStats';
import EthSpark from './components/eth/EthSpark';
import Footer from './components/Footer';


const Eth = () => {
    return (
        <div className="Eth coin-page">
            <EthStats />
            <EthSpark />

            <Footer />
        </div>
    );
}

export default Eth;