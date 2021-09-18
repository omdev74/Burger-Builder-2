import React from "react";
import classes from "./Input.module.css"
const input = (props)=>{
    let inputElement = null;
    
    switch(props.elementType){
        case("input"):
            inputElement=<input 
            className={classes.InputElement} 
            {...props.elementConfig} 
            value ={props.value}/>
            break;
        case("textarea"):
            inputElement=<textarea 
            className={classes.InputElement} 
            value ={props.value}
            {...props.elementConfig} />
            break;
        case("select"):
            inputElement=(
            <select 
                className={classes.InputElement} 
                value ={props.value}>
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value}value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select> )
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