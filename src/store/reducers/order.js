import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../shared/utility"

const initialState ={
    orders:[],
    loading:false,
    purchased:false
    

}
const reducers = (state = initialState,action)=>{
switch(action.type){
    case actionTypes.PURCHASE_INIT: return updateObject(state,{purchased:false})
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state,{loading:true})
    case actionTypes.PURCHASE_BURGER_FAIL:return updateObject(state,{loading:false})
    case actionTypes.PURCHASE_BURGER_SUCCESS:
        const TransFormedOrder = {
            ...action.orderData,
            id:action.orderId
        }
        return updateObject(state,{loading:false,purchased:true,orders:state.orders.concat(TransFormedOrder)})

    case actionTypes.FETCH_ORDER_SUCCESS:return updateObject(state,{orders:action.orders,loading:false})
    case actionTypes.FETCH_ORDER_START:return updateObject(state,{loading:true})
    case actionTypes.FETCH_ORDER_FAIL: return updateObject(state,{loading:false,error:action.error}) 
    default : return state
        
    }

}


export default reducers
