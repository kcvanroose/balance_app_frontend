import React from 'react'
import Task from './Task'
import ToDo from './ToDo'
import NewTask from './NewTask'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Icon from 'react-feather';


class Project extends React.Component {

    state={
        showAllTasks: false,
        toDo: [],
        newFormOpen: false,
        timerOn: false,
    }

    openForm = () => {
        this.setState({ newFormOpen: !this.state.newFormOpen })
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


    addTime = () => {
        this.setState({time: this.state.time + 1})
    }

    startTimer = () => {
        if (!this.state.timerOn) {
            this.setState({ time: this.props.project.time_spent,
            timerOn: true,
        }) 
            this.timer = setInterval(this.addTime, 1000);
        } else {
            this.setState({ timerOn: false })
            clearInterval(this.timer)
            this.props.updateTime( this.props.project, this.state.time )
        }
    }

    fancyTimeFormat = (time) => {   
        // Hours, minutes and seconds
        let hrs = ~~(time / 3600);
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    renderProject = () => {
        return (
            <div>
                <div className="row">
                    <div className="small-12 columns">
                        <Link to={`/projects/`} >
                            <Icon.ArrowLeft />
                        </Link>
                    </div>
                </div>

            {!this.props.project ?
                <div className="row">
                    <p>no project found</p>
                </div> :
                <div>
                    <div className={this.props.project.completed ? 
                        'project-top row'
                    :
                        'project-top row'
                        } >
                        <h2 className="small-8 card-top columns"><strong>{this.props.project.name}</strong></h2>
                        <div className="text-right card-top-2 columns"><button onClick={ () => this.props.deleteProject(this.props.project.id) } className="delete-top"><Icon.Trash2 color="white"/></button></div>
                    
                        <div className="small-12 timer columns">
                            <button onClick={ this.startTimer } className="button"><Icon.Clock /></button>
                        </div>
                    </div>
                    <div className="row project-middle">
                        <div className="small-4 text-center columns"><span className="stat-label">Time spent</span><br/>
                            {this.state.time ?
                            <p className="columns total-prog">{this.fancyTimeFormat(this.state.time)}</p>
                            :
                            <p className="columns total-prog">{this.fancyTimeFormat(this.props.project.time_spent)}</p>
                            }
                        </div>
                        <div className="small-4 text-center columns"><span className="stat-label">Hourly rate</span><br/>
                            <p className="columns total-prog">£{this.props.project.hourly_rate}</p>
                        </div>

                        <div className="small-4 text-center columns"><span className="stat-label">Fee</span><br/>
                            <p className="columns total-prog">£{this.props.project.fee}</p>
                        </div>
                   
                        <p className="small-12 columns"><strong>Project details: </strong></p>
                        <p className="small-12 description columns" >{this.props.project.description}</p>
                    </div>
                    <div className="row project-bottom">
                            <div className="small-12 columns">
                                <p><strong>Client:  <Link to={`/clients/${this.props.project.client.id}`}>{this.props.project.client.name}</Link></strong></p>
                            </div>
                            <p className="small-6 columns"><strong>Due date: </strong><br/><Moment format="DD-MM-YYYY">{ this.props.project.end_date }</Moment></p>
                            <label className="small-6 columns" for="completed"><strong className='completed'>Complete </strong>
                                <input checked={this.props.project.completed} onChange={ (event) => this.props.toggleProjectState(this.props.project, this.state.time)} id="completed" type="checkbox"/>
                            </label>
                            <div className="small-12 columns">
                                
                                <button onClick={ this.openForm } className="button space-right">{this.state.newFormOpen ? 'Close' : 'Add new task'}</button>
                                
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
                </div>
                    
            }
            </div>
        )
    }



    render() {

        let renderToDos = this.props.toDos.map(toDo => 
                <CSSTransition
                    key={toDo.id}
                    classNames="slide"
                    timeout={500}
                    appear={true}
                >
                    <ToDo toggleTaskState={ this.props.toggleTaskState } toDo={toDo} />
                </CSSTransition>
                )

        let completedTasks = this.props.completedTasks.map(task => 
            <CSSTransition
            key={task.id}
            classNames="slide"
            timeout={{ enter: 500, exit: 500 }}
            appear={true}
          >
                <Task toggleTaskState={this.props.toggleTaskState} task={task} />
                
            </CSSTransition>
            )

        return (
            <div>
                { this.renderProject() }
                {this.state.newFormOpen ?
                <CSSTransition
                    in={this.state.newFormOpen}
                    classNames="fade"
                    timeout={{ enter: 5000, exit: 5000 }}
                    appear={true}
                   
                    onExit={this.state.newFormOpen}
                >
                    {this.renderNewTaskForm()}
                </CSSTransition>
                :
                null }

                { this.props.toDos.length > 0 ?
                <div>
                    <div className="row">
                        <p className="small-12 columns">Due tasks</p>
                    </div>
                        <TransitionGroup>
                            {renderToDos}
                        </TransitionGroup>
                </div>
                :
                <div className="row">
                    <p className="small-12 columns">No tasks due</p>
                </div>
                }

                { this.state.showAllTasks ?
                <div>
                    <div className="row">
                        <p className="small-12 columns">Completed tasks</p>
                    </div>
                        <TransitionGroup>
                        { completedTasks }
                        </TransitionGroup>
                </div>
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