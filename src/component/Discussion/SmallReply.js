import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThumbsVote from "./ThumbsVote";

export default function SmallReply({ topicId, replyId, setName, load }) {
    const history = useHistory()
    const [smallRep, setSmallRep] = useState([])
    const endPoint = 'http://localhost:9000/replies/' + replyId + '/smallreplies'
    const USER_ID = "6138efaf983a412d88bf236d"

    const loadSmallReplies = () => {
        let tempList = []
        fetch(endPoint)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    tempList.push({
                        id: data[i]._id,
                        content: data[i].content,
                        authorId: data[i].author._id,
                        author: `${data[i].author.firstName} ${data[i].author.lastName}`,
                        createdAt: data[i].created_at
                    })
                }
                setSmallRep(tempList)
            })
    }

    useEffect(() => {
        loadSmallReplies()
    }, [load])

    const handleDeleteReply = (replyId) => {
        let deleteConfirm = window.confirm("Are you sure you want to delete this reply?")
        if(deleteConfirm){
            fetch(`http://localhost:9000/smallreplies/${replyId}`, {
                method: 'DELETE'
            }).then(res => {
                history.push(`/Discussion/${topicId}`)
                history.go(0)
            }).catch((err) => console.log(err))
        }
    } 

    return (
        smallRep.map((reply, i) => {
            return (
                <div className="card mb-2 discussion-smallreplies">
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
                                <ThumbsVote repID={reply.id} repType="smallreplies" load={load} key={reply.id} />
                                <a href={"#add-smallreply-" + replyId} className="text-muted" onClick={() => setName(reply.author)}> Reply </a>
                            </div>
                            <div className="text-muted text-center">
                                {(reply.authorId === USER_ID) && <i className="far fa-trash-alt trashcan-icon" title="Delete Reply" onClick={() => handleDeleteReply(reply.id)}></i>}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}