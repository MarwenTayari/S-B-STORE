import {
    GET_USERS_LIST_SUCCESS, 
    GET_USERS_LIST_FAIL , 
    TOGGLE_USER_SUCCESS, 
    TOGGLE_USER_FAIL , 
    GET_ANNOUNCE_LIST_SUCCESS ,
    GET_ANNOUNCE_LIST_FAIL ,
    TOGGLE_APPROUVED_SUCCESS , 
    TOGGLE_APPROUVED_FAIL ,
    DELETE_ANNOUNCE_SUCCESS ,
    DELETE_ANNOUNCE_FAIL, 
    GET_APPROUVED_ANNOUNCE_LIST_SUCCESS ,
    GET_APPROUVED_ANNOUNCE_LIST_FAIL ,
    FILTER_ANNOUNCES_SUCCESS , 
    FILTER_ANNOUNCES_FAIL ,
    SEARCH_BY_TITLE_SUCCESS , 
    SEARCH_BY_TITLE_FAIL , 
    SEARCH_FOR_USERS_SUCCESS , 
    SEARCH_FOR_USERS_FAIL , 
    FILTER_USERS_SUCCESS , 
    FILTER_USERS_FAIL , 
    FILTER_ANNOUNCES_APPNOT_SUCCESS , 
    FILTER_ANNOUNCES_APPNOT_FAIL , 
    SEARCH_BY_TITLE_ADMIN_SUCCESS , 
    SEARCH_BY_TITLE_ADMIN_FAIL 
} from '../actions/types'

let initState = {
    users : null,
    errors: null , 
    announces : null , 
}

const AdminReducer = (state=initState , action) => {
    switch (action.type) {
        case GET_USERS_LIST_SUCCESS : 
        case SEARCH_FOR_USERS_SUCCESS : 
        case FILTER_USERS_SUCCESS :  
            return {
                ...state, 
                users: action.payload
            }
        case GET_USERS_LIST_FAIL : 
        case SEARCH_FOR_USERS_FAIL :
        case FILTER_USERS_FAIL :  
        return {
            ...state, 
            errors: action.payload
        }
        case DELETE_ANNOUNCE_SUCCESS: 
        case TOGGLE_USER_SUCCESS :
        case TOGGLE_APPROUVED_SUCCESS :  
        return state  
        case DELETE_ANNOUNCE_FAIL : 
        case FILTER_ANNOUNCES_APPNOT_FAIL: 
        case SEARCH_BY_TITLE_ADMIN_FAIL :  
        case TOGGLE_USER_FAIL : 
        case TOGGLE_APPROUVED_FAIL : 
        return {
            ...state, 
            errors: action.payload 
        }
        case GET_ANNOUNCE_LIST_SUCCESS  : 
        case FILTER_ANNOUNCES_APPNOT_SUCCESS :
        case SEARCH_BY_TITLE_ADMIN_SUCCESS :  
        case GET_APPROUVED_ANNOUNCE_LIST_SUCCESS  :
        case FILTER_ANNOUNCES_SUCCESS : 
        case SEARCH_BY_TITLE_SUCCESS :  
        return {
            ...state, 
            announces: action.payload
        }
        case GET_ANNOUNCE_LIST_FAIL : 
        case GET_APPROUVED_ANNOUNCE_LIST_FAIL : 
        case FILTER_ANNOUNCES_FAIL : 
        case SEARCH_BY_TITLE_FAIL : 
        return {
            ...state, 
            errors: action.payload
        }
        default : 
        return state;  
}
}

export default AdminReducer 