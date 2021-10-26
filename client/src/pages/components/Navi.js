// Navbar Component -- Top of page
import { Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
// React Router
import { NavLink } from 'react-router-dom';
// Images for navigation
import ETH from '../../img/nav/eth.png';
import BTC from '../../img/nav/btc.png';
import ADA from '../../img/nav/ada.png';
import Site from '../../img/nav/site-logo.png';

const Navi = () => {
    return (
        <div className="Navi">
            <Navbar expand="lg">
                <NavbarCollapse className="justify-content-center">
                    <div className="NavItem"> 
                            <NavLink exact to="/"> 
                                <img src={ Site } alt="Site Home"
                                    height="48"
                                />
                            </NavLink>
                        </div>
                        
                        <div className="NavItem"> 
                            <NavLink exact to="/ethereum"> 
                                <img src={ ETH } alt="Ethereum"
                                    height="48" width="48"
                                />
                            </NavLink>
                        </div>
                        <div className="NavItem"> 
                            <NavLink exact to="/bitcoin"> 
                                <img src={ BTC } alt="Bitcoin"
                                    height="48" width="48"
                                />
                            </NavLink>
                        </div>
                        <div className="NavItem"> 
                            <NavLink exact to="/cardano"> 
                                <img src={ ADA } alt="Cardano"
                                    height="48" width="48"
                                />
                            </NavLink>
                        </div>
                    </NavbarCollapse>
            </Navbar>
        </div>
    );  
}

export default Navi;