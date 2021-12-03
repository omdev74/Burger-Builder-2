import React, { Component } from 'react'


const asyncComponent =(importComponents)=>{
    return class extends Component {
        state={
            component:null
        }
            
        componentDidMount(){
            importComponents()
            .then(cmp =>{this.setState({component:cmp.default})})
        }
        render() {

            const C = this.state.component
                return (C ? <C {...this.props}/> : null)
        }
    }
}


export default asyncComponent