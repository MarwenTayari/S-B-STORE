import React, {useState , useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {registerUser} from '../../actions/authActions'
import './Register.css' 
import { Form, Button } from 'react-bootstrap';

const Register = ({history}) => {
 const [info,setInfo] = useState({
     firstname:"",
     lastname:"",
     email:"",
     phone: "",
     birthday:"",
     address:"",
     password:"",
 })

 const [error,setError] = useState(null)

const dispatch = useDispatch()
const auth = useSelector((state) => state.auth) 

useEffect( () => {
    scrollToTop(); 
    if(auth.isAuth){
        history.push("/")
    }
    if(auth.errors) {
       setError(auth.errors)
    }
}, [auth.isAuth, auth.errors])

const scrollToTop = () => {
    window.scrollTo({ 
        top : 0 , 
        behavior: "smooth" })
}

const handleChange = e => {
 setInfo({...info, [e.target.name]: e.target.value})
}

const registerNow = e => {
e.preventDefault()
dispatch(registerUser(info))
}

return (
    <div className="Register-div">
        <Form onSubmit ={registerNow} className="register-form">
            <div className="input-div">
                <Form.Label className="label-title"><span className="font-motif">Firstname : </span></Form.Label>
                <Form.Control type ="text" name="firstname" onChange={handleChange}/>
            </div>
            <div className="input-div">
                <Form.Label><span className="font-motif">Lastname : </span></Form.Label>
                <Form.Control type ="text" name="lastname" onChange={handleChange}/>
            </div>
            <div className="input-div">
                <Form.Label><span className="font-motif">E-mail : </span></Form.Label>
                <Form.Control type ="e-mail" name="email" onChange={handleChange}/>
            </div>
            <div className="input-div">
                <Form.Label><span className="font-motif">Password : </span></Form.Label>
                <Form.Control type ="password" name="password" onChange={handleChange}/>
            </div >
            <div className="input-div">
                <Form.Label><span className="font-motif">Phone Number : </span></Form.Label>
                <Form.Control type ="tel" name="phone" onChange={handleChange}/>
            </div>
            <div className="input-div">
                <Form.Label><span className="font-motif">Date Of Birthday : </span></Form.Label>
                <Form.Control  type ="date" name="birthday" onChange={handleChange}/>
            </div>
            <div className="input-div">
                <Form.Label><span className="font-motif">Address : </span></Form.Label>
                <Form.Control type ="text" name="address" onChange={handleChange}/>
            </div>
            <Button type="submit" variant="dark" className="btn-register" title="SignIn">SignIn</Button>   
            {error && error.map((el) => { if(el.msg!=="Please register before" && el.msg!=="Wrong Password ! " && el.msg!=="Please enter your password") 
            { return <p className="error-msg" key={Date.now()}>{el.msg}</p> }})  
            }        
        </Form>
        </div>
    )
}

export default Register