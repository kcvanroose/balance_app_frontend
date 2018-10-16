import React from 'react'
import ProjectSummary from './ProjectSummary'
import NewProject from './NewProject'

class ProjectList extends React.Component {

    state={
        newFormOpen: false
    }

    toggleForm = () => {
        this.setState({ newFormOpen: !this.state.newFormOpen })
    }

    renderProjectSummary = () => {      
    
        return this.props.projects.map(project =>   <ProjectSummary project={ project } /> )
    }   

    render(){
        return(
            <div>
                <div className="row">
                    <h2 className="small-6 columns">All Projects</h2>
                    <button onClick={ this.toggleForm } className="button small-6 columns">Add new project</button>
                </div>
                {this.state.newFormOpen ?
                    <NewProject clients={ this.props.clients } toggleForm={ this.toggleForm } addNewProject={this.props.addNewProject}/>
                :
                <div></div>}
                {this.props.projects ?
                 this.renderProjectSummary() 
                :
                 <p>loading</p>}
            </div>

        )
    }

}

export default ProjectList