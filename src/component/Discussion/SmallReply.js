import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { API_URL, USER_INFO } from '../../constants';
import { Spin, Skeleton } from 'antd';
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThumbsVote from "./ThumbsVote";

export default function SmallReply({ topicId, replyId, setName, load, changeNum }) {
    const history = useHistory()
    const [processing, setProcessing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [smallRep, setSmallRep] = useState([])
    const [reload, setReload] = useState(false)
    const endPoint = `${API_URL}/replies/${replyId}/smallreplies`

    const userInfo = localStorage.getItem(USER_INFO)

    useEffect(() => {
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [])

    const loadSmallReplies = () => {
        setProcessing(true)
        setLoading(true)
        let tempList = []
        fetch(endPoint)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    tempList.push({
                        id: data[i]._id,
                        content: data[i].content,
                        authorId: data[i].author._id,
                        authorpic: data[i].author.pic,
                        authorRole: data[i].author.role.charAt(0).toUpperCase()+data[i].author.role.slice(1),
                        author: `${data[i].author.firstName} ${data[i].author.lastName}`,
                        createdAt: data[i].created_at
                    })
                }
                setSmallRep(tempList)
                setProcessing(false)
                setLoading(false)
            })
    }

    useEffect(() => {
        loadSmallReplies()
    }, [load, reload])

    const handleDeleteReply = (replyId) => {
        let deleteConfirm = window.confirm("Are you sure you want to delete this reply?")
        if (deleteConfirm) {
            setProcessing(true)
            fetch(`${API_URL}/smallreplies/${replyId}`, {
                method: 'DELETE'
            }).then(res => {
                changeNum()
                setReload(!reload)
                setProcessing(false)
                //history.push(`/Discussion/${topicId}`)
                //history.go(0)
            }).catch((err) => console.log(err))
        }
    }

    return (
        <Spin spinning={processing} tip="Proccessing...">
            <Skeleton active loading={loading}>
                {smallRep.map((reply, i) => {
                    return (

                        <div className="card mb-2 discussion-smallreplies">
                            <div className="card-body">
                                <div className="media forum-item">
                                    <a href="javascript:void(0)" className="card-link">
                                        <img src={reply.authorRole === "Doctor" ? "https://i.imgur.com/irK1Y0P.jpg" : reply.authorpic} className="rounded-circle" width="50" alt="User" />
                                        <small className="d-block text-center" style={reply.authorRole === "Admin" ? {color:"red"} : {color:"#676767"}}>{reply.authorRole}</small>
                                    </a>
                                    <div className="media-body ml-3">
                                        <a href="javascript:void(0)" className="text-secondary">{reply.authorRole === "Doctor"? "Dr. "+reply.author : reply.author}</a>
                                        <small className="text-muted ml-2">{(new Date(reply.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                        <div className="mt-3 font-size-sm">
                                            <p>{reply.content}</p>
                                        </div>
                                        <ThumbsVote repID={reply.id} repType="smallreplies" load={load} key={reply.id} />
                                        {userInfo && <a href={"#add-smallreply-" + replyId} className="text-muted" onClick={() => setName(reply.author)}> Reply </a>}
                                    </div>
                                    <div className="text-muted text-center">
                                        {(reply.authorId === user._id || user.role === "admin") && <i className="far fa-trash-alt trashcan-icon" title="Delete Reply" onClick={() => handleDeleteReply(reply.id)}></i>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </Skeleton>
        </Spin>
    )
}