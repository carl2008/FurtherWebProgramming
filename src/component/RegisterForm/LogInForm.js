import "./RegisterForm.css";
import React, { useState, useEffect } from "react";
import "./Bootstrap.css";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router-dom";

export default function LogInForm({history}) {
    //use useState hook for input handlings React form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
   const history2 = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log("user is directed");
        console.log(userInfo);
        if(userInfo ){
           history2.push("/user");
           console.log('directed');
      }
   }, [history]);

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
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };
 
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
