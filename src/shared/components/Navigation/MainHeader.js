import React from 'react';

import './MainHeader.css';
//props.children always refer to the things you pass between your opening
//and closing tags of your component
//props.children is a placeholder for the content you enter 
const MainHeader = props => {
    return (
        <header className="main-header">
            {props.children}
        </header>
    );
};

export default MainHeader;