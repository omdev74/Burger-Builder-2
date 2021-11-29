import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

const purchaseBurgerSuccess = (orderId,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
    
}
const purchaseBurgerFail = (error)=>{
    console.log("[purchaseBurgerFail]",error)
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}
const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START,
        loading:true
    }
}

//!posts Response(orderData) to the firebase
export const purchaseBurger = (orderData,token)=>{
    return(dipsatch)=>{
        dipsatch(purchaseBurgerStart())
        axios.post("/orders.json?auth="+ token,orderData)
        .then(response => {
            dipsatch(purchaseBurgerSuccess(response.data.name,orderData))
            console.log(response.data)
        })
        .catch(error => {
            dipsatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = ()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }

}


const fetchOrderSuccess = (orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders
    }
}
const fetchOrderFail = (error)=>{
    console.log("[fetchOrderFail]",error)
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
const fetchedOrderStart =()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}


//!fetches orders from firebase
export const fetchOrders = (token,userId)=>{
    return(dispatch)=>{
        dispatch(fetchedOrderStart())
        const queryParams = "?auth="+token+'&orderBy="userId"&equalTo="' + userId+'"';
        axios.get("/orders.json"+queryParams)
        .then(res=>{
            const fetchedOrders=[]
            console.log(res.data)
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key})
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
            // this.setState({loading:false,orders:fetchedOrders})
           
        })
        .catch(error=>{
            dispatch(fetchOrderFail(error))
            // this.setState({loading:false})

        })


    }
}

