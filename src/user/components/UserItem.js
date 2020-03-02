import React from 'react';

import Button from '../../shared/components/FormElements/Button';

const UserItem = props => {
    return (
        <li>
            <h1 style={{textAlign: 'center', fontSize: '40px', color: 'white'}}> 
                Personal Information 
            </h1>
            <br/>
            <div>
                <p style={{fontSize: '25px', color: 'white'}}> <b> Name: </b>
                    <i style={{color: '#ff0055', fontSize: '25px'}}> <b> {props.name} </b>  </i>
                </p>
                <hr/>
                <p style={{fontSize: '25px', color: 'white'}}> <b> E-mail: </b>
                    <i style={{color: '#ff0055', fontSize: '25px'}}> <b> {props.email} </b>  </i>
                </p>
                <hr/>
                <p style={{fontSize: '25px', color: 'white'}}> <b> Member since: </b>
                    <i style={{color: '#ff0055', fontSize: '25px'}}> <b> {props.createdAt} </b>  </i>
                </p>
            </div>
            <hr/>    
            <br/>
            <br/>
            <div className="center">
                <Button to={`/update/${props.id}`}>
                    Change my password
                </Button>
            </div>
        </li>   
    );
};

export default UserItem;