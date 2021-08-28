import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Logo.module.css"

import burgerLogo from "../../assets/images/logo.png";
const logo =(props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="My Borger"></img>
    </div>
   
);
export default logo;
    