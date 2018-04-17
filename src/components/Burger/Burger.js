/**
 * Created by usevil on 2/22/18.
 */
import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    console.log('props.ingredients====', props.ingredients);
    // Burger itself
    //transform object of ingredients to array.
    //Bind chain
    let transformedIngredients = Object.keys(props.ingredients)
         .map(igKey => {

            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>;
            });
         })
         .reduce((arr, el) => {
            //console.log(arr);
            //console.log(el);
            return arr.concat(el);
        }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredient</p>;
    }
    //console.log('transformedIngredients====',transformedIngredients);
    return (
        <div className={classes.Burger}>
          <BurgerIngredient type="bread-top" />
            {transformedIngredients}
          <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;