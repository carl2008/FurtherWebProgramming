import "./RegisterForm.css";
import React, { useState, useEffect } from "react";
import "./Bootstrap.css";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function LogInForm() {
    //use useState hook for input handlings React form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
   // useEffect(() => {
     //   const userInfo = localStorage.getItem("userInfo");

   //     if(userInfo){

  //          history.push("/mynotes");
   //     }

  //  }, [history]);

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
                "/api/users/login",
                {
                    username,
                    password,
                },
                config
            );
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };
 
    return (

        <div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}

            <div className='container' id="formBorder">
                <form className="row g-3" id="form-styling1" onSubmit={submitHandler}>
                    <div className="col-md-12">
                        <h1 id="form-title">Login</h1>
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
                            Log In
                        </button>
                    </div>
                </form>

            </div>
        </div>

    );
}
