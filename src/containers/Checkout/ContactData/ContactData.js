import React,{Component} from "react";
import classes from "./ContactData.module.css"
import Input from "../../../components/Ui/Input/Input";
import Spinner from "../../../components/Ui/Spinner/Spinner"
import axios from "../../../axios-orders";
class ContactData extends Component{
    state={
        orderForn:{
                name:{
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Name"
                    },
                    value:""
                },
                street:{
                    elementType:"textarea",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Street",
                        rows:"4"
                    },
                    value:""
                },
                zipCode:{
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Postal/Zip code"
                    },
                    value:""
                },
                country:{
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Country"
                    },
                    value:""
                },
                email:{
                    elementType:"input",
                    elementConfig:{
                        type:"email",
                        placeholder:"Your E-Mail"
                    },
                    value:""
                },
                deliveryMethod:{
                    elementType:"select",
                    elementConfig:{
                        options:[
                            {value:"fastest",displayValue:"Fastest"},
                            {value:"cheapest",displayValue:"Cheapest"}
                        ]
                    },
                }
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
        let formElementsArray=[]
    for(let key in this.state.orderForn){
        formElementsArray.push({
            id:key,
            config:this.state.orderForn[key]
        })
    }
        
        let form=(
            <form>
                {formElementsArray.map(formElement=>(
                <Input
                label={formElement.id.toUpperCase()}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                ></Input>)
                )}

                <Input elementType="button" onClick={this.orderHandler}>Order</Input> 
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