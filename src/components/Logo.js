import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather';

const Logo = () => {




    return (
        <div className="row">
            <div className="text-left 8-small columns">
                <Link to="/">
                    <img alt="logo" className="logo" src={require("../balance.png")} />
                </Link>
            </div>
            <div className="text-right 4-small logout columns">
                <Icon.LogOut />
            </div>
        </div>

    )
}

export default Logo