import * as actionTypes from "../actions/actionTypes"

const initialState ={
    orders:[],
    loading:false

}
const reducers = (state = initialState,action)=>{
switch(action.type){
    case actionTypes.PURCHASE_BURGER_START:
        return{
            ...state,
            loading:true 
        }
    case actionTypes.PURCHASE_BURGER_FAIL:{
        console.log(action.error)
        return{
            ...state,
            loading:false
        }}
    case actionTypes.PURCHASE_BURGER_SUCCESS:
        const TransFormedOrder = {
            ...action.orderData,
            id:action.orderId
        }
        return{
            ...state,
            loading:false,
            orders:state.orders.concat(TransFormedOrder)
        }
    
        
    default : return state
    
}
}

export default reducers
