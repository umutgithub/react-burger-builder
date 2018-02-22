/**
 * Created by usevil on 2/22/18.
 */
import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from '../BurgerIngredients/BurgerIngredients';

const burger = (props) => {
console.log(classes);
    return (
        <div className={classes.Burger}>
          <BurgerIngredient type="bread-top" />
          <BurgerIngredient type="cheese" />
          <BurgerIngredient type="meat" />
          <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;