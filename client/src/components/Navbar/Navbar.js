import React, { useEffect , useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux' 
import {loadUser, logout} from '../../actions/authActions'
import { FaHeart  } from "react-icons/fa";
import Logo from "./logo/logo2.jpg"

const Navbar = () => {
    const auth = useSelector((state)=> state.auth)
    const dispatch = useDispatch()

    const [isMobile,setIsMobile] = useState(false)

useEffect(()=> {
    if (auth.isAuth)
    {dispatch(loadUser())
}     
  },[auth.isAuth]) 

  if (!auth.user){
    return (
        <div className="header">
            <div className="navbar-div">
             <nav className="navbar"> 
             <div className="logo-div">
              <Link to="/" title="Go to home">
                 <img className="logo" src={Logo} alt="logo"/>
              </Link>   
             </div>               
                   <ul className={ isMobile ? "nav-links-mobile" : "nav-links" } 
                    onClick={()=> setIsMobile(false) }
                   >
                        <Link to="/" className="motif" title="Go to home">
                            <li>Home</li>
                        </Link>  
                        <Link to="/login" className="motif" title="Go to Login"> 
                            <li>Login</li>
                        </Link>
                        <Link to="/register" className="motif" title="Go to Singin">
                             <li>Signin</li>
                        </Link> 
                    </ul>
                <button className="mobile-menu-icon"
                 onClick={()=> setIsMobile(!isMobile) }
                >
                    { isMobile ? (<i className="fas fa-times"> </i> ) 
                    : 
                                 (<i className="fas fa-bars"> </i> )
                    }
                </button>
              </nav>
            </div>
        </div>
    )
}
else {
    if(auth.user.isAdmin){
        return (
                <div className="header">
                   <div className="navbar-div">
                   <nav className="navbar">
                        <Link to="/" title="Go to Home">
                          <img className="logo" src={Logo} alt="logo"/>
                        </Link>
                   <ul className={ isMobile ? "nav-links-mobile" : "nav-links" } 
                    onClick={()=> setIsMobile(false) }
                   >
                        <Link to="/Profil" className="motif" title={`${auth.user.firstname} ${auth.user.lastname}`}><li><i class="fa fa-user"></i></li></Link>
                        <Link to="/" className="motif" title="Go to Home"><li>Home</li></Link>
                        <Link to="/users" className="motif" title="Go to Users"> <li>Users</li></Link>
                        <Link to="/posts" className="motif" title="Go to Posts"> <li>Posts</li></Link>
                        <Link to='' onClick={() => dispatch(logout())} className="motif" title="Logout"><li>Logout</li></Link>
                    </ul>

                    <button className="mobile-menu-icon"
                            onClick={()=> setIsMobile(!isMobile) }
                            >
                                { isMobile ? (<i className="fas fa-times"> </i> ) 
                                : 
                                            (<i className="fas fa-bars"> </i> )
                                }
                    </button>
                    </nav>
                   </div> 
                </div>
        )
    }
    if(!auth.user.isAdmin){
        return (
          <div className="header">
             <div className="navbar-div">
                <nav className="navbar">
                       <Link to="/" title="Go to Home">
                         <img className="logo" src={Logo} alt="logo"/>
                        </Link>
                <ul className={ isMobile ? "nav-links-mobile" : "nav-links" } 
                    onClick={()=> setIsMobile(false) }
                   >
                        <Link to="/Profil" className="motif" title={`${auth.user.firstname} ${auth.user.lastname}`}><li><i class="fa fa-user"></i></li></Link>
                        <Link to="/" className="motif" title="Go to Home"><li>Home</li></Link>
                        <Link to="/myposts" className="motif" title="Go to My Posts"> <li>My posts</li></Link>
                        <Link to="/favorites" className="motif" title="Go to my Favorites"> <li>Favorites ({auth.favorites ? auth.favorites.length : 0} x <FaHeart className="heart-red"/>)</li></Link>
                        
                        <Link to='' onClick={() => dispatch(logout())} className="motif" title="Logout"> <li>Logout</li></Link>
                </ul> 
                <button className="mobile-menu-icon"
                            onClick={()=> setIsMobile(!isMobile) }
                            >
                                { isMobile ? (<i className="fas fa-times"> </i> ) 
                                : 
                                            (<i className="fas fa-bars"> </i> )
                                }
                </button>
                </nav>
              </div>
            </div>
        )
    }
}
}

export default Navbar