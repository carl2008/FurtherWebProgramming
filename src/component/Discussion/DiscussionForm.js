import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DiscussionForm(props) {
    const history = useHistory()
    const USER_ID = "6138dd80d8bb3e4ab8e48fe4"
    
    const endPoint = "http://localhost:9000"

    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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
            fetch(endPoint + `/users/${USER_ID}/discussions`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
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
        <div className="container">
            {id ? <h3>Post a new discussion</h3> : <h3>Edit your discussion</h3>}
            {error && <p style={{color: "red"}}>{error}</p>}
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
            </form>
        </div>
    )
}