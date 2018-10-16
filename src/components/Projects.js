import React from 'react'
import ProjectList from './ProjectList'
import ProjectView from './ProjectView'
import { Route, Switch } from 'react-router-dom'

class Projects extends React.Component {

    

    render(){
     
        return(
            <Switch>
                <Route exact path="/projects" component={props => <ProjectList projects={ this.props.projects } clients={this.props.clients} addNewProject={this.props.addNewProject} /> }/>
                <Route path="/projects/:id" component={props => <ProjectView addNewTask={this.props.addNewTask} toggleTaskState={ this.props.toggleTaskState } {...props} projects={ this.props.projects } /> } />
            </Switch>
        )
    }
}

export default Projects

