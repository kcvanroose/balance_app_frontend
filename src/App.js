import React, { Component } from 'react';
import Home from "./components/Home"
import Projects from "./components/Projects"
import Nav from "./components/Nav"
import Clients from "./components/Clients"
import { Route, withRouter} from 'react-router-dom'
import Logo from './components/Logo'
import Login from './components/Login'




class App extends Component {
  state = {
    currentUser: undefined,
    data: {}
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      this.validate(token)
      } else {
      this.props.history.push('/login')
      }
  }
  

  login = (username, password) => {
    return fetch('https://secret-garden-71234.herokuapp.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    }).then(resp => resp.json())
    .then(data => {
      if (data.error) {
        console.log(data)
      } else {
        localStorage.setItem('token', data.token)
      }
    }).then(this.props.history.push('/'))
    .then(this.fetchData())
  }

  validate = (token) => {
    return fetch('https://secret-garden-71234.herokuapp.com/validate', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(this.fetchData())
    .then(this.props.history.push('/'))
    
  }


  fetchData = () => {
    const token = localStorage.getItem('token')
    return fetch('https://secret-garden-71234.herokuapp.com/users/1.json', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
        .then(response => response.json())
        .then(json => 
          this.setState({data: json, clients: json.clients, projects: json.clients.map(client => client.projects).reduce((array, projects) => {projects.forEach(p => array.push(p)); return array}, []),
          currentUser: { business_name: json.business_name, id: json.id, name: json.name, username: json.username } }))
  }

  toggleProjectState = (UpdatedProject) => {
    const projects = JSON.parse(JSON.stringify(this.state.projects))
    const project = projects.find(project => {
      return project.id === UpdatedProject.id
    })
    project.completed = !project.completed
    this.updateProject(project)
    this.setState({
      projects: projects
    })
  }

  updateTime = (UpdatedProject, time) => {
    const projects = JSON.parse(JSON.stringify(this.state.projects))
    const project = projects.find(project => {
      return project.id === UpdatedProject.id
    })
    project.time_spent = time
    project.fee = this.getFee(project)
    this.updateProject(project)
    this.setState({
      projects: projects
    })
  }

  getFee = (project) => { 
    return Math.round((project.time_spent / 60 / 60 * project.hourly_rate) * 100 / 100)
  }

  updateProject = (projectData) => {
    return fetch( `http://localhost:3000/projects/${projectData.id}`, {
      method: 'PATCH',
      headers: {
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
        fee: projectData.fee
      })
    })
    
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

  deleteClient = clientId => {
    return fetch(`http://localhost:3000/projects/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resp => resp.json())
    .then(this.handleNoClient(clientId))
  }
  
  handleNoClient = clientId => {
    const clients = JSON.parse(JSON.stringify(this.state.clients))
    const client = clients.find(client => {
      return client.id === clientId
    })
    const index = clients.indexOf(client)
    if (index > -1) {
      clients.splice(index, 1)
    }
    this.setState({
      clients: clients
    })
   
    this.props.history.push('/clients')
  }

  deleteProject = (projectId) => {
    return fetch(`http://localhost:3000/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resp => resp.json())
    .then(this.handleDelete(projectId))
  }

  handleDelete = (projectId) => {
    const projects = JSON.parse(JSON.stringify(this.state.projects))
    const project = projects.find(project => {
      return project.id === projectId
    })
    const index = projects.indexOf(project)
    if (index > -1) {
      projects.splice(index, 1)
    }
    this.setState({
      projects: projects
    })
   
    this.props.history.push('/projects')

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
  
  addNewClient = (clientData) => {
   
    return fetch(`http://localhost:3000/clients`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: clientData.name,
        phone_number: clientData.phone_number,
        email_address: clientData.email_address,
        contact: clientData.contact,
        user_id: this.state.currentUser.id
      })
    })
      .then(res => res.json())
      .then(newClient => 
           newClient.id ?
            this.setState({clients: [...this.state.clients, newClient]})
             :
             this.state.clients
            
          )
      
  }

  logout = () => {
    this.setState({ 
      currentUser: undefined,
      data: undefined,
      clients: undefined,
      projects: undefined             
    })
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        <Logo logout={this.logout}/>
     
          <Route exact path="/" component={ () => <Home data={this.state} /> }/>
          
          <Route path='/login' component={ () => <Login fetch={this.login} />} />
        
       
        
        <Route path="/projects" component={ () => 
          <Projects addNewTask={this.addNewTask}
          toggleTaskState={ this.toggleTaskState } 
          projects={this.state.projects} 
          clients={this.state.clients} 
          addNewProject={this.addNewProject} 
          toggleProjectState={this.toggleProjectState}
          updateTime={this.updateTime} 
          deleteProject={this.deleteProject}/> } />
        <Route path="/clients" component={ () => <Clients clients={this.state.clients} 
                                                          projects={this.state.projects} 
                                                          addNewClient={this.addNewClient} 
                                                          deleteClient={this.deleteClient}/> } />
        <Nav />
      </div>
    );
  }
}

export default withRouter(App);
