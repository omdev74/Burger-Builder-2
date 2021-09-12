import React from "react"
import Burger from "../../Burger/Burger";
import Button from "../../Ui/Button/Button";

import classes from "./CheckoutSummary.module.css"
const checkoutSummary = (props)=>{
    return(
        <div id="card"style={{textAlign:"center"}}>
            <div className={classes.CheckoutSummary}>
                <h1>Enjoy your meal!!</h1>
                <div style={{width:"100%",margin:"auto"}}>
                <Burger ingredients={props.ingredients} style={{height:"100px"}}/>
                </div>
                <Button 
                btnType="Success"
                clicked={console.log("Success")}>CONTINUE</Button>
                <Button 
                btnType="Danger"
                clicked={console.log("Danger")}>CANCEL</Button>
            </div>

        </div>
        
    );
}
export default checkoutSummary