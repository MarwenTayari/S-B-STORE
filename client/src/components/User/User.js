import React,{ useState} from 'react'
import {toggleUser} from '../../actions/adminActions'
import {useDispatch} from 'react-redux'
import './User.css' 
import {  Button } from 'react-bootstrap'; 

const User = ({user}) => {
const  dispatch = useDispatch() 
    const {firstname, lastname, isActive ,email , _id} = user
    const [toggle,setToggle]=useState({
        isActive})

    return (
            <div className={ toggle.isActive ? "user-div-active" : "user-div-blocked" }> 
                <span className="firstname">{firstname}</span>
                <span className="lastname">{lastname}</span>
                <span className="email">{email}</span>
                {  toggle.isActive ? <span className="status"><span style={{color: "green"}}>Active </span></span> : <span className="status"> <span style={{color: "red"}}>Blocked </span></span>}
                <Button className="block-btn" variant={ !toggle.isActive ?"success":"danger"} onClick={()=>{dispatch(toggleUser(_id,toggle)) ;setToggle({...toggle,isActive:!toggle.isActive}) }}>
                   { !toggle.isActive ? "Activate"  : "Block"  }
                </Button>
            </div> 
    )
}

export default User
