import React,{Component} from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/index"
import { connect } from "react-redux";


class BurgerBuilder extends Component{
    state={

        //!Local UI
        purchasing:false,
        loading:false
    }
    componentDidMount(){
        //! async code----------------------------------
        this.props.getIngredients()
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
    
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        this.props.purchaseInit()
        this.props.history.push("/checkout")
    }

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
        let burger = this.props.error ? <p>INGREDIENTS CAN'T BE LOADED</p>:<Spinner/> 
        if(this.props.ingr){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ingr}/>
                <div>
                    <BuildControls
                    ingredientAdded={this.props.addIngredients}
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
        ingr: state.burgerBuilder.ingredients,
        ttlPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        addIngredients:(response)=>dispatch(actions.addIngredient(response)),
        removeIngredients:(response)=>dispatch(actions.removeIngredient(response)),
        getIngredients:()=>dispatch(actions.getIngredients()),
        purchaseInit: ()=> dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));