import React, { Component } from 'react';
import './AboutUs.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class AboutUs extends Component {
    render () {
        return (
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12 mx-auto text-center">
                        <div className="jumbotron card">
                            <h3><u>About This Page</u></h3><br></br>
                            <p className="col-10 mx-auto">As of 2021, the COVID-19 pandemic situation is still a huge concern to everyone around the world. Due to the unclear symptoms of the virus, citizens have a lot of questions about the current circumstance or how to deal with a specific situation (Ex: How to treat F0 and F1 patients, how to self-isolate at home, etc.). Another reason is that face-to-face check-ups with doctors are unavailable, this could lead to some problems that citizens are unaware of (Ex: Mistaking common diseases’ symptoms with COVID-19 ones, etc.).
                                <br></br>For those reasons, our team builds a Medical Consultation system which helps citizens and patients easily communicate with doctors anywhere and anytime they want to. The main purpose of the project is to make a website where doctors and patients can socialize by asking and answering questions regarding covid-19 virus. Not only can doctors answer questions posted by patients, but they can also post medical articles to inform as many people as possible.
                            </p>
                        </div>
                        <div className="jumbotron card">
                            <h3><u>Register as a Doctor</u></h3><br></br>
                            <p className="col-10 mx-auto">Please send us an email with all your licenses and certifications attached to we can verify your doctor's background and credentials.
                            Email us at <a href="mailto: 123@gmail.com">register-doctor@rmed.com</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs