// Bitcoin -- Samuel Adamson
// React Elements
import BtcStats from './components/btc/BtcStats';
import BtcSpark from './components/btc/BtcSpark';
import Footer from './components/Footer';


const Btc = () => {
    return (
        <div className="Btc coin-page">
            <BtcStats />
            <BtcSpark />

            <Footer />
        </div>
    );
}

export default Btc;