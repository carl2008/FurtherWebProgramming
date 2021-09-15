import { USER_NAME, USER_ID, USER_ROLE, API_URL } from '../../constants'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';

import { Tabs, Spin } from 'antd';
import './Article.css'
import TextEditor from "./TextEditor";

const { TabPane } = Tabs;

function ArticleForm(props) {
    const history = useHistory();
    // temp user id, will change to logged in user id later
    const userID = localStorage.getItem(USER_ID).toString()
    const userName = localStorage.getItem(USER_NAME).toString()

    const endPoint = `${API_URL}`

    const [id, setId] = useState(null)
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const [contentText, setContentText] = useState('');
    const [contentError, setContentError] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    function createMarkup(val) {
        return { __html: val };
    }
    const formValidate = () => {
        setContentError('')
        if (content === '' || content === "<p><br></p>" || contentText.trim() === '') {
            setContentError('Please fill out content before submitting.')
            setSubmitted(false)
            return false
        } else return true;
    }
    const rteChange = (content, delta, source, editor) => {
        setContent(editor.getHTML())
        setContentText(editor.getText())
    }

    const handlePostArticle = () => {
        if (id === null) {
            setLoading(true)
            fetch(endPoint + `/users/${userID}/article`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category,
                    title: title,
                    content: content,
                })
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    history.push(`/article/${data._id}`);
                    history.go(0)
                })
                .catch((err) => console.log(err))
        } else {
            setLoading(true)
            fetch(endPoint + `/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category,
                    title: title,
                    content: content,
                })
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    history.push(`/article/${data._id}`);
                    history.go(0)
                })
                .catch((err) => console.log(err))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        formValidate() && handlePostArticle()
    }

    useEffect(() => {
        if (content && submitted === false) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    })

    useEffect(() => {
        if (props.location.id) {
            setId(props.location.id)
            setTitle(props.location.title)
            setContent(props.location.content)
            setCategory(props.location.category)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.location.id])

    return (
        <>
            <div className="article-container" id="article">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-12"></div>
                        <div className="col-lg-9 col-12">
                            <div className="panel-sort d-flex justify-content-between pb-3">
                                <div className="d-inline-block"><h2>{id ? "Edit article" : "Add new article"}</h2></div>
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
                                        {/* <Skeleton active loading={loadingArticle}> */}
                                        <div className="img-wrapper my-4 rounded-circle shadow">
                                            <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="" alt="" /></a>
                                        </div>
                                        <h4 className="author-name">Dr. {userName}</h4>
                                        <h6 className="author-title">Neurologist</h6>
                                        <p>Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.</p>
                                        {/* </Skeleton> */}
                                    </div>
                                </div>
                            </div>
                            {/* author for medium to small scaled screen */}
                            <div className="d-lg-none">
                                <div className="post-author-md card shadow mb-3">
                                    <div className="card-body d-flex align-items-center">
                                        {/* <Skeleton active loading={loadingArticle}> */}
                                        <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="rounded-circle float-left shadow" alt="" /></a>
                                        <div className="ml-2">
                                            <h4 className="author-name mb-1">Dr. {userName}</h4>
                                            <h6 className="author-title mb-1">Neurologist</h6>
                                            <p>Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.</p>
                                        </div>
                                        {/* </Skeleton> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className=" mb-5">
                                <Spin spinning={loading} tip="Proccessing...">
                                    <div className="card-container">
                                        <Tabs type="card">
                                            <TabPane tab="Write" key="1">
                                                <form onSubmit={handleSubmit}>
                                                    <div class="form-group">
                                                        <label for="category">Category</label>
                                                        <select type="text" class="form-control" id="category"
                                                            value={category} onChange={(e) => setCategory(e.target.value)} required>
                                                            <option value="">-- Please select a category --</option>
                                                            <option value="Covid-19">Covid-19</option>
                                                            <option value="Staying Healthy">Staying Healthy</option>
                                                            <option value="Heart Health">Heart Health</option>
                                                            <option value="Diseases">Diseases</option>
                                                            <option value="Mind & Mood">Mind & Mood</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="title">Title</label>
                                                        <input type="text" class="form-control" id="title"
                                                            placeholder="Enter title"
                                                            value={title} onChange={(e) => setTitle(e.target.value)} required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Content</label>
                                                        <TextEditor
                                                            value={content}
                                                            onChangeValue={rteChange}
                                                            placeholder="Enter content..."
                                                        />
                                                    </div>
                                                    <p className="text-danger">{contentError && contentError}</p>
                                                    <button className="btn btn-custom mt-5 float-right">Submit</button>
                                                </form>
                                            </TabPane>
                                            <TabPane tab="Preview" key="2">
                                                <div className="text-preview">
                                                    <h5 className="entry-category mb-3">{category}</h5>
                                                    <h2 className="entry-title"><a href="# ">{title}</a></h2>
                                                    {title &&
                                                        <div className="entry-meta">
                                                            <ul>
                                                                <li className="d-flex align-items-center"><i className="fa fa-clock"></i><a href="# ">{moment(new Date()).format("MMM DD, YYYY")}</a></li>
                                                            </ul>
                                                        </div>}
                                                    <div className="entry-content">
                                                        <div dangerouslySetInnerHTML={createMarkup(content)} />
                                                    </div>
                                                </div>
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ArticleForm;

