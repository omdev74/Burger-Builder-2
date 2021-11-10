import React, { Component } from 'react'
import Input from '../../components/Ui/Input/Input'
import validator from 'validator'
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from 'react-redux'
import Spinner from "../../components/Ui/Spinner/Spinner"
import { Redirect } from 'react-router-dom'

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
            }},
            isSignup:true
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
            this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);

        }

        switchAuthModeHandler = (event)=>{
            event.preventDefault();
            this.setState(prevState =>{
                return {isSignup:!prevState.isSignup}
                
            });
            console.log("🚀 ~ file: Auth.js ~ line 88 ~ Auth ~ isSignup", this.state.isSignup)
            
        }

        errorHandler = ()=>{
            console.log("called")
            
            let errMessage = null;
                if(this.props.error){
                    errMessage = (
                        <p>{this.props.error}</p>
                    )
                    let form = document.getElementsByClassName(classes.login)
                    console.log("🚀 ~ file: Auth.js ~ line 98 ~ Auth ~ form", form )
                    
                }
                return errMessage;

        }
            
        
        
    render() {
        let formElementsArray=[]
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement =>(
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
        if(this.props.loading){
            form = <Spinner></Spinner>
        }

        let authRedirect = null
        if(this.props.isAuth){
            authRedirect = <Redirect to ="/"/>
            
        }
        
        return (
            <div>
                <form className={classes.login}>
                    {authRedirect}
                    {this.errorHandler()}
                    {form}
                    <button 
                    className={classes.Button_1} 
                    disabled={false}
                    onClick={this.submitHandler}
                    >SUBMIT</button>
                    <button 
                    className={classes.Button_1} 
                    disabled={false}
                    onClick={this.switchAuthModeHandler}
                    >SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP" }</button>

                </form>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = (disaptch)=>{
    return{
        onAuth : (email,password,isSignup) => disaptch(actions.auth(email,password,isSignup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
