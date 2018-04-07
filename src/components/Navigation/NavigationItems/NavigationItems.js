/**
 * Created by usevil on 2/25/18.
 */

import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">orders</NavigationItem>
        </ul>
    </div>
);

export default navigationItems;