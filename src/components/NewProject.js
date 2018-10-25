import React from 'react'



class NewProject extends React.Component {

    state={
        client_id: null,
        description: '',
        completed: false,
        hourly_rate: 0,
        time_spent: 0,
        start_date: 0,
        end_date: 0,
        name: '',
    }

    setInput = () => {
        return this.props.clients.map(client => <option key={client.id} value={client.name}>{client.name}</option>)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    getClientId = (event) => {
        let client = this.props.clients.find(client => client.name === event.target.value)
        this.setState({client_id: client.id})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addNewProject(this.state)
        this.props.toggleForm()
    }

    render(){
        return(
        
            <div>
              <div className="row">
                <div className="small-12 columns">
                        <form>  
                            <label> For client: 
                                <select list="client-list" name="client" onChange={this.getClientId}>
                                
                                    {this.setInput()}
                                </select>
                            </label>
                            <label >Description
                                <textarea name="description" onChange={this.handleChange}>
                                
                                </textarea>
                            </label>
                            <label>Name the project
                                <input type="text" name="name" onChange={this.handleChange}/>
                            </label>
                            <label>Hourly rate
                                <input type="number" name="hourly_rate" onChange={this.handleChange}/>
                            </label>
                            <label>Start date
                                <input type="date" name="start_date" onChange={this.handleChange}/>
                            </label>
                            <label>Due date
                                <input type="date" name="end_date" onChange={this.handleChange}/>
                            </label>
                            <button onClick={(event) => this.handleSubmit(event) } className="button">Add Project</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewProject