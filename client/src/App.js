import './App.css';
import React from 'react'; 
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Feed from './components/Feed/Feed'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Profil from './components/Profil/Profil'
import Users from './components/Users/Users'
import Posts from './components/Posts/Posts'  
import Myposts from './components/Myposts/Myposts'  
import Favorites from './components/Favorites/Favorites';
import AnnounceDesc from './components/AnnounceDesc/AnnounceDesc';
import Footer from './components/Footer/Footer'
import {useSelector} from  'react-redux'

function App() {
  const announces = useSelector(state=> state.admin.announces)
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/Profil" component={Profil}/>
            <PrivateRoute exact path="/feed" component={Feed}/>
            <PrivateRoute exact path="/users" component={Users}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
            <PrivateRoute exact path="/myposts" component={Myposts}/>
            <PrivateRoute exact path="/favorites" component={Favorites}/>
            <Route exact path="/announce/:id" render={(props)=><AnnounceDesc announces={announces} {...props}/>}/>
        </Switch>
        <Footer/>
      </Router> 
      </div>
  );
}

export default App;