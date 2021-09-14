import React from 'react';
import { Result } from 'antd';
import { Link } from "react-router-dom";

function PageNotFound() {

    return (
        <>
            <div className="container">
                <Result
                    status="404"
                    title="404 PAGE NOT FOUND"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to={`/`}><button className="btn btn-primary">Back Home</button></Link>}
                />
            </div>
        </>
    )
}

export default PageNotFound;
