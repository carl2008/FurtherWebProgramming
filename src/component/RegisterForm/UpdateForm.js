import "./RegisterForm.css";
import React, { useState} from "react";
import "./Bootstrap.css";

export default function UpdateForm() {
    //use useState hook for input handlings React form
    
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [emailAddress, setEmailAddress] = useState([]);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    

    //store data in our website database --We haven't decide our database yet so I just use localhost
    // supposed this database is for doctors
    const endPoint = "localhost:3000/user";

    function save() {
        fetch(endPoint, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ firstName: firstName , lastName:lastName , emailAddress: emailAddress,
            username: username, password: password }),
        }).then((data) => {
            fetch(endPoint).then((response) =>
                response.json().then((data) => setFirstName(data),setLastName(data),
                 setEmailAddress(data),setUsername(data),setPassword(data))
            );

            data.json();
        });
    };

    

    

    return (

        <div className='container' id="formBorder">

            
            <form className="row g-5">
            <div className="col-md-12">
                <h1>Update</h1>
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
                <input type="password" class="form-control" id="inputPassword" placeholder="Change Password" 
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br></br>
            </div>
                   
            <div className="col-md-12">
                <button className="btn btn-primary col-3 mx-auto" onClick={() => save()}>
                    Update
                </button>
            </div>
            </form>

        </div>
    

    );
}
