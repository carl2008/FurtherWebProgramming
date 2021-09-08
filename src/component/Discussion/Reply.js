import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallReply from "./SmallReply";
import ThumbsVote from "./ThumbsVote";

export default function Reply({ id, reset, replyNumber }) {
    const history = useHistory()
    const [replies, setReplies] = useState([])
    const [sortReply, setSortReply] = useState('latest')
    const [activeReplyID, setActiveReplyID] = useState('')
    const [replyName, setReplyName] = useState('')
    const [smallReplyValue, setSmallReplyValue] = useState('')
    const [reload, setReload] = useState(false)
    const endPoint = 'http://localhost:9000/'

    const USER_ID = "6138efaf983a412d88bf236d"

    const loadReplies = () => {
        let tempList = []
        fetch(`${endPoint}discussions/${id}/replies`)
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i< data.length; i++){
                    tempList.push({
                        id: data[i]._id,
                        content: data[i].content,
                        author: `${data[i].author.firstName} ${data[i].author.lastName}`,
                        createdAt: data[i].created_at,
                        thumbsup: data[i].thumbsups.length,
                        thumbsdown: data[i].thumbsdowns.length
                    })
                }
                setReplies(tempList)
            })
    }

    useEffect(() => {
        loadReplies()
        sortReplies()
    }, [reload])

    useEffect(() => {
        setActiveReplyID('')
        setSmallReplyValue('')
    }, [reset])

    useEffect(() => {
        setSmallReplyValue("@"+replyName+" ")
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
            case "mostvotes":
                results.sort((a, b) => b.thumbsup - a.thumbsup || a.thumbsdown - b.thumbsdown)
                break;
        }
        return results
    }

    const changeReply = (name) => {
        setSmallReplyValue("@" + name + " " + smallReplyValue)
    }

    const postSmallReply = (replyId) => {
        fetch(`${endPoint}replies/${replyId}/smallreplies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: smallReplyValue,
                author: USER_ID
            })
        }).then(res => {
            setSmallReplyValue('')
            history.push(`/Discussion/${id}`)
            history.go(0)
        })
        .catch((err) => console.log(err))
    }

    const resetReply = (newId) => {
        if(newId!==activeReplyID){
            setSmallReplyValue('')
        }
    }

    return (
        <div><b>{replyNumber+" replies "}</b>
            <select className="custom-select custom-select-sm w-auto mr-1 mb-2" value={sortReply} onChange={(e) => { setSortReply(e.target.value); setReload(!reload); }}>
                <option value="latest">Sort replies: Latest</option>
                <option value="oldest">Sort replies: Oldest</option>
                <option value="mostvotes">Sort replies: Most votes</option>
            </select>
            {sortReplies().map((reply, i) => {
                return (
                    <div key={i}>
                        <div className="card mb-2 discussion-replies">
                            <div className="card-body">
                                <div className="media forum-item">
                                    <a href="javascript:void(0)" className="card-link">
                                        <img src="https://www.markuptag.com/images/user-icon.jpg" className="rounded-circle" width="50" alt="User" />
                                        <small className="d-block text-center text-muted">Doctor</small>
                                    </a>
                                    <div className="media-body ml-3">
                                        <a href="javascript:void(0)" className="text-secondary">{reply.author}</a>
                                        <small className="text-muted ml-2">{(new Date(reply.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                        <div className="mt-3 font-size-sm">
                                            <p>{reply.content}</p>
                                        </div>
                                        <ThumbsVote repID={reply.id} repType="replies" load={reload} key={reply.id}/>
                                        <a href={"#add-smallreply-"+reply.id} className="text-muted" onClick={() => {resetReply(reply.id); setReplyName(reply.author); setActiveReplyID(reply.id); changeReply(reply.author)}}> Reply </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SmallReply replyId={reply.id} setName={name => {setReplyName(name); changeReply(name); setActiveReplyID(reply.id)}} load={reload} key={reply.id}/>
                        <div className="card mt-3 mb-3 ml-5 add-smallreply-section" id={"add-smallreply-"+reply.id} style={(activeReplyID===reply.id) ? { display: "block" } : { display: "none" }}>
                            <div className="card-body">
                                <p className="ml-2" style={{ fontSize: '1em' }}><b>Add a reply</b></p>
                                <div className="media forum-item">
                                    <a href="javascript:void(0)" className="card-link">
                                        <img src="https://www.markuptag.com/images/user-icon.jpg" className="rounded-circle" width="50" alt="User" />
                                        <small className="d-block text-center text-muted">User</small>
                                    </a>
                                    <div className="media-body ml-3">
                                        <textarea placeholder="Add a new reply" className="add-reply-input" value={smallReplyValue} onChange={(e) => setSmallReplyValue(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm float-right" type="button" onClick={() => postSmallReply(reply.id)}>REPLY</button>
                                <br/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}