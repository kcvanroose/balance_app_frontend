import React from 'react'
import Moment from 'react-moment';

const Task = props => {
    return (
        <div className="row">
            <p className="small-12 columns">{props.task.description}</p>
            <p className="small-12 columns">Due date: <Moment format="DD-MM-YYYY">{props.task.due_date}</Moment></p>
            <div className="small-12 columns">
                <button  className="button"
                onClick={() => props.toggleTaskState(props.task.id)}>
                Incomplete
                </button>
            </div>        
        </div>
    )
} 

export default Task