import React,{Component} from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Aux from "../../hoc/Auxiliary";
import { connect } from "react-redux";


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
            drawerToggleClicked={this.ShowDrawerToggleHandler}
            isAuth={this.props.isAuth}/>
            <SideDrawer 
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
            isAuth={this.props.isAuth}/>
            <main className={classes.Content}>
            {this.props.children}
            </main>
            </div>
        </Aux>);
    }
}


const mapStateToProps = (state)=>{
    return{
        isAuth: state.auth.token !==null
    }
}


export default connect(mapStateToProps)(Layout);
    
    
