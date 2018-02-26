/**
 * Created by usevil on 2/23/18.
 */
import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
    //This can be functional components.In burgerBuilder.js. Modal wraps OrderSummary
    //Since we took care of shouldUpdate in Modal.js. Order Summary doesnt update (render)
    //everytime more or less buttons clicked
    componentWillUpdate() {
        console.log('[OrderSummary] will update');
    }

    //console.log(ingredientSummary);
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {this.props.ingredients[igKey]}
                    </li> );

            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingderients:</p>
                <ul>
              {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }

}


export default OrderSummary;