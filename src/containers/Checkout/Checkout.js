import {React,Component} from "react";
import { Route,Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";


import { connect } from "react-redux";


class Checkout extends Component{
    state={
        
    }

    checkoutCancelled=()=>{
        this.props.history.goBack();

    }
    checkoutContinued=()=>{
        this.props.history.replace("/checkout/contact-data");

    }

    

    // constructor(props){
    //     super(props);
    //     this.props.purchaseInit()
    // }
    render(){

        let summary = <Redirect to="/"></Redirect>

        //! Reditrects when there is no ingredient else
        if(this.props.ingr){
            const purchasedRedirect = this.props.purchased ? <Redirect to ="/"></Redirect> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingr}
                        checkoutContinued={this.checkoutContinued}
                        checkoutCancelled={this.checkoutCancelled}
                        />
                    <Route path={
                        this.props.match.path + "/contact-data"}
                        component={ContactData}
                        />
                </div>
                
            )

        }

        console.log(this.props)
        return (
            summary
        )
        
            
    }

}
const mapStateToProps = state=>{
    return{
        ingr : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }

}


export default connect(mapStateToProps)(Checkout)
