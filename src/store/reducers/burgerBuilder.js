import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../shared/utility"
const initialState = {
    ingredients:null,
    totalPrice:40,
    error:false,
    building:false
}
const INGREDIENT_PRICES={
    cheese:20,
    meat:40,
    salad:20,
    bacon:15
}

const reducers = (state = initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return updateObject(state,{
                ingredients:{
                    ...state.ingredients,
                    [action.ingNAME]: state.ingredients[action.ingNAME]+1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingNAME],
                building:true
        })
        case actionTypes.REMOVE_INGREDIENTS: 
            return updateObject(state,{
                ingredients:{
                    ...state.ingredients,
                    [action.ingNAME]: state.ingredients[action.ingNAME]-1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingNAME],
                building:true
            })
        case actionTypes.SET_INGREDIENTS:return updateObject(state,{
                totalPrice:40,
                ingredients: {
                    //* minding the order
                    cheese:action.response.cheese,
                    meat:action.response.meat,
                    salad:action.response.salad,
                    bacon:action.response.bacon   
                },
                error:false,
                building:false
        })
        case actionTypes.FETCH_INGREDIENTS_ERROR:return updateObject(state,{error:true})
        default: return state;
    }
}
export default reducers;