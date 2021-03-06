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
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#1E3A6A" }} variant="dark">
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
            <Nav className="mr-auto">
              <Nav.Link href="/AboutUs">About Us</Nav.Link>
              <Nav.Link href="/Discussion">Discussion</Nav.Link>
              <Nav.Link href="/Articles">Articles</Nav.Link>
              <Nav.Link href="/AdminPanel">Admin Panel</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  history.push(`/`);
                  history.go(0)
                }}
              >
                <span class="btn rounded-pill me-2" href="# " role="button" style={{ color: '#4FB0B9', border: '3px solid #4FB0B9' }}><span class="mx-2">Log out</span></span>
              </Nav.Link>
              <Nav.Link href="/UserProfile">
                <span class="btn rounded-pill me-2" href="# " role="button" style={{ color: 'white', backgroundColor: '#4FB0B9' }}><span class="mx-2">Profile</span></span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );

}