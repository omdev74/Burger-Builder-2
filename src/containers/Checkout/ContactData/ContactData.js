import React,{Component} from "react";
import classes from "./ContactData.module.css"
import Input from "../../../components/Ui/Input/Input";
import Spinner from "../../../components/Ui/Spinner/Spinner"
import axios from "../../../axios-orders";
import validator from "validator";
class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Name"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:"textarea",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Street",
                        rows:"4"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode:{
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Your Postal/Zip code"
                    },
                    value:"",
                    validation:{
                        required:true,
                        maxLength:"10",
                        minLength:"5"
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:"input",
                    elementConfig:{
                        type:"text",
                        placeholder:"Country"
                    },
                    value:"",
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:"input",
                    elementConfig:{
                        type:"email",
                        placeholder:"Your E-Mail"
                    },
                    value:"",
                    validation:{
                        required:true,
                        email:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:"select",
                    elementConfig:{
                        options:[
                            {value:"fastest",displayValue:"Fastest"},
                            {value:"cheapest",displayValue:"Cheapest"}
                        ],
                    },
                value:"",
                validation:{},
                valid:true,
                touched:false
                }
            },
        formIsValid:false,
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
    checkValidity=(value,validationRules)=>{
        let isValid = true;
        if(!validationRules){
            return true
        }

        if(validationRules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validationRules.email){
            isValid = validator.isEmail(value) && isValid
        }
        if(validationRules.minLength && validationRules.maxLength){
            isValid = validator.isLength(value,{min:validationRules.minLength, max:validationRules.maxLength }) && isValid
        }
        return isValid;
    }
    onChangeHandler=(event,inputIdentifier)=>{
        console.log("Value = "+event.target.value);
        const updatedOrderForm={...this.state.orderForm}
        console.log(updatedOrderForm)
        //Deep Clone
        const updatedFormElement={...updatedOrderForm[inputIdentifier]};
        console.log(updatedFormElement)

        updatedFormElement.value = event.target.value;
        // console.log("updatedFormElement.value = event.target.value")
        // console.log(updatedFormElement)
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // console.log(updatedFormElement)
        let formIsValid = true;
        for(inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid)

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid},()=>{
            // validation(this.state.orderForm);

        })
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

                // Visual FeedBack
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}

                changed={(event)=>this.onChangeHandler(event,formElement.id)}
                ></Input>)
                )}

                <Input elementType="button" disabled={!this.state.formIsValid}>Order</Input> 
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