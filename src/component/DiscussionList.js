import { useState, useEffect, useRef } from "react";
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reply from "./Reply";

export default function DiscussionList() {
    const [discussions, setDiscussions] = useState([])
    const [results, setResults] = useState([])
    const [replies, setReplies] = useState()
    const [show, setShow] = useState(true)
    const endPoint = 'https://611fc518c772030017424085.mockapi.io/api/v1/topics'

    const loadDiscussions = () => {
        let obj = {}
        fetch(endPoint)
            .then(response => response.json())
            .then(data => {
                setDiscussions(data)
                setResults(data)
                for (let i = 0; i < discussions.length; i++) {
                    fetch(endPoint + `/${discussions[i].id}/replies`)
                        .then(res => res.json())
                        .then(repliesData => {
                            obj[discussions[i].id] = repliesData.length
                        })
                }
            })
        console.log(obj)
        setReplies(obj)
    }

    /*const loadReplies = (id) => {
        let array = []
        fetch(endPoint + `/${id}/replies`)
            .then(response => response.json())
            .then(data => {
                array.push({ id: data.length })
                setReplies(array)
            })
        console.log(replies)
    }*/

    const [sortValue, setSortValue] = useState('latest')

    useEffect(() => {
        loadDiscussions()
        setResults(doSort(sortValue, discussions))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        let keyword = e.target.value
        if(keyword){
            let newList = discussions.filter(discussion => {
                return discussion.title.toLowerCase().includes(keyword.toLowerCase())
            })
            setResults(doSort(sortValue, newList))
        }else{
            setResults(doSort(sortValue, discussions))
        }
    }

    const handleSort = (e) => {
        e.preventDefault()
        setSortValue(e.target.value)
        setResults(doSort(sortValue, results))
    }

    const doSort = (value, list) => {
        switch(value){
            case "latest":
                list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                break;
            case "oldest":
                list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break;
            case "mostrep":
                list.sort((a, b) => replies[a.id] - replies[b.id])
                break;
            case "leastrep":
                list.sort((a, b) => replies[b.id] - replies[a.id])
                break;
        }
        return list
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />
            <div class="container">
                <div class="main-body p-0">
                    <div class="inner-wrapper">
                        {/*Inner sidebar*/}
                        <div class="inner-sidebar">
                            {/*Inner sidebar header*/}
                            <div class="inner-sidebar-header justify-content-center">
                                <button class="btn btn-primary has-icon btn-block" type="button" data-toggle="modal" data-target="#threadModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mr-2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    NEW DISCUSSION
                                </button>
                            </div>
                            {/*Inner sidebar header*/}

                            {/*Inner sidebar body*/}
                            <div class="inner-sidebar-body p-0">
                                <div class="p-3 h-100" data-simplebar="init">
                                    <div class="simplebar-wrapper" style={{ margin: '-16px' }}>
                                        <div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div>
                                        <div class="simplebar-mask">
                                            <div class="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                                                <div class="simplebar-content-wrapper" style={{ height: '100%' }}>
                                                    <div class="simplebar-content" style={{ padding: '16px' }}>
                                                        <nav class="nav nav-pills nav-gap-y-1 flex-column">
                                                            <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon active">All Threads</a>
                                                            <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon">Popular this week</a>
                                                            <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon">Popular all time</a>
                                                            <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon">Solved</a>
                                                            <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon">Unsolved</a>
                                                            <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon">No replies yet</a>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="simplebar-placeholder" style={{ width: '234px', height: '292px' }}></div>
                                    </div>
                                    {/*<div class="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div class="simplebar-scrollbar" style={{width: '0px', display: 'none'}}></div></div>
                                    <div class="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div class="simplebar-scrollbar" style={{height: '151px', display: 'block', transform: 'translate3d(0px, 0px, 0px)'}}></div></div>*/}
                                </div>
                            </div>
                            {/*Inner sidebar body*/}
                        </div>
                        {/*Inner sidebar*/}

                        {/*Inner main*/}
                        <div class="inner-main">
                            {/*Inner main header*/}
                            <div class="inner-main-header">
                                <a class="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none" href="#" data-toggle="inner-sidebar"><i class="material-icons">arrow_forward_ios</i></a>
                                <select class="custom-select custom-select-sm w-auto mr-1" onChange={handleSort} value={sortValue}>
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="mostrep">Most replies</option>
                                    <option value="leastrep">Least replies</option>
                                </select>
                                <span class="input-icon input-icon-sm ml-auto w-auto">
                                    <input type="text" class="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4" placeholder="Search discussion" onChange={handleSearch}/>
                                </span>
                            </div>
                            {/*Inner main header*/}

                            {/*Inner main body*/}

                            {/*Forum list*/}
                            <div class="inner-main-body p-2 p-sm-3 collapse forum-content show">
                                {results.map((discussion, i) => {
                                    return (
                                        <div key={`discussion${i}`}>
                                            <div class="card mb-2" style={show ? { display: "block" } : { display: 'none' }}>
                                                <div class="card-body p-2 p-sm-3">
                                                    <div class="media forum-item">
                                                        <a href="#" data-toggle="collapse"><img src={discussion.avatar} class="mr-3 rounded-circle" width="50" alt="User" /></a>
                                                        <div class="media-body">
                                                            <h6><a href={`/Discussion/${discussion.id}`} data-toggle="collapse" data-target={`#discussion-${discussion.id}`} class="text-body" onClick={() => setShow(!show)}>{discussion.title}</a></h6>
                                                            <p class="text-secondary">
                                                                {discussion.content}
                                                            </p>
                                                            <p class="text-muted">Asked by <a href="javascript:void(0)">{discussion.name} </a>
                                                                <span class="text-secondary font-weight-bold">
                                                                    - {(new Date(discussion.createdAt)).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div class="text-muted small text-center align-self-center">
                                                            <span class="d-none d-sm-inline-block"><i class="far fa-eye"></i> 99</span>
                                                            <span><i class="far fa-comment ml-2"></i> {replies[discussion.id]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Forum Detail*/}
                                            <div class="inner-main-body p-2 p-sm-3 collapse forum-content" id={`discussion-${discussion.id}`}>
                                                <a href="#" class="btn btn-light btn-sm mb-3 has-icon" data-toggle="collapse" data-target={`#discussion-${discussion.id}`} onClick={() => setShow(!show)}><i class="fa fa-arrow-left mr-2"></i>Back</a>
                                                <div class="card mb-2">
                                                    <div class="card-body">
                                                        <div class="media forum-item">
                                                            <a href="javascript:void(0)" class="card-link">
                                                                <img src={discussion.avatar} class="rounded-circle" width="50" alt="User" />
                                                                <small class="d-block text-center text-muted">Patient</small>
                                                            </a>
                                                            <div class="media-body ml-3">
                                                                <a href="javascript:void(0)" class="text-secondary">{discussion.name}</a>
                                                                <small class="text-muted ml-2">- {(new Date(discussion.createdAt)).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</small>
                                                                <h5 class="mt-1">{discussion.title}</h5>
                                                                <div class="mt-3 font-size-sm">
                                                                    <p>{discussion.content}</p>
                                                                </div>
                                                                <a href="javascript:void(0)" class="text-muted small">Reply</a>
                                                            </div>
                                                            <div class="text-muted small text-center">
                                                                <span class="d-none d-sm-inline-block"><i class="far fa-eye"></i> 19</span>
                                                                <span><i class="far fa-comment ml-2"></i> {replies[discussion.id]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Replies section*/}
                                                <Reply id={discussion.id}/>
                                            </div>
                                            {/*Forum Detail*/}
                                        </div>
                                    )
                                })}

                                <ul class="pagination pagination-sm pagination-circle justify-content-center mb-0">
                                    <li class="page-item disabled">
                                        <span class="page-link has-icon"><i class="material-icons">chevron_left</i></span>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>
                                    <li class="page-item active"><span class="page-link">2</span></li>
                                    <li class="page-item"><a class="page-link" href="javascript:void(0)">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link has-icon" href="javascript:void(0)"><i class="material-icons">chevron_right</i></a>
                                    </li>
                                </ul>
                            </div>
                            {/*Forum List*/}

                            {/*Forum Detail*/}
                            {/*<div class="inner-main-body p-2 p-sm-3 collapse forum-content">
                                <a href="#" class="btn btn-light btn-sm mb-3 has-icon" data-toggle="collapse" data-target=".forum-content"><i class="fa fa-arrow-left mr-2"></i>Back</a>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div class="media forum-item">
                                            <a href="javascript:void(0)" class="card-link">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle" width="50" alt="User" />
                                                <small class="d-block text-center text-muted">Newbie</small>
                                            </a>
                                            <div class="media-body ml-3">
                                                <a href="javascript:void(0)" class="text-secondary">Mokrani</a>
                                                <small class="text-muted ml-2">1 hour ago</small>
                                                <h5 class="mt-1">Realtime fetching data</h5>
                                                <div class="mt-3 font-size-sm">
                                                    <p>Hellooo :)</p>
                                                    <p>
                                                        I'm newbie with laravel and i want to fetch data from database in realtime for my dashboard anaytics and i found a solution with ajax but it dosen't work if any one have a simple solution it will be
                                                        helpful
                                                    </p>
                                                    <p>Thank</p>
                                                </div>
                                            </div>
                                            <div class="text-muted small text-center">
                                                <span class="d-none d-sm-inline-block"><i class="far fa-eye"></i> 19</span>
                                                <span><i class="far fa-comment ml-2"></i> 3</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div class="media forum-item">
                                            <a href="javascript:void(0)" class="card-link">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="rounded-circle" width="50" alt="User" />
                                                <small class="d-block text-center text-muted">Pro</small>
                                            </a>
                                            <div class="media-body ml-3">
                                                <a href="javascript:void(0)" class="text-secondary">drewdan</a>
                                                <small class="text-muted ml-2">1 hour ago</small>
                                                <div class="mt-3 font-size-sm">
                                                    <p>What exactly doesn't work with your ajax calls?</p>
                                                    <p>Also, WebSockets are a great solution for realtime data on a dashboard. Laravel offers this out of the box using broadcasting</p>
                                                </div>
                                                <button class="btn btn-xs text-muted has-icon"><i class="fa fa-heart" aria-hidden="true"></i>1</button>
                                                <a href="javascript:void(0)" class="text-muted small">Reply</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                            {/*Forum Detail*/}

                            {/*Inner main body*/}
                        </div>
                        {/*Inner main*/}
                    </div>

                    {/*New Thread Modal*/}
                    <div class="modal fade" id="threadModal" tabindex="-1" role="dialog" aria-labelledby="threadModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <form>
                                    <div class="modal-header d-flex align-items-center bg-primary text-white">
                                        <h6 class="modal-title mb-0" id="threadModalLabel">New Discussion</h6>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="threadTitle">Title</label>
                                            <input type="text" class="form-control" id="threadTitle" placeholder="Enter title" autofocus="" />
                                        </div>
                                        <textarea class="form-control summernote" style={{ display: 'none' }}></textarea>

                                        <div class="custom-file form-control-sm mt-3" style={{ maxWidth: '300px' }}>
                                            <input type="file" class="custom-file-input" id="customFile" multiple="" />
                                            <label class="custom-file-label" for="customFile">Attachment</label>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary">Post</button>
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