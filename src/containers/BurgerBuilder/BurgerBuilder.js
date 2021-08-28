import React,{Component} from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";


const INGREDIENT_PRICES={
            cheese:20,
            meat:40,
            salad:20,
            bacon:15
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            cheese:0,
            meat:0,
            salad:0,
            bacon:0
        },
        totalPrice:40,
        purchasable:false,
        purchasing:false
    }
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0)
        this.setState({purchasable:sum>0})
        
    }
    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);

    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        // alert("You coninue!!!")
       //Dummy Data
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,//always recalculate it on server
            customer:{
                name:"Om dev",
                address:{
                    street:"gali no 11",
                    zipCode:"110045",
                    country:"India"
                },
                email:"test@test.com"
            },
            deliveryMethod:"Fastest"
        }

        axios.post("/orders.json",order)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
    render(){
        const disabledinfo={
            ...this.state.ingredients
        }
        for (let key in disabledinfo) {
            disabledinfo[key]=disabledinfo[key]<=0
        }
        //{salad:true,meat:false,,}
        return(
        <Aux>
            <Modal 
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
                <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledinfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            />
        </Aux>);
    }
}
export default BurgerBuilder;