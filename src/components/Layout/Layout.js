import React,{Component} from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Aux from "../../hoc/Auxiliary";


class Layout extends Component{

    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    ShowDrawerToggleHandler=()=>{
        //dont use because u will get old state
        // this.setState({showSideDrawer:!this.state.showSideDrawer})
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        })

    }
    render(){
        return(
        <Aux>
            <div className={classes.Bg}>
            <Toolbar 
            drawerToggleClicked={this.ShowDrawerToggleHandler}/>
            <SideDrawer 
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
            {this.props.children}
            </main>
            </div>
        </Aux>);
    }
}

export default Layout;
    
    
