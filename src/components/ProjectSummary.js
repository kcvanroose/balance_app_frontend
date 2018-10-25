import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

const ProjectSummary = (props) => {

    let description = props.project.description.length > 70 ?
    props.project.description.substring(0,70)
    :
    props.project.description

    return (
        
            <div>
                <div className={props.project.completed ? 
                'small-cards completed row'
               :
                'small-cards due row'
                } >
                    <Link className="small-12 columns" to={`/projects/${props.project.id}`} >
                        <h3><strong>{props.project.name}</strong></h3>
                    </Link>
                    
                    <div className="small-12 columns"><strong>Description: </strong><br/><p>{description}...</p></div>
                    {props.project.completed ?
                    <div className="small-12 completed-project columns"><strong>Completed! </strong> </div>
                    :
                    <div className="small-12 due-project columns"><strong>Due date: </strong>
                        <Moment format="DD-MM-YYYY">{props.project.end_date}</Moment>
                    </div>
                    }
                </div>
            </div>
    )


}

export default ProjectSummary