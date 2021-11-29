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
        this.props.fetchOrders(this.props.token,this.props.userId)
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
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }

}
const mapDispatchToProps = (dispatch)=>{
    return{
        fetchOrders : (token,userId)=> dispatch(actions.fetchOrders(token,userId))
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))

