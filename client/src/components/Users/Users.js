import React,{useEffect, useState} from 'react'
import {getUsersList , searchUser , filterUsers} from '../../actions/adminActions'
import {useDispatch, useSelector} from 'react-redux'
import User from '../User/User'
import './Users.css'
import { Form , Button , Spinner } from 'react-bootstrap'; 

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state=> state.admin.users)

 const [info,setInfo] = useState({name:""})
 const [toggle,setToggle] = useState({isActive:null})

useEffect(()=> {
    scrollToTop(); 
    dispatch(getUsersList())
},[])

const scrollToTop = () => {
    window.scrollTo({ 
        top : 0 , 
        behavior: "smooth" })
}

const handelChange =e=> {
    setInfo({...info,[e.target.name]:e.target.value})
}

const searchNow =(e)=> {
   e.preventDefault()
   dispatch(searchUser(info))
}

const handleChangefilter =(e)=> {
   setToggle({...toggle,[e.target.name]:e.target.value})
}

const filterNow =e=> {
    e.preventDefault() 
    dispatch(filterUsers(toggle))
}

    return (
        <div className="Users-div">
            <div className="search-filter-div">
            <Form  inline onSubmit={searchNow} className="form-search-users">
                    <Form.Control
                    type="text"
                    className="mx-sm-3"
                    id="inputPassword6"
                    placeholder="Search for user"
                    name="name"
                    onChange={handelChange}
                    value={info.name}
                    />
                <Button variant="secondary" type="submit" className="btn-search-filter-users  btn-search-users">Search</Button>
            </Form> 
            
            <Form  inline onSubmit ={filterNow} className="form-filter-users">
                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref"> Account status : </Form.Label>
                        <Form.Control as="select" id="filter-users-select" name="isActive"  onClick={handleChangefilter} custom>
                            <option  >Show All</option>
                            <option  value={true} >Active</option>
                            <option  value={false}>Blocked</option>
                        </Form.Control>
                <Button variant="secondary" type="submit" className="btn-search-filter-users"> Filter </Button>
            </Form>
            
            </div>

              <div className="titles-div">
                <span className="firstName-title">Firstname :</span>
                <span className="lastName-title">Lastname :</span>
                <span className="email-title">E-mail :</span>
                <span className="status-title">Account status :</span>
              </div>
            { users ?
             users.map(user=> <User key={user._id} user={user}/>)
             :
             <div className="spinner-div-users">
                  <Spinner animation="border" variant="primary" />
             </div>
             }
        </div>
    )
}

export default Users
