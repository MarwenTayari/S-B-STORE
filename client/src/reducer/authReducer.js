import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL , 
    LOGIN_SUCCESS , 
    LOGIN_FAIL , 
    LOAD_USER_SUCCESS , 
    LOAD_USER_FAIL , 
    LOGOUT  ,
    UPDATE_USER,
    UPDATE_FAIL , 
    ADD_FAVORITE_SUCCESS , 
    ADD_FAVORITE_FAIL , 
    REMOVE_FROM_FAVORITE_SUCCESS , 
    REMOVE_FROM_FAVORITE_FAIL , 
    LOAD_FAVORITE_LIST_SUCCESS , 
    LOAD_FAVORITE_LIST_FAIL 
} from '../actions/types' 

let initState = {
    token : localStorage.getItem('token'), 
    user : null , 
    isAuth : localStorage.getItem('isAuth'),
    errors: null , 
    favorites : null
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_USER_SUCCESS :  
            return {
                ...state, 
                user: action.payload, 
                errors : null,  
            }
        case UPDATE_USER :
        case ADD_FAVORITE_SUCCESS :
        case REMOVE_FROM_FAVORITE_SUCCESS : 
            return {
                ...state, 
                errors : null,  
            }
        case LOAD_FAVORITE_LIST_FAIL : 
        case UPDATE_FAIL : 
        case ADD_FAVORITE_FAIL : 
        case REMOVE_FROM_FAVORITE_FAIL : 
        return { 
            ...state, 
            isAuth : true , 
            errors : action.payload,
            }
        case LOGIN_SUCCESS : 
        case REGISTER_SUCCESS : 
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('isAuth', true)
            return { 
                ...state, 
                token : action.payload.token, 
                isAuth : true , 
                errors : null,
                }
          
        case LOGIN_FAIL : 
        case LOAD_USER_FAIL : 
        case REGISTER_FAIL : 
                localStorage.removeItem('token')
                localStorage.removeItem('isAuth')
                return { 
                    ...state, 
                    isAuth : false, 
                    errors : action.payload,
                }; 
        case LOAD_FAVORITE_LIST_SUCCESS :
            return {
                ...state ,
                favorites : action.payload , 
                errors : null 
            }
        case LOGOUT : 
                localStorage.removeItem('token')
                localStorage.removeItem('isAuth')
                return { 
                        isAuth : false , 
                        errors : null, 
                        user : null }
        default : 
                return state; 
    }
}

export default AuthReducer; 