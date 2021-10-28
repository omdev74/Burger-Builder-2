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


export const purchaseBurger = (orderData)=>{
    return(dipsatch)=>{
        dipsatch(purchaseBurgerStart())
        axios.post("/orders.json",orderData)
        .then(response => {
            dipsatch(purchaseBurgerSuccess(response.data.name,orderData))
            console.log(response.data)
        })
        .catch(error => {
            dipsatch(purchaseBurgerFail(error))
        })
    }
}
