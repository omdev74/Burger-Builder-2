import React from "react";
import classes from "./MenuToggle.module.css" 
import MenuIcon from "../../assets/images/Menu.jpg"
const menuToggle =(props)=>{
    return(
        <div className={classes.Menu}>
        <div className={classes.MenuBtn}onClick={props.clicked}><img src={MenuIcon} alt="Menu" ></img></div>
        </div>
        
    );
}
export default menuToggle;