/**
 * Created by usevil on 2/25/18.
 */

import React from 'react';

import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {


    return (
        <div className={classes.SideDrawer}>
          <div>
              <Logo />
          </div>
          <nav>
              <NavigationItems />
          </nav>
        </div>
    );

};

export default sideDrawer;