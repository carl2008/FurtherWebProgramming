import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Result, Skeleton, List, Button, Popconfirm, ConfigProvider, Popover, Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Article.css';

import ArticleComment from './ArticleComment';

const { confirm } = Modal;

function ArticlePost(props) {
    const history = useHistory();
    // temp user id, will change to logged in user id later
    const USER_ID = "612b8998a60dea66123c3835"
    const USER_ROLE = "doctor"

    const [article, setarticle] = useState('')
    const [loadingArticle, setloadingArticle] = useState(false)

    const [comments, setComments] = useState([])
    const [likeCount, setLikeCount] = useState(0)
    const [liked, setLiked] = useState(null)

    const [error, setError] = useState(null)
    const [errorCmt, setErrorCmt] = useState(null)
    const [proccessing, setProccessing] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const endPoint = "http://localhost:9000"

    function createMarkup(val) {
        return { __html: val };
    }

    //get data from api
    const load = () => {
        let id = props.match.params.id
        let article = ''
        setloadingArticle(true)
        fetch(endPoint + `/articles/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                else return response.json();
            })
            .then(data => {
                console.log("Loaded")
                article = {
                    id: data._id,
                    category: data.category,
                    title: data.title,
                    content: data.content,
                    authorId: data.author._id,
                    author: `${data.author.firstName} ${data.author.lastName}`,
                    createdAt: data.created_at,
                }
                setarticle(article)
                setloadingArticle(false)
            })
            .catch((err) => {
                setloadingArticle(false)
                setError(err.message)
            })
    }
    const loadCmt = () => {
        let id = props.match.params.id
        let comments = []
        fetch(endPoint + `/articles/${id}/comments`)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                else return response.json();
            })
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    comments.push({
                        id: data[i]._id,
                        authorId: data[i].author._id,
                        author: `${data[i].author.firstName} ${data[i].author.lastName}`,
                        content: data[i].content,
                        createdAt: data[i].created_at,
                    });
                }
                setComments(comments)
            })
            .catch((err) => {
                setErrorCmt(err.message)
            })
    }

    const loadLike = () => {
        let id = props.match.params.id
        fetch(endPoint + `/articles/${id}/likes`)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                else return response.json();
            })
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].author._id === USER_ID) {
                        setLiked(data[i]._id)
                        console.log(data[i]._id)
                    }
                }
                setLikeCount(data.length)
            })
            .catch((err) => {
                setErrorCmt(err.message)
            })
    }

    const handleEdit = () => {
        setProccessing(true)
        setRedirect(true)
    }

    const handleDelete = (id) => {
        setProccessing(true)
        fetch(endPoint + `/articles/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                setProccessing(false)
                history.push(`/Articles`);
            })
            .catch((err) => console.log(err))

    }
    function showConfirm(id) {
        confirm({
            title: 'Are you sure you want to delete this article?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDelete(id)
            }
        });
    }
    const handleLike = () => {
        let id = props.match.params.id
        fetch(endPoint + `/articles/${id}/likes`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: USER_ID,
            })
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                else return response.json();
            })
            .then((data) => {
                setLiked(data._id)
                loadLike()
            })
            .catch((err) => console.log(err))
    }

    const handleUnlike = () => {
        fetch(endPoint + `/likes/${liked}`, {
            method: 'DELETE'
        })
            .then((res) => {
                setLiked(null)
                loadLike()
            })
            .catch((err) => console.log(err))
    }

    const handleDeleteCmt = (cmtId) => {
        fetch(endPoint + `/comments/${cmtId}`, {
            method: 'DELETE'
        })
            .then((res) => {
                loadCmt()
            })
            .catch((err) => console.log(err))
    }

    // Useffect: Fetch data 
    useEffect(() => {
        if (props.match.params.id) {
            load()
            loadCmt()
            loadLike()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.id])

    if (redirect) {
        return <Redirect
            to={{
                pathname: "/articles/create",
                id: article.id,
                category: article.category,
                title: article.title,
                content: article.content
            }}
        />;
    }



    return (
        <>
            <div className="article-container" id="article">
                <div className="container">
                    {error ? <>
                        <Result
                            status="500"
                            title="Sorry, something went wrong."
                            subTitle={<div>Could not find article with id <b>{props.match.params.id}</b>.</div>}
                            extra={<a href={`/articles`}><Button type="primary">Back to Article</Button></a>}
                        />,
                    </> : <>
                        <div className="row">
                            <div className="col-lg-3 col-12"></div>
                            <div className="col-lg-9 col-12">
                                <div className="panel-sort d-flex justify-content-between pb-3">
                                    <div className="d-inline-block"><h2>Health Article</h2></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-12">
                                {/* author for normal to medium scaled screen */}
                                <div className="d-none d-lg-block">
                                    <div className="post-author card shadow mb-3">
                                        <div className="card-body text-center">
                                            <h5>Author details</h5>
                                            <Skeleton active loading={loadingArticle}>
                                                <div className="img-wrapper my-4 rounded-circle shadow">
                                                    <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="" alt="" /></a>
                                                </div>
                                                <h4 className="author-name">Dr. {article.author}</h4>
                                                <h6 className="author-title">Neurologist</h6>
                                                <p>Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.</p>
                                            </Skeleton>
                                        </div>
                                    </div>
                                </div>
                                {/* author for medium to small scaled screen */}
                                <div className="d-lg-none">
                                    <div className="post-author-md card shadow mb-3">
                                        <div className="card-body d-flex align-items-center">
                                            <Skeleton active loading={loadingArticle}>
                                                <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="rounded-circle float-left shadow" alt="" /></a>
                                                <div className="ml-2">
                                                    <h4 className="author-name mb-1">Dr. {article.author}</h4>
                                                    <h6 className="author-title mb-1">Neurologist</h6>
                                                    <p>Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.</p>
                                                </div>
                                            </Skeleton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-12">
                                <div className="post-entry card shadow mb-5">
                                    <div className="card-body">
                                        <Spin spinning={proccessing} tip="Proccessing...">
                                        <Skeleton active loading={loadingArticle}>
                                            <div className="d-flex justify-content-between">
                                                <h5 className="entry-category mb-3">{article.category}</h5>
                                                {/* Only show edit button if this post wrtten by this user */}
                                                {(article.authorId === USER_ID || USER_ROLE === "admin") &&
                                                    <Popover
                                                        placement="leftTop"
                                                        trigger="click"
                                                        content={
                                                            <div className="popover-content">
                                                                <div className="w-100"><a href="# "
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleEdit()
                                                                    }}
                                                                >Edit</a> </div>
                                                                <div className="w-100"><a href="# "
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        showConfirm(article.id);
                                                                        // handleDelete(article.id)
                                                                    }}
                                                                >Delete</a></div>
                                                            </div>
                                                        }>
                                                        <a className="btn-detail" href="/#" id="actionDropdown" role="button">
                                                            <span className="fa-stack">
                                                                <i className="fa fa-circle fa-stack-2x"></i>
                                                                <i className="fas fa-ellipsis-h fa-stack-1x fa-inverse"></i>
                                                            </span>
                                                        </a>
                                                    </Popover>
                                                }
                                            </div>
                                            <h2 className="entry-title"><a href="# ">{article.title}</a></h2>
                                            <div className="entry-meta">
                                                <ul>
                                                    <li className="d-flex align-items-center"><i className="fa fa-clock"></i> <a href="# ">{moment(article.createdAt).format("MMM DD, YYYY")}</a></li>
                                                    <li className="d-flex align-items-center"><i className="fa fa-comment"></i> <a href="# ">{comments.length} {comments.length <= 1 ? `Comment` : `Comments`} </a></li>
                                                    {liked ? <>
                                                        <li className="d-flex align-items-center liked" onClick={handleUnlike}><i className="fa fa-heart"></i> <a href="# ">{likeCount} {(likeCount <= 1) ? `Like` : `Likes`}</a></li>
                                                    </> : <>
                                                        <li className="d-flex align-items-center unliked" onClick={handleLike}><i className="fa fa-heart"></i> <a href="# ">{likeCount} {(likeCount <= 1) ? `Like` : `Likes`}</a></li>
                                                    </>}
                                                </ul>
                                            </div>
                                            <div className="entry-content">
                                                <div dangerouslySetInnerHTML={createMarkup(article.content)} />
                                            </div>
                                            <div class="entry-footer">
                                                {liked ? <>
                                                    <small><i className="fa fa-heart pr-1 liked" onClick={handleUnlike}></i> {likeCount} {(likeCount <= 1) ? `user` : `users`} like this.</small>
                                                </> : <>
                                                    <small><i className="fa fa-heart pr-1 unliked" onClick={handleLike}></i> {likeCount} {(likeCount <= 1) ? `user` : `users`} like this.</small>
                                                </>}
                                            </div>
                                        </Skeleton>
                                        </Spin>
                                    </div>
                                </div>
                                <div class="post-comments">
                                    {loadingArticle && <>
                                        <Skeleton avatar={{ shape: "square" }} active></Skeleton>
                                        <Skeleton avatar={{ shape: "square" }} active></Skeleton>
                                        <Skeleton avatar={{ shape: "square" }} active></Skeleton>
                                    </>}
                                    {!loadingArticle &&
                                        <>
                                            <h4 class="comments-count font-weight-bold pb-4">{comments.length} Comments</h4>
                                            <ConfigProvider renderEmpty={() => (
                                                <div style={{ textAlign: 'center' }}>
                                                    <p>There are no comments yet.</p>
                                                </div>)}>
                                                <List
                                                    grid={{
                                                        gutter: 16,
                                                        column: 1,
                                                    }}
                                                    pagination={{ pageSize: 5, simple: true }}
                                                    dataSource={comments}
                                                    renderItem={cmt => (
                                                        <List.Item key={cmt.id}>
                                                            <div id="comment" class="comment">
                                                                <div class="d-flex">
                                                                    <div class="comment-img mr-3"><img src="https://i.ibb.co/N6SXWfm/Price-Co-1.png" alt="" /></div>
                                                                    <div className="d-inline-block" style={{ width: "90%" }}>
                                                                        <h6>{cmt.author}</h6>
                                                                        <small className="text-muted">{moment(cmt.createdAt).format("MMM DD, YYYY")}</small>
                                                                        <p>{cmt.content}</p>
                                                                    </div>
                                                                    {(cmt.authorId === USER_ID || USER_ID === "admin") &&
                                                                        <div className="d-inline-block">
                                                                            <Popconfirm title="Are you sure you want to delete？" okText="Yes" cancelText="No"
                                                                                onConfirm={(e) => { e.preventDefault(); handleDeleteCmt(cmt.id) }}>
                                                                                <a className="btn-detail" href="# " role="button">
                                                                                    <i class="fas fa-trash"></i>
                                                                                </a>
                                                                            </Popconfirm>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </List.Item>
                                                    )}
                                                />
                                            </ConfigProvider>
                                        </>
                                    }
                                </div>
                                <ArticleComment id={props.match.params.id} reloadPage={loadCmt} />
                            </div>
                        </div>
                    </>}
                </div>
            </div>

        </>
    )
}

export default ArticlePost;
