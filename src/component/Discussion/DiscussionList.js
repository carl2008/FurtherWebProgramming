import { useState, useEffect } from "react";
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reply from "./Reply";
import { List } from 'antd';

export default function DiscussionList() {
    const [discussions, setDiscussions] = useState([])
    const [replies, setReplies] = useState({})
    const [show, setShow] = useState(true)
    const [pagination, setPagination] = useState(true);
    const [loading, setLoading] = useState(false)
    const [activeID, setActiveID] = useState('')

    const endPoint = 'https://611fc518c772030017424085.mockapi.io/api/v1/topics'

    const loadDiscussions = () => {
        setLoading(true)
        let obj = {}
        fetch(endPoint)
            .then(response => response.json())
            .then(data => setDiscussions(data))
            .then(() => {
                for (let i = 0; i < discussions.length; i++) {
                    fetch(endPoint + `/${discussions[i].id}/replies`)
                        .then(res => res.text())
                        .then(repliesData => {
                            try{
                                const rep = JSON.parse(repliesData)
                                obj[discussions[i].id] = rep.length
                            }
                            catch(err){
                                obj[discussions[i].id] = 0
                            }
                        })
                }
                setReplies(obj)
                setLoading(false)
            })
        console.log(obj)
    }

    const [sortValue, setSortValue] = useState('latest')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        loadDiscussions()
    }, [])

    const results = (list) => {
        let results = list
        if (keyword) {
            let temp = results.filter(discussion => discussion.title.toLowerCase().includes(keyword.toLowerCase()))
            results = temp
        }
        switch (sortValue) {
            case "latest":
                list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break;
            case "oldest":
                list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                break;
            case "mostrep":
                list.sort((a, b) => replies[b.id] - replies[a.id])
                break;
            case "leastrep":
                list.sort((a, b) => replies[a.id] - replies[b.id])
                break;
        }
        return results
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />
            <div className="container">
                <div className="main-body p-0">
                    <div className="inner-wrapper">
                        {/*Inner sidebar*/}
                        <div className="inner-sidebar">
                            {/*Inner sidebar header*/}
                            <div className="inner-sidebar-header justify-content-center">
                                <button className="btn btn-primary has-icon btn-block" type="button" data-toggle="modal" data-target="#threadModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus mr-2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    NEW DISCUSSION
                                </button>
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
                                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon active">All Threads</a>
                                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Popular</a>
                                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Solved</a>
                                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Unsolved</a>
                                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">No replies yet</a>
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
                                <a className="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none" href="#" data-toggle="inner-sidebar"><i className="material-icons"></i></a>
                                <select className="custom-select custom-select-sm w-auto mr-1" value={sortValue} onChange={(e) => setSortValue(e.target.value)}>
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="mostrep">Most replies</option>
                                    <option value="leastrep">Least replies</option>
                                </select>
                                <span className="input-icon input-icon-sm ml-auto w-auto">
                                    <input type="text" className="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4" placeholder="Search discussion" onChange={(e) => setKeyword(e.target.value)} />
                                </span>
                            </div>
                            {/*Inner main header*/}

                            {/*Forum list*/}
                            <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                                <List
                                    loading={loading}
                                    grid={{
                                        gutter: 5,
                                        column: 1,
                                    }}
                                    pagination={show ? { pageSize: 5, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} results` }: false}
                                    dataSource={results(discussions)}
                                    renderItem={discussionPost => (
                                        <List.Item key={discussionPost.id}>
                                            <div className="card mb-2" style={show ? { display: "block" } : { display: 'none' }}>
                                                <div className="card-body p-2 p-sm-3">
                                                    <div className="media forum-item">
                                                        <a href="#" data-toggle="collapse"><img src={discussionPost.avatar} className="mr-3 rounded-circle" width="50" alt="User" /></a>
                                                        <div className="media-body">
                                                            <h6><a href={`/Discussion/${discussionPost.id}`} data-toggle="collapse" data-target={`#discussion-${discussionPost.id}`} className="text-body" onClick={() => {setShow(!show); setPagination(!pagination); setActiveID(discussionPost.id)}}>{discussionPost.title}</a></h6>
                                                            <p className="text-secondary">
                                                                {discussionPost.content}
                                                            </p>
                                                            <p className="text-muted">Asked by <a href="javascript:void(0)">{discussionPost.name} </a>
                                                                <span className="text-secondary font-weight-bold">
                                                                    - {(new Date(discussionPost.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="text-muted text-center align-self-center">
                                                            <span><i className="far fa-comment ml-5"></i> {replies[discussionPost.id]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Forum Detail*/}
                                            <div className="inner-main-body p-2 p-sm-3 collapse forum-content" id={`discussion-${discussionPost.id}`} style={(pagination) ? { display: "none" } : (activeID===discussionPost.id && !pagination) ? { display: 'block' } : { display: 'none' }}>
                                                <a href="#" className="btn btn-light btn-sm mb-3 has-icon" data-toggle="collapse" data-target={`#discussion-${discussionPost.id}`} onClick={() => {setShow(!show); setPagination(!pagination)}}><i className="fa fa-arrow-left mr-2"></i>Back</a>
                                                <div className="card mb-2 discussion-question">
                                                    <div className="card-body">
                                                        <div className="media forum-item">
                                                            <a href="javascript:void(0)" className="card-link">
                                                                <img src={discussionPost.avatar} className="rounded-circle" width="50" alt="User" />
                                                                <small className="d-block text-center text-muted">Patient</small>
                                                            </a>
                                                            <div className="media-body ml-3">
                                                                <a href="javascript:void(0)" className="text-secondary">{discussionPost.name}</a>
                                                                <small className="text-muted ml-2">- {(new Date(discussionPost.createdAt)).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                                                <h5 className="mt-1">{discussionPost.title}</h5>
                                                                <div className="mt-3 font-size-sm">
                                                                    <p>{discussionPost.content}</p>
                                                                </div>
                                                                <a href="javascript:void(0)" className="text-muted">Reply</a>
                                                            </div>
                                                            <div className="text-muted text-center">
                                                                <span><i className="far fa-comment ml-2"></i> {replies[discussionPost.id]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Replies section*/}
                                                <Reply id={discussionPost.id} />
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                
                            </div>
                            {/*Forum List*/}
                        </div>
                        {/*Inner main*/}
                    </div>

                    {/*New Thread Modal*/}
                    <div className="modal fade" id="threadModal" tabindex="-1" role="dialog" aria-labelledby="threadModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <form>
                                    <div className="modal-header d-flex align-items-center bg-primary text-white">
                                        <h6 className="modal-title mb-0" id="threadModalLabel" style={{color: 'white'}}>New Discussion</h6>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label for="threadTitle">Title</label>
                                            <input type="text" className="form-control" id="threadTitle" placeholder="Enter title" autofocus="" />
                                        </div>
                                        <div className="form-group">
                                            <label for="threadContent">Content</label>
                                            <textarea className="form-control summernote" style={{ display: 'block' }} id="threadContent" placeholder="Post your content here"></textarea>
                                        </div>

                                        <div className="custom-file form-control-sm mt-3" style={{ maxWidth: '300px' }}>
                                            <input type="file" className="custom-file-input" id="customFile" multiple="" />
                                            <label className="custom-file-label" for="customFile">Attachment</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary">Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}