import React from 'react'

class NewTask extends React.Component {

    state= {
        project_id: this.props.projectId,
        completed: false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addNewTask(this.state)
        this.props.closeForm()
    }

    render() {
        return (
            <div>
                <button onClick={this.props.closeForm} className="button">Close</button>
                <form>  
                    <label>Task description
                        <input type="text" placeholder="Todo..." name="description" onChange={this.handleChange}/>
                    </label>
                    <label>Due_date
                        <input type="date" name="due_date" onChange={this.handleChange}/>
                    </label>
                    <button onClick={(event) => this.handleSubmit(event) } className="button">Add</button>
                </form>
            </div>
        )
        }
}

export default NewTask