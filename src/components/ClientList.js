import React from 'react'
import ClientSummary from './ClientSummary'
import NewClient from './NewClient'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Icon from 'react-feather';


class ClientList extends React.Component {

    state={
        newFormOpen: false
    }

    toggleForm = () => {
        this.setState({ newFormOpen: !this.state.newFormOpen })
    }

    renderClientSummary = () => {      
        return this.props.clients.map(client =>  
             <ClientSummary key={client.id} client={ client } /> 
        )
    }   

    render(){
        return(
            <div>
                <div className="row">
                    <h2 className="small-6 project-section columns">All Clients</h2>
                    <div className="columns" >
                        <div className="text-right"><a onClick={ this.toggleForm } className="button">
                          {!this.state.newFormOpen ?
                            <Icon.FilePlus />
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
                    appear={this.state.newFormOpen}
                >
                    <NewClient addNewClient={this.props.addNewClient} toggleForm={ this.toggleForm } addNewClient={this.props.addNewClient}/>
                </CSSTransition>
                :
                <div></div>}
                {this.props.clients ?
                <TransitionGroup>
                    {this.renderClientSummary()}
                 </TransitionGroup>
                :
                <div className="row">
                    <div className="small-12 text-center columns">
                        <img alt="loading" className="loader"  src={require("../Loading.gif")} />
                    </div>
                </div>
              
                }
            </div>

        )
    }

}

export default ClientList

