import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather';

class Client extends React.Component {

    renderProjects = () => {
       return this.props.client.projects.map(project => <ProjectSummary project={ project } />)
    }
    



    render() {
        return (
            <div>   
                    <div className="row">
                        <div className="columns">
                        <Link to={`/clients/`} >
                           
                                <Icon.ArrowLeft/>
                            
                        </Link>
                        </div>
                    </div>
                    <div className="project row">     
                        <h2 className="small-8 card-top columns"><strong>{this.props.client.name}</strong></h2>
                        <div className="text-right card-top-2 columns"><button onClick={ () => this.props.deleteClient(this.props.client.id) } className="delete-top"><Icon.Trash2 color="white"/></button></div>
                        <p className="small-12 columns"><strong>Main contact: </strong>{this.props.client.contact}</p>
                        <p className="small-12 columns"><strong>Address: </strong>{this.props.client.address}</p>
                        <div className="small-12 client columns">
                            <div className="icon">
                                <Icon.Phone />
                            </div>
                            <div className="phone">
                                <a href= {`tel:${this.props.client.phone_number}`}>{this.props.client.phone_number}</a>
                            </div>
                        </div>
                        <div className="small-12 client columns">
                            <div className="icon">
                                <Icon.Mail />
                            </div>
                            <div className="phone">
                                <a href= {`mailto:${this.props.client.email_address}`}>{this.props.client.email_address}</a>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.client.projects.length > 0 ?
                        <div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <h3 className="project-section">Projects</h3>
                                </div>
                            </div>
                            {this.renderProjects()}
                        </div>
                        :
                        <div className="row">
                            <div className="small-12 columns">
                                <p>No projects for this client</p>
                            </div>
                        </div>
                    }
            </div>
        )
    }
}

export default Client