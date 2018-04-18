/**
 * Created by usevil on 3/19/18.
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
                 ingredients={this.props.ings}
                 checkoutCancelled={this.checkoutCancelledHandler}
                 checkoutContinued={this.checkoutContinuedHandler}/>
             <Route
                 path={this.props.match.path + '/contact-data'}
                 //render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.tprice} {...props}/>)} />
                 component={ContactData} />
         </div>
      );
  }
}

const mapStateToProps = state => {
    return {
       ings: state.ingredients
    }
};

 // state is the first argument of connect
export default connect(mapStateToProps)(Checkout);