import React,{Component} from "react"
import Order from "./Order/Order"
import "./Orders.css"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"
class Orders extends Component{
    state={
        //TODO: use redux
        orders:[],//!later discussed in handling async code
        loading:true
    }
    componentDidMount(){
        axios.get("/orders.json")
        .then(res=>{
            const fetchedOrders=[]
            console.log(res.data)
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key})

            }
            this.setState({loading:false,orders:fetchedOrders})
            console.log(this.state.orders)
        })
        .catch(err=>{
            this.setState({loading:false})

        })

    }

    render(){
        return(
            <div>
                <div className="Headers"> <h1>ORDERS</h1></div>
                <div className="List">
                    {this.state.orders.map(order=>(
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
export default withErrorHandler(Orders,axios)

