import React,{Component} from "react"
import Order from "./Order/Order"
import "./Orders.css"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"
import * as actions from "../../store/actions"
import { connect } from "react-redux"
import Spinner from "../../components/Ui/Spinner/Spinner"
class Orders extends Component{
    state={
        
    }
    constructor(props){
        super(props);
        this.props.fetchOrders()
    }

    render(){
        let orders = <Spinner></Spinner>
        if(!this.props.loading){
            orders = this.props.orders.map(order=>(
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>

            ))
        }
        return(
            <div>
                <div className="Headers"> <h1>ORDERS</h1></div>
                <div className="List">
                    {console.log(this.props.orders)}
                    {orders}
                </div>
            </div>
            
            

            
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading
    }

}
const mapDispatchToProps = (dispatch)=>{
    return{
        fetchOrders : ()=> dispatch(actions.fetchOrders())
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))

