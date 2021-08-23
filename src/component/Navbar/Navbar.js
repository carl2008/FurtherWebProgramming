import React, { Component } from 'react';
import { NavbarLinks } from './NavbarLinks';
import './Navbar.css';
import logo from './logo.png';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <div className="navbar-rectangle">
                    <Link to='/'><img className="navbar-logo" src={logo} alt="logo"/></Link>
                    <Link to='/' className="navbar-title">R-MED</Link>
                    <ul className="navbar-links">
                        {NavbarLinks.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.url} className={item.cName}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <Button className='navbar-login' variant="outline-primary">Login</Button>
                    <Button className='navbar-register' variant="primary">Register</Button>
                </div>
            </nav>
        )
    }
}

export default Navbar