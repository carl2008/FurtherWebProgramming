import { USER_NAME, USER_ID, USER_ROLE } from '../../constants'
import { API_URL } from '../../constants'
import React, { useState} from 'react';
import './Article.css'

function ArticleComment(props) {
    // temp user id, will change to logged in user id later
    const userID = localStorage.getItem(USER_ID).toString()
    const userName = localStorage.getItem(USER_NAME).toString()

    const [cmtContent, setCmtContent] = useState('')
    const endPoint = `${API_URL}/articles/${props.id}/comments`

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cmtContent)
        handleLeaveComment()
    }

    return (
        <>
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
                            <p>Signed in as <b>{userName}</b></p>
                            <button type="submit" class="btn btn-custom">Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ArticleComment;
