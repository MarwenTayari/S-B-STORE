import React,{useState , useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser  , getFavoriteList} from '../../actions/authActions' 
import './Profil.css' 
import { Form, Button , Spinner } from 'react-bootstrap'; 

const Profil = () => {
    const dispatch= useDispatch()
    const auth = useSelector((state) => state.auth)
    const [toggleEdit,setToggleEdit] = useState(false)
    const [info,setInfo] = useState(auth.user)  

useEffect (() => {
    scrollToTop();
    if(auth.user)
    {setInfo(auth.user)
        dispatch(getFavoriteList(auth.user._id , {favorites :auth.user.favorites}))
    }
},[auth.user] )

const scrollToTop = () => {
    window.scrollTo({ 
        top : 0 , 
        behavior: "smooth" })
}

    const handleChange = e => {
        setInfo({...info, [e.target.name]: e.target.value})
       }

const update = e => {
    setToggleEdit(!toggleEdit)
}

const updateNow = e => {
    e.preventDefault(); 
    dispatch(updateUser(auth.user._id,info))
    console.log(info)
    update();
}

    return (
        <div className="profil-div">
            { auth.user ?
               <div>
                    <div className="info-inchangable">
                        <h6> E-mail :  {auth.user.email} </h6>
                        <h6> AT :  { !auth.user.isAdmin ? "Client" : "Admin" } </h6>
                        <h6> Account Creation Date : {new Date(auth.user.created_at).toLocaleString()} </h6>
                        { !auth.user.isAdmin ? <h6>{ auth.user.isActive ? <span style={{color:"green"}}> Active Account </span> : <span style={{color: "red"}}> Your Account is Blocked by the Administarator ! </span>}</h6> : <></>}
                        <h6> FirstName :  {auth.user.firstname} </h6>
                        <h6> LastName :  {auth.user.lastname} </h6>
                        <h6> Phone Number :  {auth.user.phone} </h6>
                        <h6> Birthday :  {auth.user.birthday} </h6>
                        <h6> Address :  {auth.user.address} </h6>
                    </div>

            <div className="info-changable">
                { info && 
                <Form onSubmit ={updateNow}>
                        <div className="input-div">
                        {  !toggleEdit ? <> <Form.Label className="label"> Firstname :  </Form.Label> <Form.Control className="input-val" type ="text" name="firstname" value={info.firstname} onChange={handleChange} disabled/> </> : <><Form.Label className="label"> Firstname : </Form.Label><Form.Control className="input-val" type ="text" name="firstname" value={info.firstname} onChange={handleChange} /></>}
                        </div>
                        <div className="input-div">
                        {  !toggleEdit ? <><Form.Label className="label"> Lastname :  </Form.Label> <Form.Control className="input-val" type ="text" name="lastname" value={info.lastname} onChange={handleChange} disabled/></>: <><Form.Label className="label"> Lastname : </Form.Label><Form.Control className="input-val" type ="text" name="lastname" value={info.lastname} onChange={handleChange}/></>}
                        </div>
                        <div className="input-div">
                        {  !toggleEdit ? <><Form.Label className="label"> Phone Number : </Form.Label><Form.Control className="input-val" type ="tel" name="phone" value={info.phone} onChange={handleChange} disabled/> </>: <><Form.Label className="label"> Phone Number : </Form.Label><Form.Control className="input-val" type ="tel" name="phone" value={info.phone} onChange={handleChange}/></>}
                        </div>
                        <div className="input-div">
                        {  !toggleEdit ? <><Form.Label className="label"> Date of Birthday : </Form.Label> <Form.Control className="input-val" type ="date" name="birthday" value={info.birthday} onChange={handleChange} disabled/></>: <><Form.Label className="label"> Date of Birthday :  </Form.Label><Form.Control className="input-val" type ="date" name="birthday" value={info.birthday} onChange={handleChange}/></>}
                        </div>
                        <div className="input-div">
                        {  !toggleEdit ? <><Form.Label className="label"> Address : </Form.Label><Form.Control className="input-val" type ="text" name="address" value={info.address} onChange={handleChange} disabled/> </>: <><Form.Label className="label"> Address:  </Form.Label><Form.Control className="input-val" type ="text" name="address" value={info.address} onChange={handleChange}/></>}
                        </div>
                        { auth.user.isActive ? (!toggleEdit 
                            ? <Button className="btn" variant="dark" onClick={(e)=> {e.preventDefault(); update()}}> Update </Button> 
                            :
                            ( toggleEdit   && <Button variant="dark" type="submit" className="btn">Save</Button>)
                            ) :
                        <Button variant="danger"  className="btn">Update</Button>
                        }                
                </Form>
                       }
             </div>
             </div>  
             :
              <div className="spinner-div-profil">
                <Spinner animation="border" variant="primary" />
              </div>
            }
        </div> 
    )
}

export default Profil