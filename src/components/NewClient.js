import React from 'react'


class NewClient extends React.Component {

    state={
        user_id: null,
        name: '',
        contact: false,
        phone_number: 0,
        email_address: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    getUserId = (event) => {
        let client = this.props.clients.find(client => client.name === event.target.value)
        this.setState({client_id: client.id})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addNewClient(this.state)
        this.props.toggleForm()
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="small-12 columns">
                        <form> 
                            <label>Name
                                <input type="text" name="name" onChange={this.handleChange}/>
                            </label>
                            <label>Main contact
                                <input type="text" name="contact" onChange={this.handleChange}/>
                            </label>
                            <label>Phone number
                                <input type="tel" name="phone_number" placeholder="07456-789044" onChange={this.handleChange} />
                            </label>
                            <label>e-mail address
                                <input type="text" name="email_address" onChange={this.handleChange}/>
                            </label>
                            <button onClick={(event) => this.handleSubmit(event) } className="button">Add Client</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewClient