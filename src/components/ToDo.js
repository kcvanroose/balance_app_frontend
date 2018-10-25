import React from 'react'
import Moment from 'react-moment';
import * as Icon from 'react-feather';

const ToDo = (props) => {
    
    return( 
        <div className="small-cards due row">
            <div className="small-12 columns">
                <button  className=""
                    onClick={() => props.toggleTaskState(props.toDo.id)}>
                    <Icon.CheckCircle color="#82E0C1" />
                </button>
            </div>
            <div className="small-12 columns">
                <p>{props.toDo.description}</p>
            </div>
            <div className="small-12 due-project columns" ><strong>Due date: </strong><Moment format="DD-MM-YYYY">{props.toDo.due_date}</Moment></div>       
        </div>
    )
}

export default ToDo
