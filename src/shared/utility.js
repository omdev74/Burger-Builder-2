import validator from "validator"


export const updateObject  =(oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity=(value,validationRules)=>{
        let isValid = true;

        if(!validationRules){
            return true
        }
        if(validationRules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validationRules.email){
            isValid = validator.isEmail(value) && isValid
        }
        if(validationRules.minLength || validationRules.maxLength){
            isValid = validator.isLength(value,{min:validationRules.minLength, max:validationRules.maxLength }) && isValid
            
        }
        return isValid;
    }