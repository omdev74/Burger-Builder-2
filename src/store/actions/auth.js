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

export const auth=(email,password)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email,
            password,
            returnSecureToken:true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[AIzaSyDJalFyHyYA1KpZx-zUVrOTwCuSQ1GOxEE]",authData)
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