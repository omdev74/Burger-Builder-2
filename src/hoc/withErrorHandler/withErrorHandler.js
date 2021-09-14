import React,{Component} from "react";

import Modal from "../../components/Ui/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component {
        
        // constructor(props){
        //     super(props);
        componentWillMount(){
        console.log("constructor acceseed")
        this.setState({
            error:null
        })
        this.reqInterceptor = axios.interceptors.request.use(req=>{
                    this.setState({error:null});
                    return req;
                })
        this.resInterceptor = axios.interceptors.response.use(res=>res,error =>{
                    this.setState({error:error});
                    // console.log("error updated")
                })
        }
        
        //obselete
        // UNSAFE_componentWillMount(){
            
        //     this.reqInterceptor = axios.interceptors.request.use(req=>{
        //         this.setState({error:null});
        //         return req;
        //     })
        //     this.resInterceptor = axios.interceptors.response.use(res=>res,error =>{
        //         this.setState({error:error});
        //         // console.log("error updated")
        //     })
            
        // }
        componentWillUnmount(){
            // console.log("componentWillUnmount",this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.request.eject(this.resInterceptor)


        }
        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                        {/* Something Did'nt Work! */}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )

        }
        
        
    }
}
export default withErrorHandler