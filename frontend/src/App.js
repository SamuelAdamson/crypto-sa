// App Componenet -- Configured with React Router
import './css/App.css';
// React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navi from './pages/components/Navi';
// Pages
import Home from './pages/Home';
import Eth from './pages/Eth';
import Btc from './pages/Btc';
import Bnb from './pages/Bnb';

function App() {
    return (
        <div className="App">

            <Router> 
                <Navi />
                <Switch>
                    <Route exact path = "/" component={ Home } />
                    <Route exact path = "/ethereum" component={ Eth } />
                    <Route exact path = "/bitcoin" component={ Btc } />
                    <Route exact path = "/binance" component={ Bnb } />
                </Switch>
            </Router>

        </div>
    );
}

export default App;
