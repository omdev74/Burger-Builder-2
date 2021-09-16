import React from "react";
import classes from "./Input.module.css"
const input = (props)=>{
    let inputElement = null;
    
    switch(props.inputtype){
        case("input"):
            inputElement=<input className={classes.InputElement} {...props}/>
            break;
        case("textarea"):
            inputElement=<textarea className={classes.InputElement} {...props}/>
            break;
        case("select"):
            inputElement=<select className={classes.InputElement} {...props}>
                                <option value="India">India</option>
                                <option value="Pakistan">Pakistan</option>
                        </select> 
            break;
        case("button"):
            inputElement=<button className={classes.Button}{...props}>{props.children}</button>
            break;
        
        default:
            // inputElement=<input className={classes.InputElement} {...props}/>
            inputElement=<p>Hello</p>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}
export default input