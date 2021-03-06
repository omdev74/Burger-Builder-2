import React from "react"

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

import classes from "./SideDrawer.module.css"
const sideDrawer = (props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close]
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    return(
        <Aux>
        <Backdrop  
        show={props.open}
        clicked={props.closed}/>
        <div className={attachedClasses.join(" ")} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
        <nav>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
        </div>
        </Aux>
        
    );
}
export default sideDrawer;