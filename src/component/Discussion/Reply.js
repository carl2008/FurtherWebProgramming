import { useState, useEffect } from "react"
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Reply({ id }) {
    const [replies, setReplies] = useState([])
    const endPoint = 'https://611fc518c772030017424085.mockapi.io/api/v1/topics/' + id + '/replies'

    const loadReplies = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(data => setReplies(data))
    }

    useEffect(() => {
        loadReplies()
    }, [])

    return (
        replies.map((reply, i) => {
            return (
                <div class="card mb-2 discussion-replies">
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
                                <button class="btn btn-xs text-muted has-icon"><i class="fa fa-heart" aria-hidden="true"></i>1</button>
                                <a href="javascript:void(0)" class="text-muted">Reply</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}