import { useState, useEffect } from "react"
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallReply from "./SmallReply";

export default function Reply({ id, reset }) {
    const [replies, setReplies] = useState([])
    const [sortReply, setSortReply] = useState('latest')
    const [activeReplyID, setActiveReplyID] = useState('')
    const [replyName, setReplyName] = useState('')
    const [replyValue, setReplyValue] = useState('')
    const [reload, setReload] = useState(false)
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

    useEffect(() => {
        setActiveReplyID('')
        setReplyValue('')
    }, [reset])

    useEffect(() => {
        setReplyValue("@"+replyName+" ")
    }, [activeReplyID])

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

    const changeReply = (name) => {
        setReplyValue("@" + name + " " + replyValue)
    }

    const sendSmallReply = () => {
        alert(replyValue)
    }

    const resetReply = (newId) => {
        if(newId!==activeReplyID){
            setReplyValue('')
        }
    }

    return (
        <div>
            <select className="custom-select custom-select-sm w-auto mr-1 mb-2" value={sortReply} onChange={(e) => { setSortReply(e.target.value); setReload(!reload); sortReplies(); }}>
                <option value="latest">Sort replies: Latest</option>
                <option value="oldest">Sort replies: Oldest</option>
                <option value="mostheart">Sort replies: Most likes</option>
            </select>
            {sortReplies().map((reply, i) => {
                return (
                    <div>
                        <div className="card mb-2 discussion-replies">
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
                                        <a href={"#add-smallreply-"+reply.id} className="text-muted" onClick={() => {resetReply(reply.id); setReplyName(reply.name); setActiveReplyID(reply.id); changeReply(reply.name)}}> Reply </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SmallReply topicId={id} replyId={reply.id} setName={name => {setReplyName(name); changeReply(name); setActiveReplyID(reply.id)}} load={reload}/>
                        <div className="card mt-3 mb-3 ml-5 add-smallreply-section" id={"add-smallreply-"+reply.id} style={(activeReplyID===reply.id) ? { display: "block" } : { display: "none" }}>
                            <div className="card-body">
                                <p className="ml-2" style={{ fontSize: '1em' }}><b>Add a reply</b></p>
                                <div className="media forum-item">
                                    <a href="javascript:void(0)" className="card-link">
                                        <img src="https://www.markuptag.com/images/user-icon.jpg" className="rounded-circle" width="50" alt="User" />
                                        <small className="d-block text-center text-muted">User</small>
                                    </a>
                                    <div className="media-body ml-3">
                                        <textarea placeholder="Add a new reply" className="add-reply-input" value={replyValue} onChange={(e) => setReplyValue(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm float-right" type="button" onClick={sendSmallReply}>REPLY</button>
                                <br/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}