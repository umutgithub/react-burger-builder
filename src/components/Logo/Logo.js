/**
 * Created by usevil on 2/25/18.
 */
import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
         <img scr={burgerLogo} alt="MyBurger" />
    </div>

);

export default logo;