import { useState, useEffect } from "react"
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Reply({ id, setName }) {
    const [replies, setReplies] = useState([])
    const [sortReply, setSortReply] = useState('latest')
    const endPoint = 'https://611fc518c772030017424085.mockapi.io/api/v1/topics/' + id + '/replies'

    const loadReplies = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(data => setReplies(data))
    }

    useEffect(() => {
        loadReplies()
        sortReplies()
    }, [])

    const sortReplies = () => {
        let results = replies
        switch (sortReply) {
            case "latest":
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break;
            case "oldest":
                results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                break;
            case "mostheart":
                results.sort((a, b) => b.hearts - a.hearts)
                break;
        }
        return results
    }

    const handleLike = () => {
        alert('You liked a reply!')
    }

    return (
        <div>
            <select className="custom-select custom-select-sm w-auto mr-1 mb-2" value={sortReply} onChange={(e) => {setSortReply(e.target.value); sortReplies()}}>
                <option value="latest">Sort replies: Latest</option>
                <option value="oldest">Sort replies: Oldest</option>
                <option value="mostheart">Sort replies: Most likes</option>
            </select>
            {sortReplies().map((reply, i) => {
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
                                    <button class="btn btn-xs text-muted has-icon mb-1"><i class="fa fa-heart" aria-hidden="true" onClick={handleLike}></i> {reply.hearts} </button>
                                    <a href={"#add-reply-" + id} class="text-muted" onClick={() => setName(reply.name)}> Reply </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}