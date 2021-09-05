import React, { useState, useEffect, useCallback } from 'react';
import { Result, Skeleton, List, Button } from 'antd';
import moment from 'moment';
import './Article.css'

function ArticleComment(props) {
    // temp user id, will change to logged in user id later
    const USER_ID = "612b8998a60dea66123c3835"
    const USER_NAME = "Linh Nguyen"
    const [cmtContent, setCmtContent] = useState('')
    const endPoint = `http://localhost:9000/articles/${props.id}/comments`

    const handleLeaveComment = () => {
        fetch(endPoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: USER_ID,
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
    // useEffect(() => {
        // window.addEventListener("beforeunload", (ev) => {
        //     ev.preventDefault();

        //         return ev.returnValue = 'Are you sure you want to close?';

        // });
    // })

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
                            <p>Signed in as <b>{USER_NAME}</b></p>
                            <button type="submit" class="btn btn-custom">Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ArticleComment;
