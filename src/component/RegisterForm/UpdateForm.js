import { USER_ID, USER_INFO, USER_NAME } from "../../constants";
import "./RegisterForm.css";
import React, { Component } from "react";
import "./Bootstrap.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default class UpdateForm extends Component {

    constructor(props) {
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeSpecialities = this.onChangeSpecialities.bind(this);
        this.onChangeIntroduction = this.onChangeIntroduction.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            username: '',
            password: '',
            specialities: '',
            introduction: '',
            role: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/api/users/getOneUser/' + localStorage.getItem(USER_ID))
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    emailAddress: data.emailAddress,
                    username: data.username,
                    password: data.password,
                    specialities: data.specialties,
                    introduction: data.introduction,
                    role: data.role
                })
                console.log(this.state)
            })
    }

    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }

    onChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }

    onChangeEmailAddress(e) {
        this.setState({ emailAddress: e.target.value })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }
    
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onChangeSpecialities(e) {
        this.setState({ specialities: e.target.value })
    }
    onChangeIntroduction(e) {
        this.setState({ introduction: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        let id = localStorage.getItem(USER_ID)
        const userObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress,
            username: this.state.username,
            password: this.state.password,
            specialities: this.state.specialties,
            introduction: this.state.introduction
        };

        axios.put(`http://localhost:9000/api/users/userUpdate/${id}`, userObject)
            .then((res) => {
                console.log(res.data)
                console.log('User successfully updated')
            }).catch((error) => {
                console.log(error)
            })
        // Set localStorage to new info (DOESN'T WORK)
        // localStorage.setItem(USER_INFO, userObject)
        // localStorage.setItem(USER_NAME, userObject.username)

        // Redirect to Student List 
        // this.props.history.push('/')

        // clear localstorag, log out (WORKS)
        localStorage.clear();
        this.props.history.push(`/`);
        this.props.history.go(0)
    }
    
    render() {
        return (

            <div className='container' id="formBorder">

                <form className="row g-5" id="form-styling1" onSubmit={this.onSubmit}>
                    <div className="col-md-12">
                        <h1 id="form-title">Update</h1>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" id="inputFirstName" placeholder="FirstName"
                            value={this.state.firstName} onChange={this.onChangeFirstName} />
                        <br></br>
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" id="inputLastName" placeholder="LastName"
                            value={this.state.lastName} onChange={this.onChangeLastName} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" id="inputEmailAddress" placeholder="Email Address"
                            value={this.state.emailAddress} onChange={this.onChangeEmailAddress} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" id="inputUsername" placeholder="Username"
                            value={this.state.username} onChange={this.onChangeUsername} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Change Password"
                            onChange={this.onChangePassword} />
                        <br></br>
                    </div>
                    {this.state.role === 'doctor' ? (
                        <>
                            <div className="col-md-12" >
                                <input type="text" className="form-control" id="newInputSpecialty" placeholder="Specialties"
                                    value={this.state.specialities} onChange={this.onChangeSpecialities} />
                                <br></br>
                            </div>
                            <div className="col-md-12" >
                                <input type="text" class="form-control" id="newInputIntroduction" placeholder="Introduction"
                                    value={this.state.introduction} onChange={this.onChangeIntroduction} />
                                <br></br>
                            </div>
                        </>
                    ) : ""}
                    <div className="col-md-12">
                        <button className="btn btn-primary col-3 mx-auto" id="button-form">
                            Update
                        </button>
                    </div>
                </form>

            </div>

        )
    }
}
