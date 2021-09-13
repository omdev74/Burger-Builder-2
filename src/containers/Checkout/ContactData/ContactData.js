import React,{Component} from "react";
import classes from "./ContactData.module.css"
class ContactData extends Component{
    state={
        name:"",
        email:"",
        address:{
                    street:"",
                    postalCode:"",
                    country:""
                }
    }
    render(){
        return(
            <div className={classes.ContactData}>
                <h1>Enter your details..</h1>
                <form>
                <label>Name</label>
                <input type="text"  />
                <label>Email</label>
                <input type="text"  required/>
                <label>Address</label>
                <textarea rows="4"  />
                <label>Country</label>
                <select>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                </select>
                <button onClick={this.postDataHandler}>Order</button>





                </form>
            </div>
        )

    }
}

export default ContactData