import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';
import Backdrop from '../UIElements/Backdrop';

//In order to return multiple root level elements 
//I use a wrapper React Fragment to have as many nested elements as you want

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    // If click on the SideDrawer then set it open
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
                (<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                    <nav className="main-navigation__drawer-nav">
                        <NavLinks/>
                    </nav>
                </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler} >
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">EVENTS</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;