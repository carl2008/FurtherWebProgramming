import React, { Component } from "react";
import "./Navbar.css";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router-dom";

export default function NavbarLogin() {
  const history = useHistory();

  return (
    <div className="removing-space">
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
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  history.push(`/`);
                  history.go(0)
                }}
              >
                Log out
              </Nav.Link>
              <Nav.Link href="/Profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );

}