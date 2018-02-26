/**
 * Created by usevil on 2/26/18.
 */
import React from 'react';

import classes from './DrawerToggle.css';
const drawerToggle = (props) => (

    <div className={classes.DrawerToggle}onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;