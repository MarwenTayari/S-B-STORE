import React,{useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal , Form , Spinner} from 'react-bootstrap'; 
import {useDispatch, useSelector} from 'react-redux'; 
import {  getFavoriteList} from '../../actions/authActions'
import {addAnnounce, getUserAnnouces} from '../../actions/announceActions'
import CartAnnounce from '../CartAnnounce/CartAnnounce' 
import './Myposts.css'

const Myposts = () => {
   const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const state = useSelector(state=>state)

useEffect(()=> {
    scrollToTop()
    if(state.auth.user)
    {dispatch(getUserAnnouces(state.auth.user._id))}
    if (state.auth.user){
        dispatch(getFavoriteList(state.auth.user._id , {favorites :state.auth.user.favorites}))
    }
},[state.auth.user])

    const scrollToTop = () => {
        window.scrollTo({ 
            top : 0 , 
            behavior: "smooth" })
    }

    const [file,setFile] = useState(null)
    const [info,setInfo] = useState({
        title:"",
        description:"",
        price:"",
        category: "",
        location:"",
        approuved : false,
        buyed: false, 
    })

const handleChange = e => {
 setInfo({...info, [e.target.name]: e.target.value})
}

const selectImageToUpload = e => {
    setFile(e.target.files[0])
}

const addNow = e => { 
    e.preventDefault()
    dispatch(addAnnounce(info,file,state.auth.user._id))
    }

    return (
        <div className="myposts-div" >
            { state.auth.user && 
            <div>
            <div className="add-btn-div">
                {   state.auth.user.isActive ? 
                    <Button className="add-btn" variant="success" onClick={handleShow} >
                    + Create Announce
                    </Button>  : 
                    <Button  variant="danger" className="add-btn">
                        + Create Announce
                    </Button> 
                }
           </div>
           {  state.announce.announces ?
            <div className="mapping-myposts">
              {
              state.announce.announces && state.announce.announces.length!==0 ?
              state.announce.announces.map(announce => <CartAnnounce announce={announce} key={announce.created_at}/>)
              : 
                <div className="myposts-empty">
                   <h2 className="empty-myposts-info">Your Posts list is empty </h2>
                </div>
              }
            </div>
              : 
              <div className="spinner-div-myposts">
                <Spinner animation="border" variant="primary" />
              </div>
        }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Announce</Modal.Title>
        </Modal.Header>
        <Form onSubmit ={addNow} >
        <Modal.Body>      
            <div>
                <Form.Label>Title : </Form.Label>
                <Form.Control type ="text" name="title" onChange={handleChange}/>
            </div>
            <div>
                <Form.Label>Description : </Form.Label>
                <Form.Control as="textarea" name="description" onChange={handleChange}/>
            </div>
            <div>
                <Form.Label>Price (Dt) : </Form.Label>
                <Form.Control type ="number" name="price" onChange={handleChange}/>         
            </div>
            <div>
                <Form.Label className="labels-title" >Upload Image : </Form.Label>
                <Form.File  name="avatar" onChange={selectImageToUpload} />          
            </div>
            <div>
                <Form.Label className="labels-title">Category : </Form.Label>
                    <Form.Control as="select"  name="category"  onClick={handleChange}>
                        <option  value=""></option>
                        <option  value="Immovable">Immovable</option>
                        <option  value="Vehicles">Vehicles</option>
                        <option  value="House and equipment">House and equipment</option>
                        <option  value="IT and multimedia">IT and multimedia</option>
                        <option  value="Clothing and well-being">Clothing and well-being</option>
                    </Form.Control>
            </div>
            <div>
                <Form.Label className="labels-title">Location : </Form.Label>
                <Form.Control as="select"  name="location"  onClick={handleChange}>
                    <option  value=""></option>
                    <option  value="Ariana">Ariana</option>
                    <option  value="Ben Arous">Ben Arous</option>
                    <option  value="Bizerte">Bizerte</option>
                    <option  value="Beja">Beja</option>
                    <option  value="Gabes">Gabes</option>
                    <option  value="Gafsa">Gafsa</option>
                    <option  value="Jendouba">Jendouba</option>
                    <option  value="Kairouan">Kairouan</option>
                    <option  value="Kasserine">Kasserine</option>
                    <option  value="Kebeli">Kebeli</option>
                    <option  value="Manouba">Manouba</option>
                    <option  value="Kef">Kef</option>
                    <option  value="Mahdia">Mahdia</option>
                    <option  value="Monastir">Monastir</option>
                    <option  value="Mednine">Mednine</option>
                    <option  value="Nabeul">Nabeul</option>
                    <option  value="Sfax">Sfax</option>
                    <option  value="Sidi Bouzid">Sidi Bouzid</option>
                    <option  value="Siliana">Siliana</option>
                    <option  value="Sousse">Sousse</option>
                    <option  value="Tataouin">Tataouin</option>
                    <option  value="Tozeur">Tozeur</option>
                    <option  value="Tunis">Tunis</option>
                    <option  value="Zaghouan">Zaghouan</option>
                </Form.Control>
            </div>          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=> {handleClose()}} type="submit">
          Add
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
    }
        </div>
    )
}

export default Myposts
