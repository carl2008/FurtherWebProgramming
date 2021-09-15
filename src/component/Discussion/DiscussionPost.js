import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { API_URL, USER_INFO } from '../../constants';
import { useParams, Redirect, Link } from "react-router-dom";
import { Spin, Skeleton } from 'antd';
import Reply from "./Reply";
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DiscussionPost() {
    let { id } = useParams()
    const history = useHistory()
    const [user, setUser] = useState({})
    const [replyValue, setReplyValue] = useState('')
    const [loadDiscussionPost, setLoadDiscussionPost] = useState(false)
    const [discussionPost, setDiscussionPost] = useState({})
    const [resetRepValue, setResetRepValue] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [proccessing, setProccessing] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [reload, setReload] = useState(false)

    const endPoint = `${API_URL}/discussions/${id}`

    const userInfo = localStorage.getItem(USER_INFO)

    useEffect(() => {
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [])

    const load = () => {
        setLoadDiscussionPost(true)
        setProccessing(true)
        let discussion = ''
        fetch(endPoint)
            .then((response) => {
                if (!response.ok){
                    setInvalid(true)
                    throw new Error(response.statusText)
                }
                else return response.json();
            })
            .then(data => {
                /*let allReplies = data.replies
                let smallNum = 0
                for (let i = 0; i < allReplies.length; i++) {
                    smallNum = Number(smallNum) + Number(allReplies[i].smallreplies.length)
                }*/
                discussion = {
                    id: data._id,
                    title: data.title,
                    content: data.content,
                    authorId: data.author._id,
                    author: `${data.author.firstName} ${data.author.lastName}`,
                    authorRole: data.author.role.charAt(0).toUpperCase() + data.author.role.slice(1),
                    authorpic: data.author.pic,
                    createdAt: data.created_at,
                    updatedAt: data.lastUpdated,
                    totalReplyCount: Number(data.replies.length) + Number(data.smallreplies.length)
                }
                setDiscussionPost(discussion)
                setLoadDiscussionPost(false)
                setProccessing(false)
            })
            .catch((err) => {
                setLoadDiscussionPost(false)
                setProccessing(false)
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
        setProccessing(true)
        fetch(endPoint + "/replies", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: replyValue,
                author: user._id
            })
        }).then(res => {
            setReplyValue('')
            setReload(!reload)
            setProccessing(false)
            //history.push(`/Discussion/${id}`)
            //history.go(0)
        })
            .catch((err) => console.log(err))
    }

    const handleDeletePost = () => {
        let deleteConfirm = window.confirm("Are you sure you want to delete this post?")
        if (deleteConfirm) {
            setProccessing(true)
            fetch(endPoint, {
                method: 'DELETE'
            }).then(res => {
                setProccessing(false)
                history.push(`/Discussion`)
                history.go(0)
            }).catch((err) => console.log(err))
        }
    }

    const handleEditPost = () => {
        setProccessing(true)
        setRedirect(true)
    }

    if (redirect) {
        return <Redirect
            to={{
                pathname: "/Discussion/new",
                id: discussionPost.id,
                title: discussionPost.title,
                content: discussionPost.content
            }}
        />;
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

                            {/*Forum Detail*/}{ invalid? <div><a href="/Discussion" className="btn btn-light btn-sm mb-3 has-icon ml-3 mt-3" ><i className="fa fa-arrow-left mr-2"></i>Back to Discussions</a><br/>
                            <p className="ml-5 mt-2 border border-5">The discussion thread you are looking for does not exist!<br/>The URL might have been incorrect or the thread has been deleted.<br/>We apologize for any inconvenience!</p></div> :
                            <div className="inner-main-body p-2 p-sm-3 forum-content" style={{ display: 'block' }}>
                                <Spin spinning={proccessing} tip="Proccessing...">
                                    <Skeleton active loading={loadDiscussionPost}>
                                        <div>
                                            <a href="/Discussion" className="btn btn-light btn-sm mb-3 has-icon" ><i className="fa fa-arrow-left mr-2"></i>Back to Discussions</a>
                                            <div className="card mb-2 discussion-question">
                                                <div className="card-body">
                                                    <div className="media forum-item">
                                                        <a href="javascript:void(0)" className="card-link">
                                                            <img src={discussionPost.authorRole === "Doctor" ? "https://i.imgur.com/irK1Y0P.jpg" : discussionPost.authorpic} className="rounded-circle" width="50" alt="User" />
                                                            <small className="d-block text-center" style={discussionPost.authorRole === "Admin" ? {color:"red"} : {color:"#676767"}}>{discussionPost.authorRole}</small>
                                                        </a>
                                                        <div className="media-body ml-3">
                                                            <a href="javascript:void(0)" className="text-secondary">{discussionPost.author}</a>
                                                            <small className="text-muted ml-2">- {(new Date(discussionPost.createdAt)).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                                            {discussionPost.updatedAt && <small className="text-muted ml-1">- <i>Last edited: {(new Date(discussionPost.updatedAt)).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</i></small>}
                                                            <h5 className="mt-1">{discussionPost.title}</h5>
                                                            <div className="mt-3 font-size-sm">
                                                                <p>{discussionPost.content}</p>
                                                            </div>
                                                            {userInfo && <a href={"#add-reply-" + id} className="text-muted" onClick={() => changeReply(discussionPost.author)}>Reply</a>}
                                                        </div>
                                                        <div className="text-muted text-center">
                                                            {(discussionPost.authorId === user._id || user.role === "admin") && <><i className="far fa-edit trashcan-icon ml-1 mb-3" title="Edit Post" onClick={handleEditPost}></i><br /></>}
                                                            {(discussionPost.authorId === user._id || user.role === "admin") && <i className="far fa-trash-alt trashcan-icon" title="Delete Post" onClick={handleDeletePost}></i>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mt-3 mb-3" id={"add-reply-" + discussionPost.id}>
                                                <div className="card-body">
                                                    <p className="ml-2" style={{ fontSize: '1.2em' }}><b>Join the discussion</b></p>
                                                    <p className="ml-2 discussion-error" style={userInfo ? { display: "none" } : { display: "block" }}>You must <Link to="/Login">log in</Link> to post a reply!</p>
                                                    <div className="media forum-item">
                                                        <div className="reply-avt"><a href="javascript:void(0)" className="card-link col-1">
                                                            <img src={userInfo ? user.role === "doctor" ? "https://i.imgur.com/irK1Y0P.jpg" : user.pic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} className="rounded-circle" width="50" alt="User" />
                                                            <small className="d-block text-center text-muted">{userInfo ? `${user.firstName} ${user.lastName}` : `User`}</small>
                                                        </a></div>
                                                        <div className="media-body ml-3">
                                                            <textarea placeholder="Add a new reply" className="add-reply-input" value={replyValue} onChange={(e) => setReplyValue(e.target.value)} disabled={!userInfo}></textarea>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary btn-sm float-right" type="button" onClick={() => postReply()} disabled={!userInfo || !replyValue}>REPLY</button>
                                                </div>
                                            </div></div>
                                    </Skeleton>
                                </Spin>
                                {/*Replies section*/}
                                <Reply id={id} reset={resetRepValue} key={id} reloadReply={reload} />
                            </div>}
                        </div>
                        {/*Inner main*/}
                    </div>
                </div>
            </div>
        </div>
    )
}