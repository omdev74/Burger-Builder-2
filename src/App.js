import React,{Component} from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./components/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import {Route,Switch} from "react-router-dom"
class App extends Component{
  state={show:true}
    
  // componentDidMount(){
  //     setTimeout(()=>{
  //       this.setState({show:false})
  //     },5000)
  //   }
  render(){
    return(
      <div>
        <Layout>
          <Switch>
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        
        </Layout>
      </div>
    )
  }
}

export default App;
