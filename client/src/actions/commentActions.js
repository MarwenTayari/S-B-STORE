import {
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAIL , 
    DELETE_COMMENT_SUCCESS , 
    DELETE_COMMENT_FAIL ,
    UPDATE_COMMENT_SUCCESS , 
    UPDATE_COMMENT_FAIL 
} from './types' 
import axios from 'axios'

//To add comment  
export const addComment = (announce_id , info) => dispatch => {
    axios.put(`/comment/add/${announce_id}`, info)
    .then(res => {dispatch({
        type : ADD_COMMENT_SUCCESS, 
        payload : res.data
    })
    })
    .catch(err=> { dispatch({
        type : ADD_COMMENT_FAIL , 
        payload : err.response.data.errors
    })})
}

//To delete comment  
export const deleteComment = (announce_id , date) => dispatch => {
    axios.put(`/comment/delete/${announce_id}`, date)
    .then(res => {dispatch({
        type : DELETE_COMMENT_SUCCESS, 
        payload : res.data
    })
    })
    .catch(err=> { dispatch({
        type : DELETE_COMMENT_FAIL  , 
        payload : err.response.data.errors
    })})
}

//To update comment  
export const updateComment = (announce_id , info) => dispatch => {
    axios.put(`/comment/update/${announce_id}`, info)
    .then(res => {dispatch({
        type : UPDATE_COMMENT_SUCCESS, 
        payload : res.data
    })
    })
    .catch(err=> { dispatch({
        type : UPDATE_COMMENT_FAIL  , 
        payload : err.response.data.errors
    })})
}