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
        // if(JSON.parse(localStorage.getItem(USER_INFO)).role === 'doctor'){
        //     this.state = {
        //         firstName: '',
        //         lastName: '',
        //         emailAddress: '',
        //         username: '',
        //         password: '',
        //         specialities: '',
        //         introduction: ''
        //     }
        // }
        // else{
        //     this.state = {
        //         firstName: '',
        //         lastName: '',
        //         emailAddress: '',
        //         username: '',
        //         password: '',
        //     }
        // }
    }

    componentDidMount() {
        // axios.get('http://localhost:9000/api/users/getOneUser/:id' + this.props.match.params.id)
        //     .then(res => {
        //         this.setState({
        //             firstName: res.data.firstName,
        //             lastName: res.data.lastName,
        //             emailAddress: res.data.emailAddress,
        //             username: res.data.username,
        //             password: res.data.password,
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
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
                    specialities: data.specialities,
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
            specialities: this.state.specialities,
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
    //use useState hook for input handlings React form
    // const history = useHistory();

    // const [firstName, setFirstName] = useState([]);
    // const [lastName, setLastName] = useState([]);
    // const [emailAddress, setEmailAddress] = useState([]);
    // const [username, setUsername] = useState([]);
    // const [password, setPassword] = useState([]);
    // const [message, setMessage] = useState(null);
    // const [error, setError] = useState(false);

    //store data in our website database --We haven't decide our database yet so I just use localhost
    // supposed this database is for doctors
    // const endPoint = "http://localhost:9000/api/users";

    // function save() {
    //     fetch(endPoint, {
    //         method: "PUT",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({ firstName: firstName , lastName:lastName , emailAddress: emailAddress,
    //         username: username, password: password }),
    //     }).then((data) => {
    //         fetch(endPoint).then((response) =>
    //             response.json().then((data) => setFirstName(data),setLastName(data),
    //              setEmailAddress(data),setUsername(data),setPassword(data))
    //         );

    //         data.json();
    //     });
    // };
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
                            value={this.state.password} onChange={this.onChangePassword} />
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
