import React from "react"
import "./Order.css"
const order = (props)=>{
    const ingredients = [];
    for( let ingredientName in props.ingredients){
        ingredients.push(
            {
                name:ingredientName,
                amount:props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map(ig=>{
        return <span class="Span"key ={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return(
        <div className="Order">
            <p>Ingredients:{ingredientOutput}</p>
            <p>Price: <strong>Rs {props.price}</strong></p>
            <hr></hr>
        </div>
    )
}
export default order