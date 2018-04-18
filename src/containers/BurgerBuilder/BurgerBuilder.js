/**
 * Created by usevil on 2/22/18.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/wihtErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }
    //get default ingredients
    componentDidMount () {
        //commented. moved ingredients to reducer state for now.
        //console.log(this.props);
        //axios.get('https://react-burger-builder-bc.firebaseio.com/ingredients.json')
        //.then(res => {
        //        console.log('default ingredients ==>', res);
        //    this.setState({ingredients: res.data});
        //})
        //.catch(err => {
        //    this.setState({error: true});
        //});
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //this.props.history.push('/checkout');

        // pass ingredient to continue checkout with URI param
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
    }


    render () {
        const disableInfo = {
          //...this.state.ingredients
            ...this.props.ings
        };
        //set true if ingredient value is 0
        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
 console.log(disableInfo)
        // Component Variables declared
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredient can't be loaded</p> : <Spinner />;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.tprice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                    price={this.props.tprice}
                    ingredients={this.props.ings}
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

//connect variables
//mapDispatchToProps is a function receives state automaticly and return a function

const mapStateToProps = state => {
    return {
         ings: state.ingredients,
         tprice: state.totalPrice
    };

}
//mapDispatchToProps a function receives dispatch as an argument
const mapDispatchToProps = dispatch => {
    return {
         //onIngredientAdded is anonomus function which executes dispath function passing an obj as arguments
         onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}), //onIngredientAdded function grabs ingName and pass with ingredientName to redcuer
         onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };

}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));