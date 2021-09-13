import React,{Component} from "react";
import classes from "./ContactData.module.css"

import Spinner from "../../../components/Ui/Spinner/Spinner"
import axios from "../../../axios-orders";
class ContactData extends Component{
    state={
        name:"",
        email:"",
        address:{
                    street:"",
                    postalCode:"",
                    country:""
                },
            loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true})
        // alert("You coninue!!!")
       //Dummy Data
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,//always recalculate it on server
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
        //will throw an error
        // axios.post("/orders",order)
        axios.post("/orders.json",order)
        .then(response => {
            this.setState({loading:false})
            console.log(response)
            alert("Thank you!")
            this.props.history.push("/")
        })
        .catch(error => {
            this.setState({loading:false})
        })

    }
    render(){
        let form=(
            <form>
                <label>Name</label>
                <input type="text"  />
                <label>Email</label>
                <input type="text"  />
                <label>Address</label>
                <textarea rows="4"  />
                <label>Country</label>
                <select>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                </select>
                <button onClick={this.orderHandler}>Order</button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h1>Enter your details..</h1>
                {form}
                
            </div>
        )

    }
}

export default ContactData