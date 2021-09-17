import { USER_INFO, API_URL } from '../../constants'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';

import { Tabs, Spin, Alert } from 'antd';
import './Article.css'
import TextEditor from "./TextEditor";

const { TabPane } = Tabs;

function ArticleForm(props) {
    const history = useHistory();
    // get  logged in user info
    const userInfo = localStorage.getItem(USER_INFO)
    // API endPoint
    const endPoint = `${API_URL}`

    // article states
    const [id, setId] = useState(null)
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const [contentText, setContentText] = useState('');
    // error state
    const [contentError, setContentError] = useState('')
    // author states
    const [author, setAuthor] = useState({
        id: '',
        name: '',
        introduction: '',
        specialties: ''
    })

    // proccessing status
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    // convert text to HTML 
    function createMarkup(val) {
        return { __html: val };
    }
    
    // create/ update form validation
    const formValidate = () => {
        setContentError('')
        if (content === '' || content === "<p><br></p>" || contentText.trim() === '') {
            setContentError('Please fill out content before submitting.')
            setSubmitted(false)
            return false
        } else return true;
    }
    // handle change content
    const rteChange = (content, delta, source, editor) => {
        setContent(editor.getHTML())
        setContentText(editor.getText())
    }

    // POST/ PUT article
    const handlePostArticle = () => {
        // if "article-id" exists, PUT else POST
        if (id === null) {
            setLoading(true)
            fetch(endPoint + `/users/${author.id}/article`, {
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
                    // go to article page
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
                    // go to article page
                    history.push(`/article/${data._id}`);
                    history.go(0)
                })
                .catch((err) => console.log(err))
        }
    }

    // get author from logged in user id
    const getAuthor = (id) => {
        fetch(`${endPoint}/api/users/getOneUser/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                setAuthor({
                    id: data._id,
                    name: `${data.firstName} ${data.lastName}`,
                    specialties: data.specialties,
                    introduction: data.introduction
                })
            })
            .catch((err)=> console.log(err))
    }

    // handle submit create/ edit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        // validate before POST/PUT to database
        formValidate() && handlePostArticle()
    }

    // confirm with user before leaving page (if form is not empty)
    useEffect(() => {
        if (content && submitted === false) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    })

    // load author on load (create)
    useEffect(() => {
        if (userInfo) {
            getAuthor(JSON.parse(userInfo)._id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    // load author on load (edit)
    useEffect(() => {
        if (props.location.id) {
            setId(props.location.id)
            setTitle(props.location.title)
            setContent(props.location.content)
            setCategory(props.location.category)
            setAuthor({
                id: props.location.authorId,
                name: props.location.authorName,
                specialties: props.location.authorSpe,
                introduction: props.location.authorIntro
            })
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
                                        <div className="img-wrapper my-4 rounded-circle shadow">
                                            <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="" alt="" /></a>
                                        </div>
                                        <h4 className="author-name">Dr. {author.name}</h4>
                                        <h6 className="author-title">{author.specialties}</h6>
                                        <p>{author.introduction}</p>
                                    </div>
                                </div>
                            </div>
                            {/* author for medium to small scaled screen */}
                            <div className="d-lg-none">
                                <div className="post-author-md card shadow mb-3">
                                    <div className="card-body d-flex align-items-center">
                                        <a href="# "><img src="https://i.ibb.co/hCyPJWx/PriceCo.png" className="rounded-circle float-left shadow" alt="" /></a>
                                        <div className="ml-2">
                                            <h4 className="author-name mb-1">Dr. {author.name}</h4>
                                            <h6 className="author-title mb-1">{author.specialties}</h6>
                                            <p>{author.introduction}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className=" mb-5">
                                <Spin spinning={loading} tip="Proccessing...">
                                    <div className="card-container">
                                        <Tabs type="card">
                                            {/* Editor */}
                                            <TabPane tab="Write" key="1">
                                                <form onSubmit={handleSubmit}>
                                                    {/* Category input */}
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
                                                    {/* Title input */}
                                                    <div class="form-group">
                                                        <label for="title">Title</label>
                                                        <input type="text" class="form-control" id="title"
                                                            placeholder="Enter title"
                                                            value={title} onChange={(e) => setTitle(e.target.value)} required />
                                                    </div>
                                                    {/* Content input */}
                                                    <div class="form-group">
                                                        <label>Content</label>
                                                        <TextEditor
                                                            value={content}
                                                            onChangeValue={rteChange}
                                                            placeholder="Enter content..."
                                                        />
                                                    </div>
                                                    {/* Error Message */}
                                                    {contentError && <Alert message={contentError} type="error" showIcon />}
                                                    <button className="btn btn-custom mt-5 float-right">Submit</button>
                                                </form>
                                            </TabPane>
                                            {/* Preview text */}
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

