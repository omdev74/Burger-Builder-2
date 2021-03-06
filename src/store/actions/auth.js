import * as actionTypes from './actionTypes'
import axios from 'axios'


export const setAuthRedirect =(path,message)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload:{
            path,
            message
        }
    }
}

export const logout = ()=>{
    console.log("LOGGING OUT......")
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");


    return{
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = (expTime)=>{
    console.log("🚀 ~ file: auth.js ~ line 6 ~ checkAuthTimeout ~ expTime", expTime)
    return dispatch=>{
        setTimeout(() => {
            dispatch(logout())
            console.log("LOGOUT")
        }, expTime*1000);
    }
}


export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authFail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        payload:{
            error
        }
    }
}

export const authSuccess = (idToken,userId)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        payload:{
            idToken,
            userId
        }}
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
        console.log("🚀 ~ file: auth.js ~ line 44 ~ auth ~ response", response)
            
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000)
            localStorage.setItem("token",response.data.idToken);
            localStorage.setItem("expirationDate",expirationDate);
            localStorage.setItem("userId",response.data.localId);


            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
            
            
        })
        .catch(error =>{
            console.log("🚀 ~ file: auth.js ~ line 35 ~ auth ~ error", error)
            dispatch(authFail(error.message))


        })


    }

}

    export const authCheckState = ()=>{

    return dispatch =>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem("userId")
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout(  (expirationDate.getTime()-new Date().getTime()) /1000 ))
            }
            else{
                dispatch(logout());
            }
            
        }
    }

}
