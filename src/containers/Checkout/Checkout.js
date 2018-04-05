/**
 * Created by usevil on 3/19/18.
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        //this.props.location.search = 'bacon=0&cheese=0&meat=1&salad=1';
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        //same for (let param of query)
        for (let param of query.entries()) {
            //['salad', '1']
            if (param[0] === 'price') {
               price = param[1];
            }
            else {
               ingredients[param[0]] = +param[1]
            }

        }
        this.setState({ingredients:ingredients ,totalPrice: price})

    }

    checkoutCancelledHandler = () => {
      this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
    }

  render() {
      return (
         <div>
             <CheckoutSummary
                 ingredients={this.state.ingredients}
                 checkoutCancelled={this.checkoutCancelledHandler}
                 checkoutContinued={this.checkoutContinuedHandler}/>
             <Route
                 path={this.props.match.path + '/contact-data'}
                 render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
         </div>
      );
  }
}

export default Checkout;