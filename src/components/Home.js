import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

class Home extends React.Component {

    dueProjects = () => {
        return this.props.data.projects.filter(project => !project.completed )
    }
    
    mostRecent = () => {
        return this.dueProjects().sort((a,b) => 
           a.id - b.id
        ) 
    }


    last3Projects = () => {
        let mostRecent = this.mostRecent()
       return mostRecent.slice(-3).map(project => <ProjectSummary project={project} />)
    }

    timeSpent = () => {
      return this.fancyTimeFormat(this.dueProjects().map(project => project.time_spent).reduce((a,b) => {
           return a + b }, 0)
       )
    }

    totalEarned = () => {
      return this.dueProjects().map(project => project.fee).reduce((a,b) => {
           return a + b }, 0 )
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



    render() {
        return (
            <div>
                { !this.props.data.currentUser ?
                <div className="row">
                    <div className="small-12 text-center columns">
                        <img alt="loading" className="loader"  src={require("../Loading.gif")} />
                    </div>
                </div>
                :
                


                <div>
                    <div className="row">
                        <div className="small-12 business columns">
                            <h2>{this.props.data.currentUser.business_name}</h2>
                        </div>
                        <div className="small-12 columns">
                            <i>Active projects</i>
                        </div>
                    </div>
                    <div className="stats align-justify row">
                        <div className="small-4 text-center columns">
                            <span className="stat-label">Total projects</span><br/>
                            <span className="total-prog">{this.dueProjects().length}</span>
                        </div>
                        <div className="small-4 text-center columns">
                        <span className="stat-label">Time spent</span><br/>
                            <span className="total-spen">{this.timeSpent()}</span>
                        </div>
                        <div className="small-4 text-center columns">
                        <span className="stat-label">Total earnt</span><br/>
                       <span className="total-earn">£{this.totalEarned()}</span>
                        </div>
                    </div>
                    {!this.props.data.projects ?
                    <div className="row">
                        <div className="small-12 columns">
                            <p>No projects due</p>
                            <button className="button"><Link to="/projects">Add a project</Link></button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="small-12 columns">
                                <i>Recent projects</i>
                            </div>
                        </div>
                        {this.last3Projects() }
                    </div>
                    }
                </div>
                }
            </div>
        )
    }

}

Home.defaultProps = {
    projects: []
}


export default Home