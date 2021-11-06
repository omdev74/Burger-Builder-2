import React, { Component } from 'react'
import Input from '../../components/Ui/Input/Input'
import validator from 'validator'
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from 'react-redux'

class Auth extends Component {
    state={
        controls:{
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
            password:{
                elementType:"input",
                elementConfig:{
                    type:"password",
                    placeholder:"password"
                },
                value:"",
                validation:{
                    required:true,
                    minLength:"6"
                },
                valid:false,
                touched:false
            }}
        }
        checkValidity=(value,validationRules)=>{
        console.log("🚀 ~ file: Auth.js ~ line 39 ~ Auth ~ value", value)
        console.log("🚀 ~ file: Auth.js ~ line 39 ~ Auth ~ validationRules", validationRules)
            
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
            if(validationRules.minLength || validationRules.maxLength){
                isValid = validator.isLength(value,{min:validationRules.minLength, max:validationRules.maxLength }) && isValid
                
            }
            return isValid;
        }

        onChangeHandler  =(event,controlName)=>{
            const updatedControls ={
                ...this.state.controls,
                [controlName]:{
                    ...this.state.controls[controlName],
                    value:event.target.value,
                    valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                    touched:true
                }
            }
            console.log("🚀 ~ file: Auth.js ~ line 60 ~ Auth ~ updatedControls", updatedControls)
            this.setState({controls:updatedControls})

        }

        submitHandler = (event)=>{
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value);

        }
        
    render() {
        let formElementsArray=[]
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        const form = formElementsArray.map(formElement =>(
            <Input 
                key = {formElement.id}
                label={formElement.id.toUpperCase()}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}

                // Visual FeedBack
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}

                changed={(event)=>this.onChangeHandler(event,formElement.id)}>
            </Input>

        ))
        return (
            <div>
                <form class={classes.login} onSubmit={this.submitHandler}>
                    {form}
                    <Input elementType="button">LOGIN</Input> 
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (disaptch)=>{
    return{
        onAuth : (email,password) => disaptch(actions.auth(email,password))
    }
}

export default connect(null,mapDispatchToProps)(Auth)
