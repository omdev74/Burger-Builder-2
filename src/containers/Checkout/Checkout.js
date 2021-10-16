import {React,Component} from "react";
import { Route } from "react-router-dom";
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
        console.log(this.props)
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ingr}
                checkoutContinued={this.checkoutContinued}
                checkoutCancelled={this.checkoutCancelled}/>
                <Route path={
                    this.props.match.path + "/contact-data"} 
                    component={ContactData}
                    />

            </div>
            )
    }

}
const mapStateToProps = state=>{
    return{
        ingr : state.ingredients
    }

}
export default connect(mapStateToProps)(Checkout)
