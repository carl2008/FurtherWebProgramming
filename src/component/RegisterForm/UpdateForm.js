import { USER_ID } from "../../constants";
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
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            username: '',
            password: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9000/api/users/getOneUser/:id' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    emailAddress: res.data.emailAddress,
                    username: res.data.username,
                    password: res.data.password,
                });
            })
            .catch((error) => {
                console.log(error);
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

    onSubmit(e) {
        e.preventDefault()
        let id = localStorage.getItem(USER_ID)
        const userObject = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          emailAddress: this.state.emailAddress,
          username: this.state.username,
          password: this.state.password,
        };
    
        axios.put(`http://localhost:9000/api/users/userUpdate/${id}`, userObject)
          .then((res) => {
            console.log(res.data)
            console.log('User successfully updated')
          }).catch((error) => {
            console.log(error)
          })
    
        // Redirect to Student List 
        this.props.history.push('/')
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
                        <input type="text" class="form-control" id="inputFirstName" placeholder="FirstName"
                            value={this.state.firstName} onChange={this.onChangeFirstName} />
                        <br></br>
                    </div>

                    <div className="col-md-6">
                        <input type="text" class="form-control" id="inputLastName" placeholder="LastName"
                            value={this.state.lastName} onChange={this.onChangeLastName} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="text" class="form-control" id="inputEmailAddress" placeholder="Email Address"
                            value={this.state.emailAddress} onChange={this.onChangeEmailAddress} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="text" class="form-control" id="inputUsername" placeholder="Username"
                            value={this.state.username} onChange={this.onChangeUsername} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Change Password"
                            value={this.state.password} onChange={this.onChangePassword} />
                        <br></br>
                    </div>

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
