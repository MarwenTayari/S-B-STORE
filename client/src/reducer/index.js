import {combineReducers} from 'redux'
import AuthReducer  from './authReducer' 
import AnnounceReducer from './announceReducer'
import AdminReducer  from './adminReducer'
import CommentReducer from './commentReducer'

export default combineReducers({ auth : AuthReducer, announce : AnnounceReducer , admin : AdminReducer , comments : CommentReducer })