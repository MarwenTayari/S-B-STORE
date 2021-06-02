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
    SEARCH_BY_TITLE_FAIL, 
    SEARCH_FOR_USERS_SUCCESS , 
    SEARCH_FOR_USERS_FAIL , 
    FILTER_USERS_SUCCESS , 
    FILTER_USERS_FAIL , 
    FILTER_ANNOUNCES_APPNOT_SUCCESS , 
    FILTER_ANNOUNCES_APPNOT_FAIL , 
    SEARCH_BY_TITLE_ADMIN_SUCCESS , 
    SEARCH_BY_TITLE_ADMIN_FAIL 
} from './types' 
import axios from 'axios'

// To get the users list (Client)
export const getUsersList = () => (dispatch)=> { 
    axios.get('/users')
    .then((res)=> 
    dispatch({
        type : GET_USERS_LIST_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : GET_USERS_LIST_FAIL , 
        payload : err.response.data.msg
    })})
}

//To Toggle user account 
export const toggleUser = (_id, toggle) => (dispatch) => {
    axios.put(`/users/toggle/${_id}`,toggle)
     .then(res => {dispatch({
        type : TOGGLE_USER_SUCCESS , 
    }); dispatch(getUsersList())
    })
    .catch(err=> { dispatch({
        type : TOGGLE_USER_FAIL , 
        payload : err.response.data.errors
    })})
}

// To get the list of announcemnts (approuved : false/true) 
export const getAnnounceList = () => (dispatch) => {
    axios.get('/announce/approuved/getAll')
    .then((res)=> 
    dispatch({
        type : GET_ANNOUNCE_LIST_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : GET_ANNOUNCE_LIST_FAIL , 
        payload : err.response.data.msg
    })})
}

// To get the approuved list of announcemnts (approuved : true)
export const getApprouvedAnnounce = () => (dispatch) => {
    axios.get('/announce/approuved/true')
    .then((res)=> 
    dispatch({
        type : GET_APPROUVED_ANNOUNCE_LIST_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : GET_APPROUVED_ANNOUNCE_LIST_FAIL , 
        payload : err.response.data.msg
    })})
}

//To toggle approuved announce 
export const toggleApprouved = (_id , toggle) => (dispatch) => {
    axios.put(`/announce/toggle/${_id}`,toggle)
    .then(res => {dispatch({
        type : TOGGLE_APPROUVED_SUCCESS , 
    }); dispatch(getAnnounceList())
    })
    .catch(err=> { dispatch({
        type : TOGGLE_APPROUVED_FAIL , 
        payload : err.response.data.errors
    })})
}  

//To delete announce (by id)
export const deleteAnnounce = (_id) => (dispatch)=> {
    axios.delete(`/announce/delete/${_id}`)
    .then((res)=> { dispatch ({
        type : DELETE_ANNOUNCE_SUCCESS, 
        payload : res.data 
    }); dispatch(getAnnounceList());
    }).catch((err)=> {dispatch({
        type :DELETE_ANNOUNCE_FAIL, 
        payload : err.response.data.msg
    })})}

//To filter Announces by category and location 
export const filterAnnounces = (info) => (dispatch)=> { 
    axios.get('announce/filter/announces', {params : info})
    .then((res)=> 
    dispatch({
        type : FILTER_ANNOUNCES_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : FILTER_ANNOUNCES_FAIL , 
        payload : err.response.data.msg
    })})
}

//To Search Announces by title
export const searchByTitle = (search) => (dispatch)=> { 
    axios.get('announce/search/announces', {params : search})
    .then((res)=> 
    dispatch({
        type : SEARCH_BY_TITLE_SUCCESS  , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : SEARCH_BY_TITLE_FAIL , 
        payload : err.response.data.msg
    })})
}

//To Search Announces by title for admin
export const searchByTitleAdmin = (search) => (dispatch)=> { 
    axios.get('announce/search/admin', {params : search})
    .then((res)=> 
    dispatch({
        type : SEARCH_BY_TITLE_ADMIN_SUCCESS  , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : SEARCH_BY_TITLE_ADMIN_FAIL , 
        payload : err.response.data.msg
    })})
}

//To filter Announces by Approuved/Not
export const filterAppNotAnnounce = (toggle) => (dispatch)=> { 
    axios.get('announce/filter/appNot', {params : toggle})
    .then((res)=> 
    dispatch({
        type : FILTER_ANNOUNCES_APPNOT_SUCCESS  , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : FILTER_ANNOUNCES_APPNOT_FAIL , 
        payload : err.response.data.msg
    })})
}

//To search for users  
export const searchUser = (name) => (dispatch)=> { 
    axios.get('/users/name/search', {params : name})
    .then((res)=> 
    dispatch({
        type : SEARCH_FOR_USERS_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : SEARCH_FOR_USERS_FAIL , 
        payload : err.response.data.msg
    })})
}

//To filter users  (Active/Blocked)
export const filterUsers = (toggle) => (dispatch)=> { 
    axios.get('/users/name/filter', {params : toggle})
    .then((res)=> 
    dispatch({
        type : FILTER_USERS_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : FILTER_USERS_FAIL , 
        payload : err.response.data.msg
    })})
}