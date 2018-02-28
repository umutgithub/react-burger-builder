/**
 * Created by usevil on 2/22/18.
 */
import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 2.5,
    bacon: 0.3
};

class BurgerBuilder extends Component {

    state = {
      ingredients: {
          salad:0,
          bacon:0,
          cheese:0,
          meat:0
      },
      totalPrice : 4,
      purchasable: false,
      purchasing: false

    }

    updatePurchaseState (ingredients) {
        //conver obj to array
        const sum = Object.keys(ingredients)
            .map(igKey => {
              return ingredients[igKey]
            })
            .reduce((sum, el) => {
              return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0 })

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition  = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients:updatedIngredients })
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        console.log(this);
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
        ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Umutti',
                address: {
                    zip: '11205',
                    address: 'miami'
                },
             email:'dobps@mmail.com'

            },

            email: 'book@h.com'
        };

        axios.post('/orders.json',order)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }


    render () {
        const disableInfo = {
          ...this.state.ingredients
        };
        //set true if ingredient value is 0
        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
              <Aux>
                 <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                     <OrderSummary
                         price={this.state.totalPrice}
                         ingredients={this.state.ingredients}
                         purchaseCancelled={this.purchaseCancelHandler}
                         purchaseContinue={this.purchaseContinueHandler}
                     />
                 </Modal>
                 <Burger ingredients={this.state.ingredients}/>
                  <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disableInfo}
                  price={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler}

                  />
              </Aux>
        );
    }
}

export default BurgerBuilder;