//* action creators
import axios from "../../axios-orders"

import * as actionTypes from"../actions/actionTypes"

export const addIngredient =(name)=>{
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingNAME:name
        
    }
}
export const removeIngredient =(name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingNAME:name
    }
}
//!Server Fetching----------------------------
const setIngredients = (response)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        response
    }

}

const FetchIngredientsError =(error)=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_ERROR,
        error
    }
}

export const getIngredients = ()=>{
    return(dispatch)=>{
        axios.get("/ingredients.json")
        //? to check error use
        //? axios.get("/ingredients") 

        .then(response =>{
            // this.setState({ingredients:response.data})
            // this.props.setIngredients(response.data)
            dispatch(setIngredients(response.data));
            console.log("Dispatched.....")
        })
        .catch(error=>{
            dispatch(FetchIngredientsError(error))
        })
    }

}
//!-----------------------------------------