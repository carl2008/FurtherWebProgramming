import { useState, useEffect } from "react";
import './DiscussionList.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ThumbsVote({repID, repType, load}){
    const [upNumber, setUpNumber] = useState(0)
    const [downNumber, setDownNumber] = useState(0)
    const [upID, setUpID] = useState('')
    const [downID, setDownID] = useState('')
    const [upped, setUpped] = useState(false)
    const [downed, setDowned] = useState(false)
    const endPoint = 'http://localhost:9000/'
    const USER_ID = "61390c39a7523845fca27baf"

    const loadUp = () => {
        setUpped(false)
        fetch(`${endPoint}${repType}/${repID}/thumbsup`)
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i<data.length;i++){
                    if(data[i].author._id === USER_ID){
                        setUpID(data[i]._id)
                        setUpped(true)
                    }
                }
                setUpNumber(data.length)
            })
    }

    const loadDown = () => {
        setDowned(false)
        fetch(`${endPoint}${repType}/${repID}/thumbsdown`)
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i<data.length;i++){
                    if(data[i].author._id === USER_ID){
                        setDownID(data[i]._id)
                        setDowned(true)
                    }
                }
                setDownNumber(data.length)
            })
    }

    useEffect(() => {
        loadUp()
        loadDown()
    }, [load])

    const handleThumbsUp = () => {
        if(!upped){
            fetch(`${endPoint}${repType}/${repID}/thumbsup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: USER_ID
                })
            }).then(res => {
                loadUp()
            })
            .catch((err) => console.log(err))

        }else{
            fetch(`${endPoint}thumbsup/${upID}`, {
                method: 'DELETE'
            }).then(res => {
                setUpID('')
                loadUp()
            })
            .catch((err) => console.log(err))
        }
        if(downed){
            fetch(`${endPoint}thumbsdown/${downID}`, {
                method: 'DELETE'
            }).then(res => {
                setDownID('')
                loadDown()
            })
            .catch((err) => console.log(err))
        }
    }

    const handleThumbsDown = () => {
        if(!downed){
            fetch(`${endPoint}${repType}/${repID}/thumbsdown`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: USER_ID
                })
            }).then(res => {
                loadDown()
            })
            .catch((err) => console.log(err))

        }else{
            fetch(`${endPoint}thumbsdown/${downID}`, {
                method: 'DELETE'
            }).then(res => {
                setDownID('')
                loadDown()
            })
            .catch((err) => console.log(err))
        }
        if(upped){
            fetch(`${endPoint}thumbsup/${upID}`, {
                method: 'DELETE'
            }).then(res => {
                setUpID('')
                loadUp()
            })
            .catch((err) => console.log(err))
        }
    }

    return(
        <>
        <button className="btn btn-xs text-muted has-icon mb-2"><i className="fas fa-thumbs-up mr-1" style={upped? {color:"#0086b3"} : {color:"#737373"}} aria-hidden="true" onClick={() => handleThumbsUp()}></i>{upNumber}</button>
        <button className="btn btn-xs text-muted has-icon mb-1 thumbs-icon"><i className="fas fa-thumbs-down mr-1" style={downed? {color:"#cd0032"} : {color:"#737373"}} aria-hidden="true" onClick={() => handleThumbsDown()}></i>{downNumber}</button>
        </>
    )
}