import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import moment from 'moment';
import { Link } from "react-router-dom";
import './Article.css'

function Articles() {
    const [articleList, setArticleList] = useState([])
    const [loading, setLoading] = useState(false)
    const endPoint = "http://localhost:9000/articles"

    //get data from api
    const load = () => {
        setLoading(true)
        fetch(endPoint)
            .then(response => response.json())
            .then(data => {
                let listData = []
                console.log("Loaded")
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    listData.push({
                        id: data[i]._id,
                        category: data[i].category,
                        title: data[i].title,
                        content: data[i].content,
                        author: `${data[i].author.firstName} ${data[i].author.lastName}`,
                        createdAt: data[i].created_at,
                        likeCount: data[i].likes.length,
                        cmtCount: data[i].comments.length,
                    });
                }
                setArticleList(listData)
                setLoading(false)
            });
    }

    const [sortKeyword, setSortKeyword] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')

    const handleSort = (e) => {
        e.preventDefault()
        setSortKeyword(e.target.value)
    }

    const displayText = (text, count) => {
        var stripedHtml = text.replace(/<[^>]+>/g, ' ');
        return stripedHtml.slice(0, count) + (stripedHtml.length > count ? "..." : "");
    }

    const results = (list) => {
        let results = list;
        if (searchKeyword !== "") {
            let temp = results.filter(article => article.title.toLowerCase().includes(searchKeyword.toString().toLowerCase()));
            results = temp;
        }
        switch (sortKeyword) {
            case "newdate":
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break;
            case "olddate":
                results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                break;
            case "like":
                results.sort((a, b) => b.likeCount - a.likeCount)
                break;
            case "comment":
                results.sort((a, b) => b.cmtCount - a.cmtCount)
                break;
            default:
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break;
        }
        return results
    }



    // Useffect: Fetch data 
    useEffect(() => {
        load();
    }, [])

    return (
        <div className="article-container" id="article">
            {/* articles container */}
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-12"></div>
                    <div className="col-md-8 col-12">
                        {/* sort articles */}
                        <div className="panel-sort d-flex justify-content-between pb-3">
                            <div className="d-inline-block"><h2>Article</h2></div>
                            <div className="form-inline">
                                <label className="text-muted mr-3">Order by</label>
                                <select className="form-control" value={sortKeyword} onChange={handleSort}>
                                    <option value="newdate">Newest to oldest</option>
                                    <option value="olddate">Oldest to newest</option>
                                    <option value="like">Likes</option>
                                    <option value="comment">Comments</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* article filter column */}
                    <div className="col-md-3 col-12">
                        <div className="article-sidebar">
                            <div className="card sidebar-container shadow mb-3">
                                <div className="card-body">
                                    <div className="sidebar-item">
                                    <Link to='/Articles/create'><button className="btn btn-custom btn-block" type="button"><i className="fa fa-plus"></i> New Article</button></Link>
                                    </div>
                                    <div className="sidebar-item mt-4">
                                        <h4 className="mb-3 d-none d-md-block">Search</h4>
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Enter keyword" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                            <div class="input-group-append">
                                                <button class="btn btn-custom" type="submit"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar-item mt-4">
                                        <h4 className="mb-3">Category</h4>
                                        <div className="categories">
                                            <ul>
                                                <li><a href="# ">General <span>(25)</span></a></li>
                                                <li className="pt-1"><a href="# ">Covid-19 <span>(12)</span></a></li>
                                                <li className="pt-1"><a href="# ">Staying Healthy <span>(5)</span></a></li>
                                                <li className="pt-1"><a href="# ">Heart Health <span>(22)</span></a></li>
                                                <li className="pt-1"><a href="# ">Diseases <span>(8)</span></a></li>
                                                <li className="pt-1"><a href="# ">Mind & Mood <span>(14)</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className="sidebar-item mt-4 d-none d-md-block">
                                        <h4 className="mb-3">Tags</h4>
                                        <div className="tags">
                                            <ul>
                                                <li><a href="# ">nutrition</a></li>
                                                <li><a href="# ">vacination</a></li>
                                                <li><a href="# ">stressfull</a></li>
                                                <li><a href="# ">pcr</a></li>
                                                <li><a href="# ">lockdown</a></li>
                                                <li><a href="# ">self-quarantine</a></li>
                                                <li><a href="# ">outbreak</a></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* article panel column */}
                    <div className="col-md-8 col-12">
                        <div className="article-panel">
                            {/* article card list */}
                            <div className="panel-list">
                                <List
                                    loading={loading}
                                    grid={{
                                        gutter: 16,
                                        column: 1,
                                    }}
                                    pagination={{ pageSize: 5, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} results` }}
                                    dataSource={results(articleList)}
                                    renderItem={articleData => (
                                        <List.Item key={articleData.id}>
                                            {/* single post card */}
                                            <div className="card single_post shadow mb-3">
                                                <div className="card-body">
                                                    <h5 className="post-category mb-4">{articleData.category}</h5>
                                                    <h3 className="post-title"><a href={`/article/${articleData.id}`}>{articleData.title}</a></h3>
                                                    <small className="text-muted">By <a className="text-muted" href="# "><strong> {articleData.author}</strong></a> |  Post on {moment(articleData.createdAt).format("MMM DD, YYYY")} </small>
                                                    <p className="post-summary">{displayText(articleData.content, 250)}</p>
                                                    <div className="footer">
                                                        <div className="d-inline-block">
                                                            <a href={`/article/${articleData.id}`} className="btn btn-outline-custom">Continue Reading</a>
                                                        </div>
                                                        <ul className="stats float-right">
                                                            <li><a href="# " className=""><i className="fa fa-heart mr-1"></i>{articleData.likeCount}</a></li>
                                                            <li><a href="# " className=""><i className="fa fa-comment mr-1"></i>{articleData.cmtCount}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                            <div className="pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Articles
