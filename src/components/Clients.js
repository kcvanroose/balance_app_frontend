import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ClientList from './ClientList'


const Clients = props => {

        return(
            <div>
                <Switch>
                    <Route exact path="/clients" component={props => <ClientList clients={ props.projects } clients={props.clients}  /> }/>
                    
                </Switch>
            </div>
        )
    

}

export default Clients

//<Route path="/clients/:id" component={props => <ClientView  {...props} projects={ this.props.projects } /> } />
//addNewClient={this.props.addNewClient}