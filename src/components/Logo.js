import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather';

const Logo = (props) => {




    return (
        <div className="row">
            <div className="text-left 8-small columns">
                <Link to="/">
                    <img alt="logo" className="logo" src={require("../balance.png")} />
                </Link>
            </div>
            <div className="text-right 4-small logout columns">
                <button onClick={ () => props.logout()}><Icon.LogOut /></button>
            </div>
        </div>

    )
}

export default Logo