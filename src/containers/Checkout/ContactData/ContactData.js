/**
 * Created by usevil on 4/5/18.
 */
import React, {Component } from 'react';
import { connect } from 'react-redux';

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
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            },
            street: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            },

            zipCode: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Zip'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5

              },
              valid: false,
              touched: false
            },
            country: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            },
            email:  {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your email'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            },
             deliveryMethod:  {
               elementType: 'select',
               elementConfig: {
                  options: [
                     {value: 'fastest', displayValue: 'Fastest'},
                     {value: 'cheapest', displayValue: 'Cheapest'}
                  ]
              },
              value: 'fastest',
              validation: {},
              valid: true

            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
      e.preventDefault();

        this.setState({loading: true});
          //prepare data to send just name and value
        const formData = {};
        for (let key in this.state.orderForm){
            console.log(key);
            //formData.push({key: this.state.orderForm[key].value})
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.tprice,
            orderData : formData
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

    checkValidity(value, rules) {
           let isValid = true;
            if (!rules) {
             return true;
           }
           //check trimmed valus is not empty
           if(rules.required) {
               isValid = value.trim() !== '' && isValid;
           }

           if(rules.minLength) {
               isValid = value.length >= rules.minLength && isValid
           }
           if(rules.maxLength) {
               isValid = value.length <= rules.maxLength && isValid
           }
           return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) => {
            // clone the update form first
            const updatedOrderForm = {
                ...this.state.orderForm
            };
            // now clone what is nested inside of above
            const updatedFormElement = {
                ...updatedOrderForm[inputIdentifier]
            };

            //pass value
            updatedFormElement.value = e.target.value;
            //pass validty
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            //set touched true onChange event meaning if value changed of input box
            updatedFormElement.touched = true;
            // changed the value in deep now moving up
            updatedOrderForm[inputIdentifier] = updatedFormElement;


            //form validity
            //we set formIsValid initially true. it's a technique to make sure all form values are true
            let formIsValid = true;
            for (let inputIdentifier in updatedOrderForm) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }

            this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid});
        };

    render() {
        // conver state object to array to loop through
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        //form elements generated in from formElementArray which was set in state json orderForm
        let form = (
             <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                 //<Input inputype="input" type="text" name="name" placeholder="name"/>
                  <Input
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      invalid={!formElement.config.valid}
                      touched={formElement.config.touched}
                      shouldValidate={formElement.config.validation}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  />
                 ))}
                  <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER!</Button>
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

const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        tprice: state.totalPrice
    }

};

export default connect(mapStateToProps)(ContactData);