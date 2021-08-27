import React, { Component } from 'react';
import './Navbar.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <FooterContainer className="main-footer">
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <h4 style={{ color: 'grey' }}>Contributors</h4>
                                <ul className="list-unstyled">
                                    <li>Bui Nguyen Ngoc Tuan</li>
                                    <li>Do Hoang Duc</li>
                                    <li>Doan Nguyen My Hanh</li>
                                    <li>Jihun Lee</li>
                                    <li>Nguyen Le Thuy Linh</li>
                                    <li>Vo An Huy</li>
                                </ul>
                            </div>
                            <div className="col-sm-4">
                                <h4 style={{ color: 'grey' }}>E-mail</h4>
                                <ul className="list-unstyled">
                                    <li>s3877673@rmit.edu.vn</li>
                                    <li>s3788345@rmit.edu.vn</li>
                                    <li>s3639869@rmit.edu.vn</li>
                                    <li>s3753624@rmit.edu.vn</li>
                                    <li>s3740805@rmit.edu.vn</li>
                                    <li>s3804220@rmit.edu.vn</li>
                                </ul>
                            </div>
                            <div className="col-sm-4">
                                <h4 style={{ color: 'grey' }}>Links</h4>
                                <ul className="list-unstyled">
                                    <li><Link to='/' style={{ color: 'white' }}>Home</Link></li>
                                    <li><Link to='/AboutUs' style={{ color: 'white' }}>About Us</Link></li>
                                    <li><Link to='/Discussion' style={{ color: 'white' }}>Discussion</Link></li>
                                    <li><Link to='/Articles' style={{ color: 'white' }}>Articles</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p className="text-xs-center">
                                &copy;{new Date().getFullYear()} RMIT Covid-19 Medical App - All Right Reserved
                            </p>
                        </div>
                    </div>
                </div>
            </FooterContainer>
        )
    }
}

export default Footer

const FooterContainer = styled.footer`
    .footer-middle {
        background: var(--mainDark);
        padding-top: 2rem;
        color: var(--mainWhite);
    }

    .footer-bottom {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
`;