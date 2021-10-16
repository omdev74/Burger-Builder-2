import * as actionTypes from "../actions"
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
        case actionTypes.SET_INGREDIENTS: 
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
        case actionTypes.SET_UPDATED_INGREDIENTS: 
            return{
                ...state,
                ingredients:action.ingNAME
            }
        case actionTypes.SET_NEWPRICE: 
            return{
                ...state,
                totalPrice:action.nPrice
            }
    
        default: return state;
    }
}
export default reducers;