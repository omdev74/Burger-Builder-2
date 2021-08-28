import React,{ Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../Ui/Button/Button";
class OrderSummary extends Component{
    componentDidUpdate(){
        console.log("[OrderSummary] DidUpdate")
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igkey=>{
                return(
                    <li key={igkey}>
                        <span style={{textTransform :"capitalize" }}>{igkey}</span>
                         : {this.props.ingredients[igkey]}
                    </li>);
            }
        )
        
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A Delecious Borger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
            btnType="Success"
            clicked={this.props.purchaseContinued}>CONTINUE</Button>
            <Button 
            btnType="Danger"
            clicked={this.props.purchaseCancelled}>CANCEL</Button>
            </Aux>
        )
    }

}
export default OrderSummary;