import * as actionTypes from "../actions/actionTypes"
const initialState = {
    ingredients:{
            cheese:0,
            meat:0,
            salad:0,
            bacon:0
    },
    totalPrice:40
}
const INGREDIENT_PRICES={
    cheese:20,
    meat:40,
    salad:20,
    bacon:15
}

const reducers = (state = initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: 
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,

                    [action.ingNAME]: state.ingredients[action.ingNAME]+1
                    
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingNAME]
        }
        case actionTypes.REMOVE_INGREDIENTS: 
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingNAME]: state.ingredients[action.ingNAME]-1
                    
            }
        }
        
    
        default: return state;
    }
}
export default reducers;