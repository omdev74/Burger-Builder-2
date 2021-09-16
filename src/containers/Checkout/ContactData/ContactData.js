import React,{Component} from "react";
import classes from "./ContactData.module.css"
import Input from "../../../components/Ui/Input/Input";
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
    // constructor(props){
    //     super(props);
    //     // this.nameRef = React.createRef();
    // }
    componentDidMount(){
        // this.nameRef.current.focus()
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
                {/* <label>Name</label>
                <input type="text" ref={this.nameRef}/>
                <label>Email</label>
                <input type="text"  />
                <label>Address</label>
                <textarea rows="4"  />
                <label>Country</label>
                <select>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                </select>
                <button onClick={this.orderHandler}>Order</button> */}
                <Input inputtype="input" label="Name" type="text" name="name" placeholder="Your Name"></Input>
                <Input inputtype="input" label="Email" type="text" name="Email" placeholder="Email"></Input>
                <Input inputtype="textarea" label="Address" type="textarea" name="Address" rows="4" placeholder="Your Address"></Input>
                <Input inputtype="select" label="Country" type="select" name="Country" placeholder="Select a Country"></Input>
                <Input inputtype="button" onClick={this.orderHandler}>Order</Input> 
                </form>
        );
        if(this.state.loading){
            form=<Spinner />
        }
        return(<div>

                <div className="Headers"> <h1>Enter your details..</h1></div>
                <div className={classes.ContactData}>
                    {form}
                    {console.log(this.nameRef)}
                    
                </div>
                </div>
        )

    }
}

export default ContactData