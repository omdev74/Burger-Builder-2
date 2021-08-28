import React from "react"
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger =(props)=>{
    //Conversion logic-------------------------------------
    //igkey(name of ingredient)
    let transfromedIngredients=Object.keys(props.ingredients).map(igkey=>{
        // console.log(props.ingredients);
        // console.log(props.ingredients[igkey]);
        return [...Array(props.ingredients[igkey])]//[,]
        .map((_,i)=>{
            // console.log(i);
            return <BurgerIngredient key={igkey + i} type={igkey}/>
        });
    })
    // console.log(transfromedIngredients)
    // (4) [Array(2), Array(2), Array(1), Array(1)]
    // 0: (2) [{component}, {component}]
    // 1: (2) [{…}, {…}]
    // 2: [{…}]
    // 3: [{…}]
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    console.log(transfromedIngredients);

    if(transfromedIngredients.length === 0){
        transfromedIngredients= <p>Please start adding ingredients.....</p>
    }

    

    //-------------------------------------------------------
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="salad" />
            <BurgerIngredient type="bacon" /> */}
            {transfromedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );

};
export default burger;
