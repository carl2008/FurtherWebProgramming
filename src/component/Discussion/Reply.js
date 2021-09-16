import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { API_URL, USER_INFO } from '../../constants';
import { Spin, Skeleton } from 'antd';
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallReply from "./SmallReply";
import ThumbsVote from "./ThumbsVote";

export default function Reply({ id, reset, reloadReply }) {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [processing, setProcessing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [replies, setReplies] = useState([])
    const [sortReply, setSortReply] = useState('latest')
    const [activeReplyID, setActiveReplyID] = useState('')
    const [replyName, setReplyName] = useState('')
    const [smallReplyValue, setSmallReplyValue] = useState('')
    const [replyNum, setReplyNum] = useState(0)
    const [reload, setReload] = useState(false)
    const [changeNum, setChangeNum] = useState(false)
    const endPoint = `${API_URL}`

    const userInfo = localStorage.getItem(USER_INFO)

    useEffect(() => {
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [])

    const loadReplies = () => {
        setLoading(true)
        setProcessing(true)
        let tempList = []
        fetch(`${endPoint}/discussions/${id}/replies`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    tempList.push({
                        id: data[i]._id,
                        content: data[i].content,
                        authorId: data[i].author._id,
                        authorpic: data[i].author.pic,
                        authorRole: data[i].author.role.charAt(0).toUpperCase() + data[i].author.role.slice(1),
                        author: `${data[i].author.firstName} ${data[i].author.lastName}`,
                        createdAt: data[i].created_at,
                        thumbsup: data[i].thumbsups.length,
                        thumbsdown: data[i].thumbsdowns.length
                    })
                }
                setReplies(tempList)
                setLoading(false)
                setProcessing(false)
            })
    }

    const loadRepNum = () => {
        fetch(`${endPoint}/discussions/${id}`)
            .then(response => response.json())
            .then(data => {
                setReplyNum(Number(data.replies.length) + Number(data.smallreplies.length))
            })
    }

    useEffect(() => {
        loadRepNum()
    }, [reload, changeNum, reloadReply])

    useEffect(() => {
        loadReplies()
        sortReplies()
    }, [reload, reloadReply])

    useEffect(() => {
        setActiveReplyID('')
        setSmallReplyValue('')
    }, [reset])

    useEffect(() => {
        setSmallReplyValue("@" + replyName + " ")
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
        setProcessing(true)
        fetch(`${endPoint}/replies/${replyId}/smallreplies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: smallReplyValue,
                discussion: id,
                author: user._id
            })
        }).then(res => {
            setSmallReplyValue('')
            setProcessing(false)
            setReload(!reload)
            //history.push(`/Discussion/${id}`)
            //history.go(0)
        })
            .catch((err) => console.log(err))
    }

    const resetReply = (newId) => {
        if (newId !== activeReplyID) {
            setSmallReplyValue('')
        }
    }

    const handleDeleteReply = (replyId) => {
        let deleteConfirm = window.confirm("Are you sure you want to delete this reply?")
        if (deleteConfirm) {
            setProcessing(true)
            fetch(`${endPoint}/replies/${replyId}`, {
                method: 'DELETE'
            }).then(res => {
                setProcessing(false)
                setReload(!reload)
                //history.push(`/Discussion/${id}`)
                //history.go(0)
            }).catch((err) => console.log(err))
        }
    }

    return (
        <Spin spinning={processing} tip="Proccessing...">
            <Skeleton active loading={loading}>
                <div><b>{replyNum + (replyNum > 1 ? " replies " : " reply ")}</b>
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
                                                <img src={reply.authorRole === "Doctor" ? "https://i.imgur.com/irK1Y0P.jpg" : reply.authorpic} className="rounded-circle" width="50" alt="User" />
                                                <small className="d-block text-center" style={reply.authorRole === "Admin" ? { color: "red" } : { color: "#676767" }}>{reply.authorRole}</small>
                                            </a>
                                            <div className="media-body ml-3">
                                                <a href="javascript:void(0)" className="text-secondary">{reply.authorRole === "Doctor"? "Dr. "+reply.author : reply.author}</a>
                                                <small className="text-muted ml-2">{(new Date(reply.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                                <div className="mt-3 font-size-sm">
                                                    <p>{reply.content}</p>
                                                </div>
                                                <ThumbsVote repID={reply.id} repType="replies" load={reload} key={reply.id} />
                                                {userInfo && <a href={"#add-smallreply-" + reply.id} className="text-muted" onClick={() => { resetReply(reply.id); setReplyName(reply.author); setActiveReplyID(reply.id); changeReply(reply.author) }}> Reply </a>}
                                            </div>
                                            <div className="text-muted text-center">
                                                {(reply.authorId === user._id || user.role === "admin") && <i className="far fa-trash-alt trashcan-icon" title="Delete Reply" onClick={() => handleDeleteReply(reply.id)}></i>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SmallReply topicId={id} replyId={reply.id} setName={name => { setReplyName(name); changeReply(name); setActiveReplyID(reply.id) }} load={reload} changeNum={() => setChangeNum(!changeNum)} key={reply.id} />
                                <div className="card mt-3 mb-3 ml-5 add-smallreply-section" id={"add-smallreply-" + reply.id} style={(activeReplyID === reply.id) ? { display: "block" } : { display: "none" }}>
                                    <div className="card-body">
                                        <p className="ml-2" style={{ fontSize: '1em' }}><b>Add a reply</b></p>
                                        <p className="ml-2 reply-error-msg" style={userInfo ? { display: "none" } : { display: "block" }}>You must log in to post a reply!</p>
                                        <div className="media forum-item">
                                            <div className="reply-avt"><a href="javascript:void(0)" className="card-link col-1">
                                                <img src={userInfo ? user.role === "doctor" ? "https://i.imgur.com/irK1Y0P.jpg" : user.pic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} className="rounded-circle" width="50" alt="User" />
                                                <small className="d-block text-center text-muted">{userInfo ? `${user.firstName} ${user.lastName}` : `User`}</small>
                                            </a></div>
                                            <div className="media-body ml-3">
                                                <textarea placeholder="Add a new reply" className="add-reply-input" value={smallReplyValue} onChange={(e) => setSmallReplyValue(e.target.value)} disabled={!userInfo}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-sm float-right" type="button" onClick={() => postSmallReply(reply.id)} disabled={!userInfo || !smallReplyValue}>REPLY</button>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Skeleton>
        </Spin>
    )
}