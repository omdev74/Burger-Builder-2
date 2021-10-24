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
    render(){
        let summary = <Redirect to="/" />
        if(this.props.ingr){
            summary = (
                <div>
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
        return {summary}
            
    }

}
const mapStateToProps = state=>{
    return{
        ingr : state.ingredients
    }

}
export default connect(mapStateToProps)(Checkout)
