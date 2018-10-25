import React from 'react'
import * as Icon from 'react-feather';

const Task = props => {
    return (
        <div className="row small-cards completed">
            <div className="small-12 columns">
                <button  className=""
                    onClick={() => props.toggleTaskState(props.task.id)}>
                    <Icon.XCircle color="#53A2DA"/>
                </button>
            </div>
            <div className="small-12 columns">
                 <p>{props.task.description}</p>
            </div>
            <div className="small-12 completed-project columns" ><strong>Completed!</strong></div>
        </div>
    )
} 

export default Task