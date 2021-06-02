import {
    ADD_ANOUNNCE_SUCCESS , 
    ADD_ANOUDNNCE_FAIL, 
    LOAD_USER_ANNOUNCES_SUCCESS , 
    LOAD_USER_ANNOUNCES_FAIL , 
    DELETE_ANNOUNCE_SUCCESS , 
    DELETE_ANNOUNCE_FAIL, 
    UPDATE_ANNOUNCE_SUCCESS , 
    UPDATE_ANNOUNCE_FAIL , 
    GET_USER_OF_ANNOUNCE_SUCCESS , 
    GET_USER_OF_ANNOUNCE_FAIL ,
    LOAD_ANNOUNCE_SUCCESS ,
    LOAD_ANNOUNCE_FAIL 
} from './types' 

import axios from 'axios' 

///*"proxy": "http://localhost:5000", */
export const addAnnounce = (info, file,user_id) => async(dispatch) => {
    let formData = new FormData()
    formData.append("info", JSON.stringify(info))
    formData.append("avatar", file)
    axios.post('/announce', formData )
    .then(res => {dispatch({
        type : ADD_ANOUNNCE_SUCCESS , 
        payload : res.data ,
    }); dispatch(getUserAnnouces(user_id)) })
    .catch(err =>{ dispatch({
        type : ADD_ANOUDNNCE_FAIL , 
        payload : err.response.data.errors,
    })})
}

//Get Announcements of user
export const getUserAnnouces = (_id) => (dispatch)=> { 
    axios.get(`/announce/${_id}`)
    .then((res)=> 
    dispatch({
        type : LOAD_USER_ANNOUNCES_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : LOAD_USER_ANNOUNCES_FAIL , 
        payload : err.response.data.msg
    })})
}

//Delete Announce 
export const deleteAnnounce = (_id) => (dispatch)=> {
    axios.delete(`/announce/delete/${_id}`)
    .then((res)=> { dispatch ({
        type : DELETE_ANNOUNCE_SUCCESS, 
        payload : res.data 
    })
    }).catch((err)=> {dispatch({
        type :DELETE_ANNOUNCE_FAIL, 
        payload : err.response.data.msg
    })})}

//Update Announce 
export const updateAnnounce = (_id, info,file,user_id) => (dispatch) => {
    let formData = new FormData()
    formData.append("info", JSON.stringify(info))
    formData.append("avatar", file)
    axios.put(`/announce/update/${_id}`, formData )
    .then(res => {dispatch({
        type : UPDATE_ANNOUNCE_SUCCESS , 
    }); dispatch(getUserAnnouces(user_id))
    })
    .catch(err=> { dispatch({
        type : UPDATE_ANNOUNCE_FAIL, 
        payload : err.response.data.errors
    })})
}

//To get user of Announce 
export const getUserOfAnnounce = (_id) => (dispatch)=> { 
    axios.get(`/users/${_id}`)
    .then((res)=> 
    dispatch({
        type : GET_USER_OF_ANNOUNCE_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : GET_USER_OF_ANNOUNCE_FAIL , 
        payload : err.response.data.msg
    })})
}

//To load Announce 
export const loadAnnounce = (_id) => (dispatch)=> { 
    axios.get(`/announce/load/${_id}`)
    .then((res)=> 
    dispatch({
        type : LOAD_ANNOUNCE_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : LOAD_ANNOUNCE_FAIL , 
        payload : err.response.data.msg
    })})
}