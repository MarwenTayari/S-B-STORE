import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {getUserOfAnnounce,loadAnnounce} from '../../actions/announceActions'
import {removeFavorite ,loadUser } from '../../actions/authActions'
import './FavoriteCart.css'
import { Link } from 'react-router-dom'
import { IoLocationSharp } from 'react-icons/io5'  
import { IoMdHeartDislike } from "react-icons/io";
import { TiTag } from "react-icons/ti"
import { GrMoney} from "react-icons/gr";
import { FaEye } from "react-icons/fa";


const FavoriteCart = ({el}) => {

    const {title  , price , location , avatar, _id , owner } = el
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    return (
        <div className="cart">
                <div className="div-img">
                    <img src={avatar} alt="title" className="approuvedCart_img"/>
                </div>
                <div className="info">
                        <h6> <TiTag/> {title} </h6>
                        <h6 className="price"> <GrMoney/> {price} Dt</h6>
                        <h6 className="location"> <IoLocationSharp/>  {location} </h6>
                </div>
                {
                   auth.user.isActive ? 
                <div> 
                        <Link to={`/announce/${_id}`} onClick={()=> {dispatch(getUserOfAnnounce(owner)); dispatch(loadAnnounce(_id))}} title="See more"><FaEye className="eye-logo"/></Link>
                        <Link title="Remove from Favorites"><IoMdHeartDislike className="disLike" onClick = {()=>  {dispatch(removeFavorite(auth.user._id, {_id:el._id},{favorites :auth.user.favorites})); dispatch(loadUser())}}>
                        </IoMdHeartDislike></Link>
                </div> : 
                <div></div>
                }
        </div>
    )
}

export default FavoriteCart

/*
<div className="cart">
                <div className="div-img">
                <img src={avatar} alt="title"/>
                </div>
                <div className="info">
                        <h6> <BsFillForwardFill/> {title} </h6>
                        <h6 className="price"> <GrMoney/> {price} Dt</h6>
                        <h6 className="motif location"> <IoLocationSharp/>  {location} </h6>
                </div>
                <div> 
                    <button>See more</button>
                    <button onClick = {()=>  dispatch(removeFavorite(auth.user._id, el._id,{favorites :auth.user.favorites}))}>
                        Remove from Favorites
                    </button>
                </div>
            </div>      */ 