import React,{Component} from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./containers/Layout/Layout";
import {Redirect, Route,Switch,withRouter} from "react-router-dom"

import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index"


//!lazy loading
import asyncComponent from "./hoc/asyncComponent";

const AsyncCheckout = asyncComponent(()=>{
  return import("./containers/Checkout/Checkout")
})

const AsyncOrders = asyncComponent(()=>{
  return import("./containers/Orders/Orders")
})

const AsyncAuth = asyncComponent(()=>{
  return import("./containers/Auth/Auth")
})



class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignin();
  }

  state={show:true}
    
  // componentDidMount(){
  //     setTimeout(()=>{
  //       this.setState({show:false})
  //     },5000)
  //   }
  render(){
  //* authentication guards---------------------------------------  
  //! Unauthenticated Routes
  let routes =(
    <Switch>
      <Route path="/auth"  component={AsyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to ="/"></Redirect>
    </Switch>
    );
  
  //! authenticated Routes
    if(this.props.isAuthenticated){
  routes = (
    <Switch>
      <Route path="/checkout"  component={(props)=><AsyncCheckout {...props}/>}></Route>
      <Route path="/orders"  component={(props)=><AsyncOrders {...props}/>}></Route>
        <Route path="/logout"  component={Logout} />
      <Route path="/auth"  component={AsyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to ="/"></Redirect>
    </Switch>
  )
  }
  //*-----------------------------------------------------------------

  return(
      <div>
        <Layout>
           {routes}
        </Layout>
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return{
    isAuthenticated:state.auth.token !== null
  }
  
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onTryAutoSignin:()=> dispatch(actions.authCheckState())
  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
