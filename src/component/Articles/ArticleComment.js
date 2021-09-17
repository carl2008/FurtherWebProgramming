import { USER_ID, USER_INFO } from '../../constants'
import { API_URL } from '../../constants'
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import './Article.css'

function ArticleComment(props) {
    // Get logged in user
    const userID = localStorage.getItem(USER_ID)
    const userInfo = localStorage.getItem(USER_INFO)
    const [user, setUser] = useState(null)

    // Cmt state
    const [cmtContent, setCmtContent] = useState('')

    // API endPoint
    const endPoint = `${API_URL}/articles/${props.id}/comments`

    // Add new comment
    const handleLeaveComment = () => {
        fetch(endPoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: userID,
                content: cmtContent,
            })
        }).then(res => {
            setCmtContent('')
            props.reloadPage();
        }).catch((err) => console.log(err))
    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLeaveComment()
    }

    // load logged in user
    useEffect(() => {
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [userInfo])

    return (
        <>
            {userInfo ?
                // Only logged in users can comment
                <div class="reply-form card shadow mb-5">
                    <div className="card-body">
                        <h4>Leave a Reply</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="d-flex my-3">
                                <div class="comment-img mr-3"><img src="https://i.ibb.co/N6SXWfm/Price-Co-1.png" alt="" /></div>
                                <textarea name="comment" class="form-control" placeholder="Enter your comment" required
                                    value={cmtContent}
                                    onChange={(e) => setCmtContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-between">
                                {user && <p>Signed in as <b>{user.firstName} {user.lastName}</b></p>}
                                <button type="submit" class="btn btn-custom">Post Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div class="reply-form card shadow mb-5">
                    <div className="card-body text-center">
                        <div className="py-4">Please <Link to={`/Login`}>login</Link> to leave a comment.</div>
                    </div>
                </div>
            }

        </>
    )
}

export default ArticleComment;
