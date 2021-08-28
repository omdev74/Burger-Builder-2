import React from "react";
import classes from "./MenuToggle.module.css" 
import MenuIcon from "../../assets/images/Menu.jpg"
const menuToggle =(props)=>{
    return(
        <div className={classes.Menu}>
        <a onClick={props.clicked}><img src={MenuIcon} alt="Menu"></img></a>
        </div>
        
    );
}
export default menuToggle;