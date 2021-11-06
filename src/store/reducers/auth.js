import * as actionTypes from '../actions/actionTypes'

const initialState ={


}
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: alert("Success");
        case actionTypes.AUTH_FAIL: console.log("Fail")
        default:
            return null
    }

}
