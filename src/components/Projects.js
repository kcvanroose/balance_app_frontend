import React from 'react'
import ProjectList from './ProjectList'
import ProjectView from './ProjectView'
import { Route, Switch } from 'react-router-dom'

class Projects extends React.Component {

    // completedProjects = () => {
    //     let completedTasks = []
    //     let toDos = [] 
    //     let project = this.props.projects.find(project => project.id === parseInt(this.props.match.params.id))
    //         project.tasks.map(task => { 
    //                 if (!task.completed) { 
    //                     toDos.push(task) 
    //                 } else {
    //                     completedTasks.push(task)
    //                 }
    //             } )
    //     return <Project addNewTask={this.props.addNewTask} 
    //                     toggleTaskState={ this.props.toggleTaskState } 
    //                     project={ project } 
    //                     completedTasks={completedTasks} 
    //                     toDos={toDos} />
    // }
   



    render(){
     
        return(
            <Switch>
                <Route exact path="/projects" component={props => <ProjectList projects={ this.props.projects } clients={this.props.clients} addNewProject={this.props.addNewProject} /> }/>
                <Route path="/projects/:id" component={props => <ProjectView toggleProjectState={this.props.toggleProjectState} 
                                                                            addNewTask={this.props.addNewTask} 
                                                                            toggleTaskState={ this.props.toggleTaskState }
                                                                             {...props} projects={ this.props.projects } 
                                                                             updateTime={this.props.updateTime} 
                                                                             deleteProject={this.props.deleteProject}/> } />
            </Switch>
        )
    }
}

export default Projects

