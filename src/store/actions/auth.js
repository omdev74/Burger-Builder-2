import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authFail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authSuccess = (authData)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch =>{
        console.log("🚀 ~ file: auth.js ~ line 25 ~ auth ~ email,password", email,password)

        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJalFyHyYA1KpZx-zUVrOTwCuSQ1GOxEE"
        if(!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJalFyHyYA1KpZx-zUVrOTwCuSQ1GOxEE"
        }
        axios.post(url,authData)
        .then(response =>{
            console.log("🚀 ~ file: auth.js ~ line 34 ~ auth ~ response", response)
            dispatch(authSuccess(response))
        })
        .catch(error =>{
            console.log("🚀 ~ file: auth.js ~ line 35 ~ auth ~ error", error)
            dispatch(authFail(error))


        })


    }

}