import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { API_URL, USER_INFO } from '../../constants';
import { Redirect } from "react-router-dom";
import { Spin } from 'antd';
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DiscussionForm(props) {
    const history = useHistory()
    const userInfo = localStorage.getItem(USER_INFO)

    const endPoint = `${API_URL}`

    const [user, setUser] = useState({})

    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [])

    const formValidate = () => {
        setError('')
        if (!content.trim() || !title.trim()) {
            setError('Please fill out both the title and content of the discussion before submitting.')
            setSubmitted(false)
            return false
        } else return true;
    }

    const handlePostDiscussion = () => {
        if (id === null) {
            setLoading(true)
            fetch(endPoint + `/users/${user._id}/discussions`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    history.push(`/Discussion/${data._id}`)
                    history.go(0)
                })
                .catch((err) => console.log(err))
        } else {
            setLoading(true)
            fetch(endPoint + `/discussions/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    lastUpdated: new Date(Date.now())
                })
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    history.push(`/Discussion/${data._id}`);
                    history.go(0)
                })
                .catch((err) => console.log(err))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        formValidate() && handlePostDiscussion()
    }

    useEffect(() => {
        if (content && submitted === false) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    })

    useEffect(() => {
        if (props.location.id) {
            setId(props.location.id)
            setTitle(props.location.title)
            setContent(props.location.content)
        }
    }, [props.location.id])

    return (
        <>
            {userInfo ?
                <div className="container">
                    <Spin spinning={loading} tip="Proccessing...">
                        {id ? <h3>Edit your discussion</h3> : <h3>Post a new discussion</h3>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <p><i>You are posting as {`${user.role} ${user.firstName} ${user.lastName}`}</i></p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="threadTitle"><b>Title</b></label>
                                <input type="text" className="form-control" id="threadTitle" placeholder="Enter title" autofocus="" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label for="threadContent"><b>Content</b></label>
                                <textarea className="form-control summernote" style={{ display: 'block' }} id="threadContent" placeholder="Post your content here" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Post</button>
                        </form></Spin>
                </div> : <Redirect to="/Discussion" />}
        </>
    )
}