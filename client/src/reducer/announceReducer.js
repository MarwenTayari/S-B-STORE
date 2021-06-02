import {
    ADD_ANOUNNCE_SUCCESS , 
    ADD_ANOUDNNCE_FAIL, 
    LOAD_USER_ANNOUNCES_SUCCESS , 
    LOAD_USER_ANNOUNCES_FAIL ,
    DELETE_ANNOUNCE_SUCCESS , 
    DELETE_ANNOUNCE_FAIL , 
    UPDATE_ANNOUNCE_SUCCESS , 
    UPDATE_ANNOUNCE_FAIL , 
    GET_USER_OF_ANNOUNCE_SUCCESS , 
    GET_USER_OF_ANNOUNCE_FAIL , 
    LOAD_ANNOUNCE_SUCCESS ,
    LOAD_ANNOUNCE_FAIL 
} from '../actions/types'  

let initState = {
    announce : null , 
    userOfAnnounce : null ,
    errors: null , 
    announces: null
}

const AnnounceReducer = (state = initState, action) => {
    switch(action.type){
    case GET_USER_OF_ANNOUNCE_SUCCESS : 
    return {
        ...state, 
        userOfAnnounce : action.payload
    }
    case DELETE_ANNOUNCE_SUCCESS : 
    case ADD_ANOUNNCE_SUCCESS : 
    case UPDATE_ANNOUNCE_SUCCESS :
    case LOAD_ANNOUNCE_SUCCESS :  
        return { 
            ...state, 
            announce :  action.payload,
        };
    case DELETE_ANNOUNCE_FAIL :
    case ADD_ANOUDNNCE_FAIL :
    case UPDATE_ANNOUNCE_FAIL : 
    case GET_USER_OF_ANNOUNCE_FAIL : 
    case LOAD_ANNOUNCE_FAIL : 
        return { 
            ...state, 
            errors : action.payload, 
        };
    case LOAD_USER_ANNOUNCES_SUCCESS : 
    return {
        ...state,  
     announces : action.payload , 
     errors : null , 
    }
    case LOAD_USER_ANNOUNCES_FAIL :
        return { 
            ...state, 
            announces : null,  
            errors : action.payload, 
        };
    default : 
        return state; 
}  
}

export default AnnounceReducer ;