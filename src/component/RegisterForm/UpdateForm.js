import { USER_ID, API_URL } from "../../constants";
import "./RegisterForm.css";
import React, { Component } from "react";
import "./Bootstrap.css";
import axios from "axios";
import { Alert } from 'antd';

export default class UpdateForm extends Component {

    constructor(props) {
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeSpecialties = this.onChangeSpecialties.bind(this);
        this.onChangeIntroduction = this.onChangeIntroduction.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            username: '',
            password: '',
            specialties: '',
            introduction: '',
            role: ''
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/api/users/getOneUser/` + localStorage.getItem(USER_ID))
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
                    specialties: data.specialties,
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
    onChangeSpecialties(e) {
        this.setState({ specialties: e.target.value })
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
            specialties: this.state.specialties,
            introduction: this.state.introduction
        };

        axios.put(`${API_URL}/api/users/userUpdate/${id}`, userObject)
            .then((res) => {
                console.log(res.data)
                console.log('User successfully updated')
                // clear localstorage, log out (WORKS)
                localStorage.clear();
                this.props.history.push(`/`);
                this.props.history.go(0)
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className='container shadow' id="formBorder">
                <h1 id="form-title">Update</h1><br /><br />
                <br/>
                <Alert
                    message="Note: "
                    description="After updating, you will be automatically logged out and will need to log in again."
                    type="warning"
                    showIcon
                />
                <form className="row g-5 pt-3" id="form-styling1" onSubmit={this.onSubmit}>
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
                            value={this.state.password} onChange={this.onChangePassword} />
                        <br></br>
                    </div>
                    {this.state.role === 'doctor' ? (
                        <>
                            <div className="col-md-12" >
                                <input type="text" className="form-control" id="newInputSpecialty" placeholder="Specialties"
                                    value={this.state.specialties} onChange={this.onChangeSpecialties} />
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
