import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

const purchaseBurgerSuccess = (orderId,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData

    }
    
}
const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START,
        loading:true
    }
}

const purchaseBurgerfail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}
export const purchaseBurger = (orderData)=>{
    return(dipsatch)=>{
        dipsatch(purchaseBurgerStart())
        axios.post("/orders.json",orderData)
        .then(response => {
            dipsatch(purchaseBurgerSuccess(response.data,orderData))
        })
        .catch(error => {
            dipsatch(purchaseBurgerfail(error))
        })
    }
}
