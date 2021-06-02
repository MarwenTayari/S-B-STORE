import React,{useEffect} from 'react'
import {getFavoriteList} from '../../actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import FavoriteCart from '../FavoriteCart/FavoriteCart'
import './Favorites.css'
import { Spinner} from 'react-bootstrap';

const Favorites = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

useEffect( ()=> {
    scrollToTop(); 
    if(auth.user)
   {dispatch(getFavoriteList(auth.user._id , {favorites :auth.user.favorites}))}
}, [auth.user])

const scrollToTop = () => {
    window.scrollTo({ 
        top : 0 , 
        behavior: "smooth" })
}

    return (
        <div className="favorites-div">
            {   auth.favorites ? 
            <div>
                { auth.favorites.length!==0 ?
                <div className="favorites-list-div">
                    { auth.favorites.map(el => 
                        <FavoriteCart el={el} key={el._id}/>
                        )}
                </div> 
                : 
                <div className="fav-empty">
                  <h2 className="empty-fav-info">Your favorite list is empty</h2>
                </div>
                }  
            </div> 
            : 
            <div className="spinner-div">
               <Spinner animation="border" variant="primary" />
            </div>
           }
        </div>
    )
}

export default Favorites