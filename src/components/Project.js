import React from 'react'
import Task from './Task'
import ToDo from './ToDo'
import NewTask from './NewTask'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


class Project extends React.Component {

    state={
        showAllTasks: false,
        toDo: [],
        newFormOpen: false
    }

    openForm = () => {
        this.setState({ newFormOpen: true })
    }

    closeForm = () => {
        this.setState({newFormOpen: false})
    }

    handleClick = () => {
        this.setState({ showAllTasks: !this.state.showAllTasks })
    }
    
    renderCompletedTasks = () => {
        if (this.props.completedTasks.length >0) {
            return this.props.completedTasks.map(task => <Task toggleTaskState={this.props.toggleTaskState} task={task} />)
        } 
    }

    renderToDos = () => {
        if (this.props.toDos.length > 0) {
            return this.props.toDos.map(toDo => <ToDo toggleTaskState={ this.props.toggleTaskState } toDo={toDo} />)
        } else {
            return <div className="row">
                        <p className="small-12 columns">No tasks due</p>
                    </div>
        }
    }
    renderNewTaskForm = () => {
        return <NewTask projectId={this.props.project.id} addNewTask={this.props.addNewTask} closeForm={this.closeForm} />
    }

    renderProject = () => {
        return (
            <div>
                <div className="row">
                    <div className="small-12 columns">
                        <Link to={`/projects/`} >
                            <p>Back to all projects</p>
                        </Link>
                    </div>
                </div>

            {!this.props.project ?
                <div className="row">
                    <p>no project found</p>
                </div> :
                <div className="project row">
                    
                        <h2 className="small-12 columns"><strong>{this.props.project.name}</strong></h2>
                        <p className="small-6 columns"><strong>Time spent: </strong>{this.props.project.time_spent}</p>
                        <button className="small-4 button columns">start timer</button>
                        <p className="small-12 columns"><strong>Project details: </strong></p>
                        <p className="small-12 columns" >{this.props.project.description}</p>
                        <p className="small-12 columns"><strong>Due date: </strong><Moment format="DD-MM-YYYY">{ this.props.project.end_date }</Moment></p>
                        <div className="small-12 columns">
                            <button onClick={ this.openForm } className="button space-right">Add new task</button>
                            
                            { this.props.completedTasks.length > 0 ? 
                                <button className="button"
                                    onClick={() => this.handleClick()}>
                                    {this.state.showAllTasks ? 'View due tasks' : 'View all tasks'}
                                </button>
                            :
                            <div></div>
                            }
                        </div>
                </div>
            }
            </div>
        )
    }



    render() {
        return (
            <div>
                { this.renderProject() }
                {this.state.newFormOpen ?
                this.renderNewTaskForm()
                :
                null }
                { this.renderToDos() }
                { this.state.showAllTasks ?
                    this.renderCompletedTasks()
                :
                    <div></div> 
                }
            </div>
        )
    }
}

Project.defaultProps = {
    toDos: [],
    project: {}
}

export default Project