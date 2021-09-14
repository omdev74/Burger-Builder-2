import React,{Component} from "react"
import Order from "./Order/Order"
import "./Orders.css"
class Orders extends Component{

    render(){
        return(
            <div>
                <div className="Headers"> <h1>ORDERS</h1></div>
                <div className="List">
                    <Order />
                    <Order />
                    <Order />
                </div>
            </div>
            
            

            
        )
    }
}
export default Orders

