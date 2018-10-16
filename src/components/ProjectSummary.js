import React from 'react'
import { Link } from 'react-router-dom'
import { getPortPromise } from 'portfinder';
import Moment from 'react-moment';

const ProjectSummary = (props) => {


    return (
        <Link to={`/projects/${props.project.id}`} >
            <div className="small-project row">
                <div className="small-6 columns"><strong>{props.project.name}</strong></div>
                <div className="small-6 columns"><strong>Due date: </strong><Moment format="DD-MM-YYYY">{props.project.end_date}</Moment></div>
                <div className="small-6 columns"><strong>Description: </strong>{props.project.description}</div>
            </div>
        </Link>
    )


}

export default ProjectSummary