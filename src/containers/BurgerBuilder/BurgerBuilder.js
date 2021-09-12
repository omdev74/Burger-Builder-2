import React,{Component} from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES={
            cheese:20,
            meat:40,
            salad:20,
            bacon:15
}

class BurgerBuilder extends Component{
    state={
        ingredients:
        // {
        //     cheese:0,
        //     meat:0,
        //     salad:0,
        //     bacon:0
        // },
        null,
        totalPrice:40,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get("/ingredients.json")
        .then(response =>{
            this.setState({ingredients:response.data})
        })
        .catch(error=>{
            this.setState({error:true})
        })
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
        console.log(this.props)
    //     this.setState({loading:true})
    //     alert("You coninue!!!")
    //    //Dummy Data
    //     const order={
    //         ingredients:this.state.ingredients,
    //         price:this.state.totalPrice,//always recalculate it on server
    //         customer:{
    //             name:"Om dev",
    //             address:{
    //                 street:"gali no 11",
    //                 zipCode:"110045",
    //                 country:"India"
    //             },
    //             email:"test@test.com"
    //         },
    //         deliveryMethod:"Fastest"
    //     }
    //     //will throw an error
    //     // axios.post("/orders",order)
    //     axios.post("/orders.json",order)
    //     .then(response => {
    //         this.setState({loading:false,purchasing:false})
    //     })
    //     .catch(error => {
    //         this.setState({loading:false,purchasing:false})
    //     })
    this.props.history.push("/checkout")
    

        
    }
    render(){
        const disabledinfo={
            ...this.state.ingredients
        }
        for (let key in disabledinfo) {
            disabledinfo[key]=disabledinfo[key]<=0
        }
        //{salad:true,meat:false,,}
        let orderSummary= null;
        let burger = this.state.error ? <p>INGREDIENTS CAN'T BE LOADED</p>:<Spinner/> 
        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>
                    <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledinfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    />
                </div>
                
                </Aux>
            )
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />
           
        }
        
        return(
        <Aux>
            <Modal 
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            
        </Aux>);
    }
}
export default withErrorHandler(BurgerBuilder,axios);