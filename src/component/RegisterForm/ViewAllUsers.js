import { USER_ID, USER_INFO, API_URL } from "../../constants";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Spin } from 'antd';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewAllUsers() {
    const userID = localStorage.getItem(USER_ID)
    const endPoint = `${API_URL}`
    const [redirect, setRedirect] = useState(false)

    const [user, setUser] = useState({})
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (userID) {
            fetch(`${endPoint}/api/users/getOneUser/${userID}`)
                .then((response) => {
                    if (!response.ok) throw new Error(response.status);
                    else return response.json();
                })
                .then(data => {
                    setUser(data)
                    if (data.role !== "admin") setRedirect(true);
                })
        } else {
            setRedirect(true)
        }
    }, [])

    const loadUsers = () => {
        setLoading(true)
        fetch(`${endPoint}/api/users/getUsers`)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                setUserList(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        loadUsers()
    }, [reload])

    const changeRole = (id) => {
        let change = false
        if (id === user._id) {
            let confirm = window.confirm("WARNING: This is your Admin account. Changing the role means you won't be able to access Admin functions anymore.\nProceed anyway?")
            if (confirm) {
                change = true
            }
        } else {
            change = true
        }
        if (change) {
            let newRole = document.querySelector(`#selection-${id}`).value
            setLoading(true)
            fetch(`${endPoint}/api/users/userUpdateRole/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: newRole
                })
            })
                .then((response) => {
                    if (!response.ok) throw new Error(response.status);
                    else return response.json();
                })
                .then(data => {
                    if(id === user._id){
                        localStorage.setItem(USER_INFO,JSON.stringify(data))
                    }
                    setReload(!reload)
                    setLoading(false)
                })
        }
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <h5>This list is for Admins only. You can change the role of each user account here.</h5><br/>
            <Spin spinning={loading} tip="Proccessing...">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col">Change role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((aUser, index) => {
                                return (<tr>
                                    <th scope="row">{index}</th>
                                    <td>{aUser.firstName}</td>
                                    <td>{aUser.lastName}</td>
                                    <td>{aUser.emailAddress}</td>
                                    <td>{aUser.username}</td>
                                    <td>{aUser.role.charAt(0).toUpperCase() + aUser.role.slice(1)}</td>
                                    <td>
                                        <select id={`selection-${aUser._id}`}>
                                            {aUser.role !== "doctor" && <option value="doctor">Doctor</option>}
                                            {aUser.role !== "admin" && <option value="admin">Admin</option>}
                                            {aUser.role !== "user" && <option value="user">User</option>}
                                        </select>
                                        <button className="btn btn-warning btn-sm ml-2 mt-1 mb-1" onClick={() => changeRole(aUser._id)}>Confirm change</button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </Spin>
        </div>
    )
}