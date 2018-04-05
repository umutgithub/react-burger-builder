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
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/wihtErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 2.5,
    bacon: 0.3
};

class BurgerBuilder extends Component {

    state = {
      ingredients:null,
      totalPrice : 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false

    }

    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-burger-builder-bc.firebaseio.com/ingredients.json')
        .then(res => {
                console.log(res);
            this.setState({ingredients: res.data});
        })
        .catch(err => {
            this.setState({error: true});
        });
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
        //this.setState({loading: true});
        //
        //const order = {
        //    ingredients: this.state.ingredients,
        //    price: this.state.totalPrice,
        //    customer: {
        //        name: 'Umutti',
        //        address: {
        //            zip: '11205',
        //            address: 'miami'
        //        },
        //     email:'dobps@mmail.com'
        //
        //    },
        //
        //    email: 'book@h.com'
        //};
        //
        //axios.post('/orders.json',order)
        //.then(response => {
        //    this.setState({loading: false, purchasing: false });
        //})
        //.catch(err => {
        //    this.setState({loading: false, purchasing: false });
        //});
        //this.props.history.push('/checkout');
        // pass ingredient to continue checkout with URI param
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
    }


    render () {
        const disableInfo = {
          ...this.state.ingredients
        };
        //set true if ingredient value is 0
        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        // Component Variables declared
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredient can't be loaded</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
              <Aux>
                 <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                 </Modal>
                 {burger}
              </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);