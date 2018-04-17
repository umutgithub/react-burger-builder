/**
 * Created by usevil on 4/17/18.
 */
import * as actionTypes from './actions';

const initialState = {
     ingredients:{
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
     },
     totalPrice : 4

};
             // if state is undefined set it to initialState
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,    //copy old state (keep old state incase nonchanged ingredients)
                ingredients: {      // assign new changes
                    ...state..ingredients,   //again copy the old ingreditents
                    // now update what's updated in action. it's passed with action.ingredientName
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
               }
            };

        case actionTypes.REMOVE_INGREDIENT;
            return {
                 ...state,    //copy old state (keep old state incase nonchanged ingredients)
               ingredients: {      // assign new changes
                 ...state..ingredients,   //again copy the old ingreditents
                 // now update what's updated in action. it's passed with action.ingredientName
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
               }
            };
        default:
            return state;
    }


};

export default reducer;