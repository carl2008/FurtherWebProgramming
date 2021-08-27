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
                <div class="card mb-2 discussion-smallreplies">
                    <div class="card-body">
                        <div class="media forum-item">
                            <a href="javascript:void(0)" class="card-link">
                                <img src={reply.avatar} class="rounded-circle" width="50" alt="User" />
                                <small class="d-block text-center text-muted">Doctor</small>
                            </a>
                            <div class="media-body ml-3">
                                <a href="javascript:void(0)" class="text-secondary">{reply.name}</a>
                                <small class="text-muted ml-2">{(new Date(reply.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                <div class="mt-3 font-size-sm">
                                    <p>{reply.content}</p>
                                </div>
                                <button class="btn btn-xs text-muted has-icon mb-1"><i class="fa fa-heart" aria-hidden="true" onClick={handleLike}></i> {reply.hearts} </button>
                                <a href={"#add-smallreply-" + replyId} class="text-muted" onClick={() => setName(reply.name)}> Reply </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}