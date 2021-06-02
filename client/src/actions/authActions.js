import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL , 
    LOGIN_SUCCESS , 
    LOGIN_FAIL , 
    LOAD_USER_SUCCESS , 
    LOAD_USER_FAIL , 
    LOGOUT , 
    UPDATE_USER,
    UPDATE_FAIL , 
    ADD_FAVORITE_SUCCESS , 
    ADD_FAVORITE_FAIL ,
    REMOVE_FROM_FAVORITE_SUCCESS , 
    REMOVE_FROM_FAVORITE_FAIL , 
    LOAD_FAVORITE_LIST_SUCCESS , 
    LOAD_FAVORITE_LIST_FAIL 
} from './types' 
import axios from 'axios'
import setToken from '../setToken'

// To sign in new user 
export const registerUser = info => async(dispatch) => {
    axios.post('/register', info )
    .then(res => {dispatch({
        type : REGISTER_SUCCESS, 
        payload : res.data ,
    })})
    .catch(err =>{ dispatch({
        type : REGISTER_FAIL , 
        payload : err.response.data.errors,
    }) })
}
// To update informations of user
export const updateUser = (_id,info) => async(dispatch) => {
    axios.put(`/update/user/${_id}`, info)
    .then(res => {dispatch({
        type : UPDATE_USER, 
    })
    dispatch(loadUser())})
    .catch(err=> { dispatch({
        type : UPDATE_FAIL , 
        payload : err.response.data.errors
    })})
}
// To get the informations of the user 
export const loadUser = () => (dispatch)=> { 
    setToken() 
    axios.get('/login')
    .then((res)=> 
    dispatch({
        type : LOAD_USER_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : LOAD_USER_FAIL , 
        payload : err.response.data.msg
    })})
}
// To Log in a user 
export const loginUser = data => dispatch => { 
    axios.post('/login', data)
    .then(res=> { dispatch({
        type : LOGIN_SUCCESS, 
        payload : res.data , 
    }) }).catch(err => dispatch({
        type : LOGIN_FAIL, 
        payload : err.response.data.errors, 
    }))
}
// To Log Out user
export const logout = () => dispatch => {
    dispatch({
        type : LOGOUT  
    })
}

//To add favorite list 
export const addFavorite = (user_id , _id) => dispatch => {
    axios.put(`/update/addfavorites/${user_id}`, _id)
    .then(res => {dispatch({
        type : ADD_FAVORITE_SUCCESS, 
    }); dispatch(loadUser())
    })
    .catch(err=> { dispatch({
        type : ADD_FAVORITE_FAIL , 
        payload : err.response.data.errors
    })})
}

//To get favorite list of user 
export const getFavoriteList = (_id, favorites) => (dispatch)=> {   
axios.get(`/announce/favoritesList/${_id}`, {params : favorites} )
    .then((res)=> 
    dispatch({
        type : LOAD_FAVORITE_LIST_SUCCESS , 
        payload : res.data , 
    })).catch(err => { dispatch({
        type : LOAD_FAVORITE_LIST_FAIL , 
        payload : err.response.data.msg
    }) })
}

//To remove favorite 
export const removeFavorite = (user_id , _id, favorites) => dispatch => {
    axios.put(`/update/removefavorites/${user_id}`, _id)
    .then(res => {dispatch({
        type : REMOVE_FROM_FAVORITE_SUCCESS, 
    }) ; dispatch(loadUser()) ;dispatch(getFavoriteList(user_id ,favorites ))  
    })   
    .catch(err=> { dispatch({
        type : REMOVE_FROM_FAVORITE_FAIL , 
        payload : err.response.data.errors
    }) })
}