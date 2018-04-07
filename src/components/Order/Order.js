/**
 * Created by usevil on 3/19/18.
 */
import React from 'react';
import classes from './Order.css';

const order = (props) => {

    //convert ingredients obj coming from Orders.js to array
    //different way also done in Burger.js file transformedIngredients variable
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    //map converted ingredients array to JSX
    const ingredientOutput = ingredients.map(ig => {
      return <span
          style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px'
          }}

          key={ig.name}> {ig.name} ({ig.amount}) </span>

    });

    console.log(ingredients);
    return (
        <div className={classes.Order}>
            <p>Ingrediens: {ingredientOutput}</p>
            <p>Price:
                <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );

};

export default order;