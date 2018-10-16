import React, { Component } from 'react';
import Home from "./components/Home"
import Projects from "./components/Projects"
import Nav from "./components/Nav"
import Clients from "./components/Clients"
import { Route} from 'react-router-dom'



class App extends Component {
  state = {
    data: {}
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/users/1.json')
        .then(response => response.json())
        .then(json => this.setState({data: json, clients: json.clients, projects: json.clients.map(client => client.projects)[0].map(project =>  project) }))
  }

  completeTask = (project_id, task_id) => {
    let project = this.state.projects.find(project => project.id === project_id)
    project.tasks.find(task => task.id === task_id)
  
  }

  addNewTask = (taskData) => {
    return fetch(`http://localhost:3000/tasks`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: taskData.completed,
        description: taskData.description,
        due_date: taskData.due_date,
        project_id: taskData.project_id
      })
    })
      .then(res => res.json())
      .then(task => {
        this.setState(
          {
            projects: this.state.projects.map(project => {
              if (project.id !== taskData.project_id) return project
              project.tasks = [...project.tasks, task]
              return project
            })
          }
        )
      })
  }

  updateTask = task => {
   return fetch( `http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        completed: task.completed,
        description: task.description,
        due_date: task.due_date,
        id: task.id
      })
    })
  }

  toggleTaskState = taskId => {
    const projects = JSON.parse(JSON.stringify(this.state.projects))
    const project = projects.find(project => {
      return project.tasks.map(t => t.id).includes(taskId)
    })
    const task = project.tasks.find(t => t.id === taskId)
    task.completed = !task.completed
    this.updateTask(task)
    this.setState({
      projects: projects
    })
   
  }

  addNewProject = (projectData) => {
   
    return fetch(`http://localhost:3000/projects`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: projectData.completed,
        description: projectData.description,
        end_date: projectData.end_date,
        start_date: projectData.start_date,
        client_id: projectData.client_id,
        hourly_rate: projectData.hourly_rate,
        name: projectData.name,
        time_spent: projectData.time_spent,
        fee: 0
      })
    })
      .then(res => res.json())
      .then(newProject => 
           newProject.id ?
            this.setState({projects: [...this.state.projects, newProject]})
             :
             this.state.projects
            
          )
      
  }
  


  render() {
    return (
      <div className="App">
        <Nav />
        <Route exact path="/" component={ () => <Home data={this.state} /> }/>
        <Route path="/projects" component={ () => 
          <Projects addNewTask={this.addNewTask}
          toggleTaskState={ this.toggleTaskState } 
          projects={this.state.projects} 
          clients={this.state.clients} 
          addNewProject={this.addNewProject} /> } />
        <Route path="/clients" component={ () => <Clients clients={this.state.clients} projects={this.state.projects} /> } />
          
      </div>
    );
  }
}

export default App;
