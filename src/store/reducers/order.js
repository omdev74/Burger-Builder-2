import * as actionTypes from "../actions/actionTypes"

const initialState ={
    orders:[],
    loading:false,
    purchased:false,
    error:null
    

}
const reducers = (state = initialState,action)=>{
switch(action.type){
    case actionTypes.PURCHASE_INIT:
        return{
            ...state,
            purchased:false
        }
    case actionTypes.PURCHASE_BURGER_START:
        return{
            ...state,
            loading:true 
        }
    case actionTypes.PURCHASE_BURGER_FAIL:{
        console.log(action.error)
        return{
            ...state,
            loading:false,
            error:action.error
        }}
    case actionTypes.PURCHASE_BURGER_SUCCESS:
        const TransFormedOrder = {
            ...action.orderData,
            id:action.orderId
        }
        return{
            ...state,
            loading:false,
            purchased:true,
            orders:state.orders.concat(TransFormedOrder)
            

        }
    // case actionTypes.FETCH_ORDER_INIT:
    //     return{
    //         ...state,

    //     }
    case actionTypes.FETCH_ORDER_SUCCESS:
        return{
            ...state,
            orders:action.orders,
            loading:false
        }

    case actionTypes.FETCH_ORDER_START:
        return{
            ...state,
            loading:true
        }
    case actionTypes.FETCH_ORDER_FAIL:
        return{
            ...state,
            loading:false,
            error:action.error
        }
    
    
        
    default : return state
    
}
}

export default reducers
