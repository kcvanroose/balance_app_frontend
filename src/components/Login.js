import React from 'react'

class Login extends React.Component {

    state = {
        username: '',
        password: ''
      }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.fetch(this.state.username, this.state.password)
    }
    
    render() {
        return (
            <div className="row login">
                <div className="small-12 columns">
                    <form> 
                        <label>Username
                            <input type="text" name="username" onChange={this.handleChange}/>
                        </label>
                        <label>Password
                            <input type="password" name="password" onChange={this.handleChange}/>
                        </label>
                        <button onClick={(event) => this.handleSubmit(event) } className="button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default Login