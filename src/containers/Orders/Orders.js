import React,{Component} from "react"
import Order from "./Order/Order"
import "./Orders.css"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"
import * as actions from "../../store/actions"
import { connect } from "react-redux"
class Orders extends Component{
    state={
        //TODO: use redux
        // orders:[],//!later discussed in handling async code
        // loading:true
    }
    constructor(props){
        super(props);
        this.props.fetchOrders()
    }

    render(){
        return(
            <div>
                <div className="Headers"> <h1>ORDERS</h1></div>
                <div className="List">
                    {console.log(this.props.orders)}
                    {this.props.orders.map(order=>(
                        <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>

                    ))}
                </div>
            </div>
            
            

            
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        orders:state.order.orders,
        // error:state.order.error
    }

}
const mapDispatchToProps = (dispatch)=>{
    return{
        fetchOrders : ()=> dispatch(actions.fetchOrders())
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))

