import {React,Component} from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component{
    state={
        //TODO: use redux
        ingredients:null,
        totalPrice:0
    }
    // constructor(props){
    //     super(props);
    UNSAFE_componentWillMount(){
        console.log("Called")

        console.log(this.props.location.search)
        const query = new URLSearchParams(this.props.location.search)
        const ingredients={}
        let price = 0;
        for(let param of query.entries()){
            console.log("query = "+param)
            if(param[0] === "price"){
                price = param[1]
            }
            else{
                ingredients[param[0]] =+ param[1] 
            }
        }
        this.setState({ingredients:ingredients,totalPrice:price})
        console.log(ingredients)

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
                ingredients={this.state.ingredients}
                checkoutContinued={this.checkoutContinued}
                checkoutCancelled={this.checkoutCancelled}/>
                <Route path={
                    this.props.match.path + "/contact-data"} 
                    // component={ContactData}
                    //TODO: use redux to render ContactData
                    render={(props)=>(
                                        <ContactData 
                                        ingredients={this.state.ingredients} 
                                        price={this.state.totalPrice}
                                        {...props} /> 
                    )}
                    />

            </div>
            )
    }

}
export default Checkout
