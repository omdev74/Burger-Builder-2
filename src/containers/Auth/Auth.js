import React, { Component } from 'react'
import Input from '../../components/Ui/Input/Input'
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from 'react-redux'
import Spinner from "../../components/Ui/Spinner/Spinner"
import { Redirect } from 'react-router-dom'
import {updateObject,checkValidity} from "../../shared/utility"

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

        componentDidMount(){
            if(!this.props.buildingBurger && this.props.authRedirect !== "/"){
                this.props.onSetAuthRedirectPath()//!resets authRedirect to "/"
            }

        }

        

        //!on change of input
        onChangeHandler  =(event,controlName)=>{
            const updatedControls = updateObject(this.state.controls,{
                [controlName]:updateObject(this.state.controls[controlName],{
                    value:event.target.value,
                    valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                    touched:true
                })
            })
            console.log("🚀 ~ file: Auth.js ~ line 75 ~ Auth ~ controlName", updatedControls)
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
            authRedirect = <Redirect to ={this.props.authRedirectPath}/>
            
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
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger:state.auth.burgerBuilder
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath :()=>dispatch(actions.setAuthRedirect("/","[componentDidMount() Auth.js] !this.props.buildingBurger && this.props.authRedirect !== '/'"))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
