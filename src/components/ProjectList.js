import React from 'react'
import ProjectSummary from './ProjectSummary'
import NewProject from './NewProject'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Icon from 'react-feather';


class ProjectList extends React.Component {

    state={
        newFormOpen: false,
        showAllProjects: false
    }

    toggleForm = () => {
        this.setState({ newFormOpen: !this.state.newFormOpen })
    }

    renderProjectSummary = () => {
        return  this.props.projects.map(project =>  !project.completed ?
            <ProjectSummary project={ project } /> 
            :
            <div></div>
        )
       
       
        
    }   

    renderCompletedProjects = () => {    
        return this.props.projects.map(project => project.completed ?
            <CSSTransition
                key={project.id}
               
                classNames="fade"
                timeout={{ enter: 5000, exit: 5000 }}
                appear={true}
            >
                <ProjectSummary project={ project } />
            </CSSTransition>
            :
            <div></div>  ) 
            
    }

    showAllProjects = (event) => {
       if (event.target.checked) {
        this.setState({ showAllProjects: true })
        } else {
         this.setState({ showAllProjects: false })
        } 
    }

    render(){
        
        let completedSection =  <div className="row">
                                    <div className="small-12 project-section columns">
                                        <h4>Active Projects</h4>
                                    </div>
                                </div>

        let renderCompletedProjects = this.props.projects.map(project => project.completed ?
            <CSSTransition
                key={project.id}
                classNames="slide"
                timeout={{ enter: 5000, exit: 5000 }}
                appear={true}
            >
                <ProjectSummary project={ project } />
            </CSSTransition>
            :
            <div></div>  ) 


        return(
            <div>
                <div className="row project-list">
                    <div className="small-8 columns">
                        <h2 className="project-section">Projects</h2>
                        <div className="switch tiny">
                            <input onChange={ (event) => this.showAllProjects(event)} className="switch-input" id="Switch" type="checkbox" name="exampleSwitch" />
                                <label className="switch-paddle" for="Switch">
                                    <span class="show-for-sr">View all Projects</span>
                                </label>
                        </div>
                    
                    </div>
                    <div className="small-4 add-project columns" >
                        <div className="text-right"><a onClick={ this.toggleForm } className="button">
                            {!this.state.newFormOpen ?
                                <Icon.FilePlus color='white'/>
                                :
                                <Icon.FileMinus />
                            }
                        </a></div>
                    </div>
                </div>
                {this.state.newFormOpen ?
               <CSSTransition
                        in={this.state.newFormOpen}
                        classNames="fade"
                        timeout={5000}
                        appear={true}
                    >
                    <NewProject clients={ this.props.clients } toggleForm={ this.toggleForm } addNewProject={this.props.addNewProject}/>
                </CSSTransition>
                :
                <div></div>}
                

                 {this.state.showAllProjects ?
                    <div>
                        <div className="row">
                            <div className="small-12 project-section columns">
                                
                                <h4>Completed Projects</h4>
                            
                            </div>
                        </div>
                        <TransitionGroup>
                            {renderCompletedProjects}
                        </TransitionGroup>
                    </div>
                 :
                 <div></div>
                
                }
                 {
                    this.state.showAllProjects ?
                    completedSection
                    :
                    <div></div>
                }
                
                {this.props.projects ?
                
                 this.renderProjectSummary() 
               
                :
                 <p>loading</p>}
               
            </div>

        )
    }

}

ProjectList.defaultProps = {
    projects: []
}

export default ProjectList

