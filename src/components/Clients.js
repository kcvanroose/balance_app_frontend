import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ClientList from './ClientList'
import ClientView from './ClientView'


class Clients extends React.Component {
        
    render() {
            return(
                <div>
                    <Switch>
                        <Route exact path="/clients" component={props => <ClientList addNewClient={this.props.addNewClient} clients={this.props.clients}  /> }/>
                        <Route path="/clients/:id" component={props => <ClientView  clients={this.props.clients} {...props} deleteClient={this.props.deleteClient} /> } />
                    </Switch>
                </div>
            )
        }

}

export default Clients

