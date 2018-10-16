import React from 'react'
import ClientSummary from './ClientSummary'
import NewClient from './NewClient'

class ClientList extends React.Component {

    state={
        newFormOpen: false
    }

    toggleForm = () => {
        this.setState({ newFormOpen: !this.state.newFormOpen })
    }

    renderClientSummary = () => {      
        return this.props.clients.map(client =>   <ClientSummary client={ client } /> )
    }   

    render(){
        return(
            <div>
                <div className="row">
                    <h2 className="small-6 columns">All Clients</h2>
                    <button onClick={ this.toggleForm } className="button small-6 columns">Add new client</button>
                </div>
                {this.state.newFormOpen ?
                    <NewClient toggleForm={ this.toggleForm } addNewClient={this.props.addNewClient}/>
                :
                <div></div>}
                {this.props.clients ?
                 this.renderClientSummary() 
                :
                 <p>loading</p>}
            </div>

        )
    }

}

export default ClientList