import React,{Component} from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actionTypes from "../../store/actions"
import { connect } from "react-redux";


class BurgerBuilder extends Component{
    state={

        //!Local UI
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        //! async code----------------------------------
        // axios.get("/ingredients.json")
        // .then(response =>{
        //     // this.setState({ingredients:response.data})
        //     this.props.setIngredients(response.data)
        // })
        // .catch(error=>{
        //     this.setState({error:true})
        // })
    }
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0)

        return sum>0
        
    }
    // addIngredientHandler=(type)=>{
    //     // const oldCount = this.state.ingredients[type];
    //     const oldCount = this.props.ingr[type];
    //     const updatedCount = oldCount +1;
    //     const updatedIngredients={
    //         // ...this.state.ingredients
    //         ...this.props.ingr
    //     };
    //     updatedIngredients[type]= updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.ttlPrice;
    //     const newPrice = oldPrice+priceAddition;
    //     // this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
    //     this.props.setUpdatedIngredients(updatedIngredients);
    //     this.props.setNewPrice(newPrice);
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler=(type)=>{
    //     const oldCount = this.props.ingr[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount -1;
    //     const updatedIngredients={
    //         ...this.props.ingr
    //     };
    //     updatedIngredients[type]= updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.ttlPrice;
    //     const newPrice = oldPrice-priceDeduction;
    //     this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
    //     this.updatePurchaseState(updatedIngredients);

    // }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{this.props.history.push("/checkout")}
    
    render(){
        console.log(this.props)
        const disabledinfo={
            ...this.props.ingr
        }
        for (let key in disabledinfo) {
            disabledinfo[key]=disabledinfo[key]<=0
        }
        //{salad:true,meat:false,,}
        let orderSummary= null;
        let burger = this.state.error ? <p>INGREDIENTS CAN'T BE LOADED</p>:<Spinner/> 
        if(this.props.ingr){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ingr}/>
                <div>
                    <BuildControls
                    ingredientAdded={this.props.setIngredients}
                    ingredientRemoved={this.props.removeIngredients}
                    disabled={disabledinfo}
                    purchasable={this.updatePurchaseState(this.props.ingr)}
                    price={this.props.ttlPrice}
                    ordered={this.purchaseHandler}
                    />
                </div>
                
                </Aux>
            )
            orderSummary = <OrderSummary 
                ingredients={this.props.ingr}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.props.ttlPrice}/>
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

//*setting up redux store access and subscription
const mapStateToProps = state =>{
    return{
        ingr: state.ingredients,
        ttlPrice: state.totalPrice
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        // onIncrementCounter: () => dispatch({type:actionTypes.INC_COUNTER}),
        setIngredients:(response)=>dispatch({type:actionTypes.SET_INGREDIENTS,ingNAME:response}),
        removeIngredients:(response)=>dispatch({type:actionTypes.REMOVE_INGREDIENTS,ingNAME:response}),
        setUpdatedIngredients:(updatedIngredients)=>dispatch({type:actionTypes.SET_UPDATED_INGREDIENTS,ingNAME:updatedIngredients}),
        setNewPrice:(newPrice)=>dispatch({type:actionTypes.SET_NEWPRICE,nPrice:newPrice})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));