import { USER_INFO, USER_NAME, USER_TOKEN, USER_ROLE, USER_ID } from '../../constants'
import "./RegisterForm.css";
import React, { useState, useEffect } from "react";
import "./Bootstrap.css";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router-dom";

export default function LogInForm() {
    //use useState hook for input handlings React form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    // const handleLogin = () => {
    //     const userInfo = localStorage.getItem("userInfo");

    //     if(userInfo){
    //        history.push("/user");
    //   }
    // }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                header: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true);

            const { data } = await axios.post(
                "http://localhost:9000/api/users/login",
                {
                    username,
                    password,
                },
                config
            );

            localStorage.setItem(USER_INFO, JSON.stringify(data));
            localStorage.setItem(USER_NAME, data.username);
            localStorage.setItem(USER_TOKEN, data.token);
            localStorage.setItem(USER_ROLE, data.role);
            localStorage.setItem(USER_ID, data._id);
            setLoading(false);
            setRedirect(true)
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    if (redirect) {
        console.log("user is directed");
        history.push("/");
        history.go(0)
        console.log('directed');
    }

    return (

        <div>


            <div className='container' id="formBorder">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <form className="row g-3" id="form-styling1" onSubmit={submitHandler}>
                    <div className="col-md-12">
                        <h1 id="form-title">Login</h1>
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" id="inputUsername" placeholder="Username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Create Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <button className="btn btn-primary col-3 mx-auto" id="button-form" >
                            {/* onClick={() => handleLogin()} */}
                            Log In
                        </button>
                    </div>
                </form>

            </div>
        </div>

    );
}
