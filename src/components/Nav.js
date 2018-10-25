import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Icon from 'react-feather';


const Nav = () => {
    return (
       
            <div className="row mobile-app-icon-bar">
                    <button className="small-4 columns"><NavLink exact to="/" activeClassName="active" className='link text-center'>
                        <Icon.Home /><br />
                            Home</NavLink>
                        </button>
                    <button className="small-4 columns"><NavLink exact to="/projects" activeClassName="active" className='link text-center'>
                        <Icon.Folder /><br />
                            Projects</NavLink>
                    </button> 
                    <button className="small-4 columns"><NavLink exact to="/clients" activeClassName="active" className='link text-center'>
                        <Icon.Users /><br />
                            Clients</NavLink>
                    </button>
            
            </div>
   
    )   
}

export default Nav 
