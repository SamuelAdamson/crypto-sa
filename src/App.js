// App Componenet -- Configured with React Router
import './css/App.css';
// React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home.js'


function App() {
    return (
        <div className="App">

            <Router> 
                
                <Switch>
                    <Route exact path = "/" component={ Home } />
                </Switch>
            </Router>

        </div>
    );
}

export default App;
