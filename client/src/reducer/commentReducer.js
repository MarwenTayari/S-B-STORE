import {
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAIL , 
    DELETE_COMMENT_SUCCESS , 
    DELETE_COMMENT_FAIL ,
    UPDATE_COMMENT_SUCCESS , 
    UPDATE_COMMENT_FAIL 
} from '../actions/types'  

let initState = {
    comment: null , 
    comments : null , 
    errors: null , 
}

const CommentReducer = (state = initState, action) => {
    switch(action.type){
    case ADD_COMMENT_SUCCESS : 
    case DELETE_COMMENT_SUCCESS : 
    case UPDATE_COMMENT_SUCCESS : 
        return { 
            ...state, 
            comment :  action.payload,
        };
    case ADD_COMMENT_FAIL :
    case DELETE_COMMENT_FAIL  : 
    case UPDATE_COMMENT_FAIL : 
        return { 
            ...state, 
            errors : action.payload, 
        };
    default : 
        return state; 
}  
}

export default CommentReducer ;