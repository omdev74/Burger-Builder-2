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

const reducers = (state = initialState,action)=>{
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS: 
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.data]: state.ingredients[action.data]+1
                    
            }
        }
        case actionTypes.REMOVE_INGREDIENTS: 
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.data]: state.ingredients[action.data]-1
                    
            }
        }
        case actionTypes.SET_UPDATED_INGREDIENTS: 
            return{
                ...state,
                ingredients:action.data
            }
        case actionTypes.SET_NEWPRICE: 
            return{
                ...state,
                totalPrice:action.data
            }
    
        default: return state;
    }
}
export default reducers;