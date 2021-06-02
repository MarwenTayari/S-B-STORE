import React from 'react'
import './ApprouvedCart.css';
import {useSelector , useDispatch} from 'react-redux'
import {addFavorite , removeFavorite } from '../../actions/authActions'
import {getUserOfAnnounce,loadAnnounce} from '../../actions/announceActions'
import { Link } from 'react-router-dom'
import { IoLocationSharp } from 'react-icons/io5'
import { TiTag } from "react-icons/ti"
import { GrMoney} from "react-icons/gr";
import { FaHeart , FaEye } from "react-icons/fa";

const ApprouvedCart = ({el}) => {

    const {title , price , location , avatar, _id , owner} = el

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    return (
        <div className="cart">
            <div className="div-img">
               <img className="approuvedCart_img" src={avatar} alt="title"/>
            </div>
         <div className="info-btn-div">
            <div className="info">
                    <h6 className="title-size"> <TiTag/> {title} </h6>
                    <h6 className="price"> <GrMoney/> {price} Dt</h6>
                    <h6 className="location"> <IoLocationSharp/>  {location} </h6>
            </div>
            <div className="btn-div"> 
            {    user  ? 
                <div>
                     {
                         user.isAdmin ? 
                         <Link to={`/announce/${_id}`} onClick={()=> {dispatch(getUserOfAnnounce(owner)); dispatch(loadAnnounce(_id))}}><FaEye className="eye-logo" title="See more"/></Link>
                         : 
                         <div>
                              {  user.isActive ? 
                               <div> 
                                  
                                <Link to={`/announce/${_id}`} onClick={()=> {dispatch(getUserOfAnnounce(owner)); dispatch(loadAnnounce(_id))}}
                                title="See more"
                                ><FaEye className="eye-logo"/></Link>
                                <Link
                                title={ user.favorites.includes(_id)===false ?  "Add to Favorites" :  "Remove from Favorites"  }
                                ><FaHeart className={ user.favorites.includes(_id)===false ?  "fav-heart" :  "fav-heart-red"  } 
                                  onClick = {()=> { user.favorites.includes(_id)===false ?  dispatch(addFavorite( user._id, {_id})) : dispatch(removeFavorite(user._id,{_id},{favorites :user.favorites})) }}>
                                   </FaHeart></Link>  
                               </div>  : 
                                       <div></div>
                                 }
                         </div>
                     }
                </div>  : <div></div>  }
            </div>
            </div>
        </div>
    )
}

export default ApprouvedCart