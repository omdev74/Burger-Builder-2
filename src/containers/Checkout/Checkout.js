import {React,Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component{
    state={
        ingredients:
        {
            cheese:1,
            meat:1,
            salad:1,
            bacon:1
        }
    }
    componentDidMount(){
        console.log(this.props.location.search)
        const query = new URLSearchParams(this.props.location.search)
        const ingredients={}
        for(let param of query.entries()){
            console.log(param)
            //[0,1]
            //["salad",1]
            ingredients[param[0]] =+ param[1] 
        }
        this.setState({ingredients:ingredients})
        console.log(ingredients)

    }
    checkoutCancelled=()=>{
        this.props.history.goBack();

    }
    checkoutContinued=()=>{
        this.props.history.replace("/checkout/contacts-data");

    }
    render(){
        console.log(this.props)
        return(<CheckoutSummary 
            ingredients={this.state.ingredients}
            checkoutContinued={this.checkoutContinued}
            checkoutCancelled={this.checkoutCancelled}/>)
    }

}
export default Checkout
