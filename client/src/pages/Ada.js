// Cardano -- Samuel Adamson
// React Elements
import AdaStats from './components/ada/AdaStats';
import AdaSpark from './components/ada/AdaSpark';
import Footer from './components/Footer';

const Ada = () => {
    return (
        <div className="Ada coin-page">
            <AdaStats />
            <AdaSpark />

            <Footer />
        </div>
    );
}

export default Ada;