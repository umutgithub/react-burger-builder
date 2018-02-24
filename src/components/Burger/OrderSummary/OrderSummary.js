/**
 * Created by usevil on 2/23/18.
 */
import React from 'react';

import Aux from '../../../hoc/Aux.js'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
           return (
                 <li key={igKey}>
                     <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {props.ingredients[igKey]}
                 </li> );

        });
    //console.log(ingredientSummary);
    return (
       <Aux>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingderients:</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p>Continue to checkout</p>
       </Aux>
   )
};


export default orderSummary;