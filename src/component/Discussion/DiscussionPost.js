import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import Reply from "./Reply";
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DiscussionPost() {
    let { id } = useParams()
    const history = useHistory()
    const [replyValue, setReplyValue] = useState('')
    const [loadDiscussionPost, setLoadDiscussionPost] = useState(false)
    const [discussionPost, setDiscussionPost] = useState({})
    const [resetRepValue, setResetRepValue] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const endPoint = "http://localhost:9000/discussions/" + id

    const USER_ID = "6138e0cdd8bb3e4ab8e49005"
    const USER_ID2 = "6138dd80d8bb3e4ab8e48fe4"

    const load = () => {
        setLoadDiscussionPost(true)
        let discussion = ''
        fetch(endPoint)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                else return response.json();
            })
            .then(data => {
                let allReplies = data.replies
                let smallNum = 0
                for (let i = 0; i < allReplies.length; i++) {
                    smallNum = Number(smallNum) + Number(allReplies[i].smallreplies.length)
                }
                discussion = {
                    id: data._id,
                    title: data.title,
                    content: data.content,
                    authorId: data.author._id,
                    author: `${data.author.firstName} ${data.author.lastName}`,
                    createdAt: data.created_at,
                    totalReplyCount: Number(data.replies.length) + smallNum
                }
                setDiscussionPost(discussion)
                console.log(discussionPost)
                setLoadDiscussionPost(false)
            })
            .catch((err) => {
                setLoadDiscussionPost(false)
                console.log(err)
            })
    }

    useEffect(() => {
        load()
    }, [])

    const changeReply = (replyName) => {
        setReplyValue("@" + replyName + " " + replyValue)
    }

    const postReply = () => {
        fetch(endPoint + "/replies", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: replyValue,
                author: USER_ID
            })
        }).then(res => {
            setReplyValue('')
            history.push(`/Discussion/${id}`)
            history.go(0)
        })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />
            <div className="container">
                <div className="main-body p-0">
                    <div className="inner-wrapper">
                        {/*Inner sidebar*/}
                        <div className={showSideBar ? "inner-sidebar active" : "inner-sidebar"} id="inner-sidebar">
                            {/*Inner sidebar header*/}
                            <div className="inner-sidebar-header justify-content-center">
                                <a className="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none" href="#" onClick={() => setShowSideBar(!showSideBar)}><i className="fas fa-bars"></i></a>
                            </div>
                            {/*Inner sidebar header*/}

                            {/*Inner sidebar body*/}
                            <div className="inner-sidebar-body p-0">
                                <div className="p-3 h-100" data-simplebar="init">
                                    <div className="simplebar-wrapper" style={{ margin: '-16px' }}>
                                        <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div>
                                        <div className="simplebar-mask">
                                            <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                                                <div className="simplebar-content-wrapper" style={{ height: '100%' }}>
                                                    <div className="simplebar-content" style={{ padding: '16px' }}>
                                                        <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon active">Current Thread</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="simplebar-placeholder" style={{ width: '234px', height: '292px' }}></div>
                                    </div>
                                    {/*<div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: '0px', display: 'none'}}></div></div>
                                <div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: '151px', display: 'block', transform: 'translate3d(0px, 0px, 0px)'}}></div></div>*/}
                                </div>
                            </div>
                            {/*Inner sidebar body*/}
                        </div>
                        {/*Inner sidebar*/}

                        {/*Inner main*/}
                        <div className="inner-main">
                            {/*Inner main header*/}
                            <div className="inner-main-header">
                                <a className="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none" href="#" onClick={() => setShowSideBar(!showSideBar)}><i className="fas fa-bars"></i></a>
                            </div>
                            {/*Inner main header*/}

                            {/*Forum Detail*/}
                            <div className="inner-main-body p-2 p-sm-3 forum-content" style={{ display: 'block' }}>
                                <a href="/Discussion" className="btn btn-light btn-sm mb-3 has-icon" ><i className="fa fa-arrow-left mr-2"></i>Back to Discussions</a>
                                <div className="card mb-2 discussion-question">
                                    <div className="card-body">
                                        <div className="media forum-item">
                                            <a href="javascript:void(0)" className="card-link">
                                                <img src="https://i.stack.imgur.com/l60Hf.png" className="rounded-circle" width="50" alt="User" />
                                                <small className="d-block text-center text-muted">Patient</small>
                                            </a>
                                            <div className="media-body ml-3">
                                                <a href="javascript:void(0)" className="text-secondary">{discussionPost.author}</a>
                                                <small className="text-muted ml-2">- {(new Date(discussionPost.createdAt)).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                                <h5 className="mt-1">{discussionPost.title}</h5>
                                                <div className="mt-3 font-size-sm">
                                                    <p>{discussionPost.content}</p>
                                                </div>
                                                <a href={"#add-reply-" + id} className="text-muted" onClick={() => changeReply(discussionPost.author)}>Reply</a>
                                            </div>
                                            <div className="text-muted text-center">
                                                {(discussionPost.authorId === USER_ID2) && <i className="far fa-trash-alt trashcan-icon" title="Delete Post"></i>}
                                                <br/><br/><br/><br/>
                                                <span><i className="far fa-comment ml-2"></i> {discussionPost.totalReplyCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 mb-3" id={"add-reply-" + discussionPost.id}>
                                    <div className="card-body">
                                        <p className="ml-2" style={{ fontSize: '1.2em' }}><b>Join the discussion</b></p>
                                        <div className="media forum-item">
                                            <a href="javascript:void(0)" className="card-link">
                                                <img src="https://www.markuptag.com/images/user-icon.jpg" className="rounded-circle" width="50" alt="User" />
                                                <small className="d-block text-center text-muted">User</small>
                                            </a>
                                            <div className="media-body ml-3">
                                                <textarea placeholder="Add a new reply" className="add-reply-input" value={replyValue} onChange={(e) => setReplyValue(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-sm float-right" type="button" onClick={() => postReply()}>REPLY</button>
                                    </div>
                                </div>
                                {/*Replies section*/}
                                <Reply id={id} reset={resetRepValue} replyNumber={discussionPost.totalReplyCount} key={id} />
                            </div>
                        </div>
                        {/*Inner main*/}
                    </div>
                </div>
            </div>
        </div>
    )
}