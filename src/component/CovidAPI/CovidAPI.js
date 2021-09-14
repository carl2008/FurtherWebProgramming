import { USER_NAME, USER_INFO } from '../../constants'
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './API.css';

export default function CovidAPI() {
    const userName = localStorage.getItem(USER_NAME)
    const userInfo = localStorage.getItem(USER_INFO)

    const endPoint = "https://api.covid19api.com/dayone/country/vietnam"
    const [data, setData] = useState([])
    let yesterdayTotalCase = 0
    let dayBeforeYesterdayTotalCase = 0
    let yesterdayTotalDeath = 0
    let dayBeforeYesterdayTotalDeath = 0
    const [timeStamp, setTimeStamp] = useState();
    var casePer7Days = []
    const vnPopulation = 98326682

    const load = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(data => setData(data))
    }

    // initial API load
    useEffect(() => {
        load()
        let currentDate = new Date()
        let month = currentDate.getMonth() + 1
        let minute = currentDate.getMinutes()
        if (minute < 10) {
            minute = '0' + minute
        }
        setTimeStamp(currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + "@" + currentDate.getHours() + ":" + minute)

    }, [])

    // load API using interval (600000ms = 10 min)
    useEffect(() => {
        const intervalId = setInterval(() => {
            load()
            let currentDate = new Date()
            let month = currentDate.getMonth() + 1
            let minute = currentDate.getMinutes()
            if (minute < 10) {
                minute = '0' + minute
            }
            setTimeStamp(currentDate.getDate() + "/" + month + "/" + currentDate.getFullYear() + "@" + currentDate.getHours() + ":" + minute)
        }, 600000)
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        if(userInfo){
            console.log(JSON.parse(userInfo))
        }
    })
    return (
        <>
            {/* testing localstorage - can change later */}
            {userName &&
                <div className="pb-5">
                    <h1>Welcome, {userName}</h1>
                </div>}

            <div className="jumbotron stat-panel">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="d-flex justify-content-center" style={{ margin: "5px 0px 10px 0px" }}>
                    <h3 style={{ marginBottom: "20px" }}>Vietnam COVID-19 Statistics <span style={{ fontSize: "16px" }}>*</span></h3>
                </div>
                {data.map((item, index) => {
                    // store each day within 7 days from previous day's total cases
                    if (index >= data.length - 8 && index < data.length - 1) {
                        casePer7Days.push(item.Confirmed - data[index - 1].Confirmed)
                    }
                    if (index === data.length - 3) {
                        dayBeforeYesterdayTotalCase = item.Confirmed
                        dayBeforeYesterdayTotalDeath = item.Deaths
                    }
                    if (index === data.length - 2) {
                        yesterdayTotalCase = item.Confirmed
                        yesterdayTotalDeath = item.Deaths
                    }
                    if (index === data.length - 1) {
                        var totalCasePer7 = 0
                        for (var i = 0; i < casePer7Days.length; i++) {
                            totalCasePer7 += casePer7Days[i]
                        }
                        var avgCasePer7 = totalCasePer7 / casePer7Days.length

                        // if today's cases are update then use today's data set
                        if (item.Confirmed !== yesterdayTotalCase) {
                            return (
                                <div key="index" className="row">
                                    <div className="stat">
                                        <div className="stat-icon-bg" style={{ background: "#ECEAF8" }}>
                                            <i className="fa fa-users stat-icon" style={{ margin: "30% 33%", color: "#7367f0" }}></i>
                                        </div>
                                        <p className="stat-num" style={{ textAlign: "center" }}><b>Total Cases</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{item.Confirmed}</span></p>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-icon-bg" style={{ background: "#E3F4F7" }}>
                                            <i className="fa fa-user-plus stat-icon" style={{ margin: "30% 36%", color: "#00CFE8" }}></i>
                                        </div>
                                        <p className="stat-num"><b>Latest Cases</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{item.Confirmed - yesterdayTotalCase}</span></p>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-icon-bg" style={{ background: "#F6EAE9" }}>
                                            <i className="fa fa-user-times stat-icon" style={{ margin: "30% 35%", color: "#EA8082" }}></i>
                                        </div>
                                        <p className="stat-num"><b>Latest Deaths</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{item.Deaths - yesterdayTotalDeath}</span></p>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-icon-bg" style={{ background: "#ECEAF8" }}>
                                            <i className="fa fa-exclamation-triangle stat-icon" style={{ margin: "27% 29%", color: "#7367f0", fontSize: "20px" }}></i>
                                        </div>
                                        <p className="stat-num"><b>Average Cases Per 7 Days</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{Math.ceil(avgCasePer7)}</span></p>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-icon-bg" style={{ background: "#E3F4F7" }}>
                                            <i className="fa fa-user stat-icon" style={{ margin: "30% 38%", color: "#00CFE8" }}></i>
                                        </div>
                                        <p className="stat-num"><b>1 Case For Every</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{Math.ceil(vnPopulation / item.Confirmed)} People</span></p>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-icon-bg" style={{ background: "#E6F4EC" }}>
                                            <i className="fa fa-calendar stat-icon" style={{ margin: "30% 35%", color: "#61D194" }}></i>
                                        </div>
                                        <p className="stat-num" style={{ textAlign: "center" }}><b>Last Updated</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "22px" }}>{timeStamp}</span></p>
                                    </div>

                                    {/* empty out casePer7Days array for future updates */}
                                    {casePer7Days = []}
                                </div>
                            )
                        }
                        // if today's cases is not updated then use yesterday's data set
                        return (
                            <div key="index" className="row">
                                <div className="stat">
                                    <div className="stat-icon-bg" style={{ background: "#ECEAF8" }}>
                                        <i className="fa fa-users stat-icon" style={{ margin: "30% 32%", color: "#7367f0" }}></i>
                                    </div>
                                    <p className="stat-num" style={{ textAlign: "center" }}><b>Total Cases</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{item.Confirmed}</span></p>
                                </div>
                                <div className="stat">
                                    <div className="stat-icon-bg" style={{ background: "#E3F4F7" }}>
                                        <i className="fa fa-user-plus stat-icon" style={{ margin: "30% 36%", color: "#00CFE8" }}></i>
                                    </div>
                                    <p className="stat-num"><b>Latest Cases</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{yesterdayTotalCase - dayBeforeYesterdayTotalCase}</span></p>

                                </div>
                                <div className="stat">
                                    <div className="stat-icon-bg" style={{ background: "#F6EAE9" }}>
                                        <i className="fa fa-user-times stat-icon" style={{ margin: "30% 35%", color: "#EA8082" }}></i>
                                    </div>
                                    <p className="stat-num"><b>Latest Deaths</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{yesterdayTotalDeath - dayBeforeYesterdayTotalDeath}</span></p>
                                </div>
                                <div className="stat">
                                    <div className="stat-icon-bg" style={{ background: "#ECEAF8" }}>
                                        <i className="fa fa-exclamation-triangle stat-icon" style={{ margin: "27% 29%", color: "#7367f0", fontSize: "20px" }}></i>
                                    </div>
                                    <p className="stat-num"><b>Average Cases Per 7 Days</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{Math.ceil(avgCasePer7)}</span></p>
                                </div>
                                <div className="stat">
                                    <div className="stat-icon-bg" style={{ background: "#E3F4F7" }}>
                                        <i className="fa fa-user stat-icon" style={{ margin: "30% 38%", color: "#00CFE8" }}></i>
                                    </div>
                                    <p className="stat-num"><b>1 Case For Every</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "24px" }}>{Math.ceil(vnPopulation / item.Confirmed)} People</span></p>
                                </div>
                                <div className="stat">
                                    <div className="stat-icon-bg" style={{ background: "#E6F4EC" }}>
                                        <i className="fa fa-calendar stat-icon" style={{ margin: "30% 35%", color: "#61D194" }}></i>
                                    </div>
                                    <p className="stat-num" style={{ textAlign: "center" }}><b>Last Updated</b><br /><span className="d-flex justify-content-center" style={{ fontSize: "22px" }}>{timeStamp}</span></p>
                                </div>

                                {/* empty out casePer7Days array for future updates */}
                                {casePer7Days = []}
                            </div>
                        )
                    }
                    return null;
                }
                )}
                <p className="pull-right" style={{ fontSize: "10px", marginBottom: "0" }}><i>* These statistics are not official and should only be used for reference purposes</i></p><br></br>
                <p className="pull-right" style={{ fontSize: "10px", marginTop: "0" }}><i>Data fetched from: <a href="https://api.covid19api.com/dayone/country/vietnam" target="_blank" rel="noreferrer">https://api.covid19api.com/dayone/country/vietnam</a></i></p>
            </div>
        </>
    )
}

