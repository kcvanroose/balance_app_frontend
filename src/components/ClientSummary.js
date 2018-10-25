import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather';

const ClientSummary = (props) => {


    return (
                <div className="small-cards row">
                    <div className="small-12 columns">
                        <Link to={`/clients/${props.client.id}`} >
                            <h3 ><strong>{props.client.name}</strong></h3>
                        </Link>
                    </div>
                    <div className="small-12 contact-middle columns"><strong>Contact: </strong>{props.client.contact}</div>
                    <div className="small-5 contact-details columns">
                        <div className="icon">
                            <Icon.Phone width='20px'/>
                        </div>
                        <div className="phone">
                            <a href={`tel:${props.client.phone_number}`}>{props.client.phone_number}</a>
                        </div>
                    </div>
                    <div className="small-7 contact-details columns">
                        <div className="icon">
                            <Icon.Mail width='20px'/>
                        </div>
                        <div className="phone">
                            <a href={`mailto:${props.client.email_address}`}>{props.client.email_address}</a>
                        </div>
                    </div>
                </div> 
 
    )


}

export default ClientSummary