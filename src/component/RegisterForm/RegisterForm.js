import "./RegisterForm.css";
import React, { useState } from "react";
import "./Bootstrap.css";

export default function RegisterForm() {
    //use useState hook for input handlings React form
    
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [emailAddress, setEmailAddress] = useState([]);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);


    //store data in our website database --We haven't decide our database yet so I just use localhost
    const endPoint = "localhost:3000";

    function save() {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ firstName: firstName , lastName:lastName , emailAddress: emailAddress,
            username: username, password: password}),
        }).then((data) => {
            fetch(endPoint).then((response) =>
                response.json().then((data) => setFirstName(data))
            );

            data.json();
        });
    };

    return (

        <div className='container' id="formBorder">

            
            <form className="row g-5"  id="form-styling1">
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
                value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <br></br>
            </div>
            
            <div className="col-md-12">
                <input type="text" class="form-control" id="inputEmailAddress" placeholder="Email Address" 
                value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                <br></br>
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
                <button className="btn btn-primary col-3 mx-auto" id="button-form" onClick={() => save()}>
                    Register
                </button>
            </div>
            </form>

        </div>
    

    );
}
