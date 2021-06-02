import React,{useState , useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {loginUser} from '../../actions/authActions'
import './Login.css'
import { Form, Button } from 'react-bootstrap';

const Login = ({history}) => {

    const [info,setInfo] = useState({
        email:"",
        password:"",
    })

    const [error,setError] = useState(null)

    const dispatch = useDispatch() 
   
   const handleChange = e => {
    setInfo({...info, [e.target.name]: e.target.value})
   }

   const login = e => {
  e.preventDefault() 
  dispatch(loginUser(info))
   }

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

    return (
        <div className="login-div">
            <Form onSubmit = {login} className="login-form">

                <div className="email-div">
                    <Form.Label><span className="font-motif">E-mail : </span></Form.Label>
                    <Form.Control type ="e-mail" name="email" onChange={handleChange} placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </div>

                <div className="password-div">
                    <Form.Label><span className="font-motif">Password : </span></Form.Label>
                    <Form.Control type ="password" name="password" onChange={handleChange} placeholder="Password"/>
                </div>  

                <Button variant="dark" type="submit" className="btn-login" title="Login">Login</Button>  
                {error && error.map((el) => { if(el.msg!=="Please enter a valid E-mail" && el.msg!=="Phone number must contain only numbers" && el.msg!=="Please enter a valid date" && el.msg!=="Minimum length allowed for password is 5 characters") 
            { return <p className="error-msg" key={Date.now()}>{el.msg}</p> }})  
            } 
            </Form>
        </div>
    )
}

export default Login
