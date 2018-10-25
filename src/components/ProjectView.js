import React from 'react'
import Project from './Project'


class ProjectView extends React.Component {
   
    currentProject = () => {
        let completedTasks = []
        let toDos = [] 
        let project = this.props.projects.find(project => project.id === parseInt(this.props.match.params.id))
            project.tasks.map(task => { 
                    if (!task.completed) { 
                        toDos.push(task) 
                    } else {
                        completedTasks.push(task)
                    }
                } )
        return <Project toggleProjectState={this.props.toggleProjectState} 
                        addNewTask={this.props.addNewTask} 
                        toggleTaskState={ this.props.toggleTaskState } 
                        project={ project } 
                        completedTasks={completedTasks} 
                        toDos={toDos} 
                        updateTime={this.props.updateTime}
                        deleteProject={this.props.deleteProject} />
    }
   
    render() {
        return(
            <div>
                {
                    this.props.projects ?
                    this.currentProject()
                    :
                    <p>loading</p>
                }
            </div>
        )
    }
}



export default ProjectView