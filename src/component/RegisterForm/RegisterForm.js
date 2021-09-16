import { USER_INFO, API_URL } from '../../constants'
import "./RegisterForm.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Bootstrap.css";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router-dom";

export default function RegisterForm() {
    const history = useHistory();
    //use useState hook for input handlings React form

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false)

    const userInfo = localStorage.getItem(USER_INFO)


    const submitHandler = async (e) => {
        e.preventDefault();

        // error handle here using if cases: put the following codes under else case
        setMessage(null)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };

            setLoading(true);

            const { data } = await axios.post(
                `${API_URL}/api/users`,
                { firstName, lastName, emailAddress, username, password },
                config
            );
            setLoading(false);
            setFirstName('')
            setLastName('')
            setEmailAddress('')
            setUsername('')
            setPassword('')
            alert('Account registration successful! Please log in with your new account.')
            setRedirect(true)
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    if(redirect){
        return <Redirect to="/Login"/>
    }

    if(userInfo){
        return <Redirect to="/"/>
    }


    return (
        <div style={{minHeight: "500px"}}>
            {error && <ErrorMessage variant = "danger">{error}</ErrorMessage>}
            {loading && <Loading/>}
            <div className='container shadow' id="formBorder">

                <form className="row g-5" id="form-styling1" onSubmit={submitHandler}>
                    <div className="col-md-12">
                        <h1 id="form-title">Sign Up</h1>
                    </div>
                    <div className="col-md-6">
                        <input type="text" class="form-control" id="inputFirstName" placeholder="FirstName"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-6">
                        <input type="text" class="form-control" id="inputLastName" placeholder="LastName"
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="text" class="form-control" id="inputEmailAddress" placeholder="Email Address"
                            value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="text" class="form-control" id="inputUsername" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Create Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <button className="btn btn-primary col-3 mx-auto" id="button-form">
                            Register
                        </button>
                    </div>
                </form>

            </div>
        </div>


    );
}