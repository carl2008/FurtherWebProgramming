import { useState, useEffect } from "react"
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SmallReply({ topicId, replyId, setName, load }) {
    const [smallRep, setSmallRep] = useState([])
    const endPoint = 'https://611fc518c772030017424085.mockapi.io/api/v1/topics/' + topicId + '/replies/' + replyId + '/smallreplies'

    const loadSmallReplies = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(data => setSmallRep(data))
    }

    useEffect(() => {
        loadSmallReplies()
    }, [load])

    const handleLike = () => {
        alert('You liked a small reply!')
    }

    return (
        smallRep.map((reply, i) => {
            return (
                <div className="card mb-2 discussion-smallreplies">
                    <div className="card-body">
                        <div className="media forum-item">
                            <a href="javascript:void(0)" className="card-link">
                                <img src={reply.avatar} className="rounded-circle" width="50" alt="User" />
                                <small className="d-block text-center text-muted">Doctor</small>
                            </a>
                            <div className="media-body ml-3">
                                <a href="javascript:void(0)" className="text-secondary">{reply.name}</a>
                                <small className="text-muted ml-2">{(new Date(reply.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                <div className="mt-3 font-size-sm">
                                    <p>{reply.content}</p>
                                </div>
                                <button className="btn btn-xs text-muted has-icon mb-1"><i className="fa fa-heart" aria-hidden="true" onClick={handleLike}></i> {reply.hearts} </button>
                                <a href={"#add-smallreply-" + replyId} className="text-muted" onClick={() => setName(reply.name)}> Reply </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}