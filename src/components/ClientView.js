import React from 'react'
import Client from './Client'

class ClientView extends React.Component {
    

    getClient = () => {
           let client = this.props.clients.find(client => client.id === parseInt(this.props.match.params.id))
               return <Client client={client} deleteClient={this.props.deleteClient} /> 
    }

    render() {
        return(
            <div>
            {!this.props.clients ?
                <div className="row">
                    <p>no clients found</p>
                </div> 
            :
            this.getClient()}
            </div>
        )
    }
}

export default ClientView