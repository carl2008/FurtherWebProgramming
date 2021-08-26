import React, { Component } from 'react';
import './Navbar.css';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                width="35"
                                height="30"
                                className="d-inline-block align-top"
                                alt="R-MED logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Brand href="/">R-MED</Navbar.Brand>

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/AboutUs">About Us</Nav.Link>
                                <Nav.Link href="/Discussion">Discussion</Nav.Link>
                                <Nav.Link href="/Articles">Articles</Nav.Link>
                            </Nav>
                            <Nav className="login-register">
                                <Nav.Link href="#">Login</Nav.Link>
                                <Nav.Link href="#">Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar