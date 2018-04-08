/**
 * Created by usevil on 4/7/18.
 */

import React from 'react';

import classes from './Input.css';

const input = (props) => {
   let inputElement = null;

    switch(props.elementType) {
            case ('input'):                                             //takes and passes all props like type name etc
                inputElement = <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}/>;
                break;
            case('textarea'):
                inputElement = <textarea
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}/>;
                break;
            default:
                inputElement = <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}/>;
    }

    console.log(props);
    return (
        <div className={classes.Input}>
          <label className={classes.label}>{props.label}</label>
          {inputElement}
        </div>

    );

};




export default input;