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

export const purchaseInit = ()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }

}

// const fetchedOrderInit = ()=>{
//     return{
//         type:actionTypes.FETCH_ORDER_INIT
//     }

// }

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
        error
    }
}


//!fetches orders from firebase
export const fetchOrders = ()=>{
    return(dispatch)=>{
        axios.get("/orders.json")
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
            console.log(this.state.orders)
        })
        .catch(err=>{
            fetchOrderFail(err)
            // this.setState({loading:false})

        })


    }
}

