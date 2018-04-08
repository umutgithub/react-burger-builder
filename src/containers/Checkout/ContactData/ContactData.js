/**
 * Created by usevil on 4/5/18.
 */
import React, {Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
      e.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        .then(response => {
            this.setState({ loading: false });
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({ loading: false });
        });

    }

    render() {
        let form = (
             <form>
                  <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                  <Input inputtype="input" type="email" name="email" placeholder="Your Email"/>
                  <Input inputtype="input" type="text" name="street" placeholder="Street Address"/>
                  <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
                  <Button btnType="Success" clicked={this.orderHandler}>ORDER!</Button>
               </form>

        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
               <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;