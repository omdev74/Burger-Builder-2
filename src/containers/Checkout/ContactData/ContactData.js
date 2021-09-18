import React,{Component} from "react";
import classes from "./ContactData.module.css"
import Input from "../../../components/Ui/Input/Input";
import Spinner from "../../../components/Ui/Spinner/Spinner"
import axios from "../../../axios-orders";
class ContactData extends Component{
    state={
        orderForm:{
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

        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        console.log(formData)
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,//always recalculate it on server
            orderData:formData
            
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
    onChangeHandler=(event,inputIdentifier)=>{
        console.log(event.target.value);
        const updatedOrderForm={...this.state.orderForm}
        console.log(updatedOrderForm)
        //Deep Clone
        const updatedFormElement={...updatedOrderForm[inputIdentifier]};
        console.log(updatedFormElement)

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm}) 


    }
    render(){
        let formElementsArray=[]
    for(let key in this.state.orderForm){
        formElementsArray.push({
            id:key,
            config:this.state.orderForm[key]
        })
    }
        
        let form=(
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                <Input
                label={formElement.id.toUpperCase()}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.onChangeHandler(event,formElement.id)}
                ></Input>)
                )}

                <Input elementType="button">Order</Input> 
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