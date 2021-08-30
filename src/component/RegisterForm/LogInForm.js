import "./RegisterForm.css";
import React, { useState , useEffect} from "react";
import "./Bootstrap.css";

export default function LogInForm() {
    //use useState hook for input handlings React form
    

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    //store data in our website database --We haven't decide our database yet so I just use localhost
    const endPoint = "localhost:3000";

    function LogIn() {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({  username: username, password: password}),
        }).then((data) => {
            fetch(endPoint).then((response) =>
                response.json().then((data) => setUsername(data),setPassword(data))
            );

            data.json();
        });
    };

    return (

        <div className='container' id="formBorder">

            
            <form className="row g-3" id="form-styling1">
            <div className="col-md-12">
                <h1 id="form-title">Login</h1>
            </div>
            
            <div className="col-md-12">
                <input type="text" class="form-control" id="inputUsername" placeholder="Username" 
                value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br></br>
            </div>

            <div className="col-md-12">
                <input type="password" class="form-control" id="inputPassword" placeholder="Create Password" 
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br></br>
            </div>
            
            <div className="col-md-12">
                <button className="btn btn-primary col-3 mx-auto"  id="button-form" onClick={() => LogIn()}>
                    Log In
                </button>
            </div>
            </form>

        </div>
    

    );
}
