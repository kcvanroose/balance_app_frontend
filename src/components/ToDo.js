import React from 'react'
import Moment from 'react-moment';

const ToDo = (props) => {
    
    return( 
        <div className="row">
            <p className="small-12 columns">{props.toDo.description}</p>
            <p className="small-6 columns">Due date: <Moment format="DD-MM-YYYY">{props.toDo.due_date}</Moment></p>
            <div className="small-6 columns">
                <button  className="right button"
                onClick={() => props.toggleTaskState(props.toDo.id)}>
                Complete
                </button>
            </div>          
        </div>
    )
}

export default ToDo
