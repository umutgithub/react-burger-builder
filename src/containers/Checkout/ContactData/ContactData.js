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
        orderForm: {
            name: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name'
              },
              value: ''
            },
            street: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
              },
              value: ''
            },

            zipCode: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Zip'
              },
              value: ''
            },
            country: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
              },
              value: ''
            },
            email:  {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your email'
              },
              value: ''
            },
             deliveryMethod:  {
              elementType: 'select',
              elementConfig: {
                 options: [
                     {value: 'fastest', displayValue: 'Fastest'},
                     {value: 'cheapest', displayValue: 'Cheapest'}
                 ]
              },
              value: ''
            }
        },
        loading: false
    }

    orderHandler = (e) => {
      e.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
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
                  <Input elementType="..."  elementConfig="..." value="..." />
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