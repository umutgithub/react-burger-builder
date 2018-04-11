/**
 * Created by usevil on 4/7/18.
 */

import React from 'react';

import classes from './Input.css';

const input = (props) => {
   let inputElement = null;

   const inputClasses = [classes.InputElement];

   if(props.invalid && props.shouldValidate && props.touched) {
       inputClasses.push(classes.Invalid);

   }

    switch(props.elementType) {
            case ('input'):                                             //takes and passes all props like type name etc
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>;
                break;
            case('textarea'):
                inputElement = <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>;
                break;
             case('select'):
                inputElement = (
                    <select
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {
                            props.elementConfig.options.map(option => (
                            <option key={option.value}
                                    value={option.value}>
                                    {option.displayValue}
                            </option>
                            ))
                        }
                    </select>
                );
                break;
            default:
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>;
    }

    //console.log(props);
    //show error msg or not
    let validationError = null;
    if (props.invalid && props.touched) {
         validationError = <p className={classes.ValidationError}>Please enter a valid value</p>;
    }

    return (
        <div className={classes.Input}>
          <label className={classes.label}>{props.label}</label>
          {inputElement}
          {validationError}
        </div>

    );

};




export default input;