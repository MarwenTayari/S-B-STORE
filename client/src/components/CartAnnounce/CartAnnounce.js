import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'; 
import {useDispatch, useSelector} from 'react-redux'
import {deleteAnnounce,getUserAnnouces,updateAnnounce } from '../../actions/announceActions' 
import {getFavoriteList} from '../../actions/authActions'
import { IoLocationSharp } from 'react-icons/io5'
import { TiTag } from "react-icons/ti"
import { GrMoney} from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import './CartAnnounce.css'

const CartAnnounce = ({announce }) => {

   const {title , description ,price , category , location , approuved , buyed , created_at, _id , avatar} = announce; 

const dispatch = useDispatch()
const user_id = useSelector(state=>state.auth.user._id) 
const auth = useSelector(state=>state.auth)

    const [show, setShow] = useState(false);
    const [toggleEdit,setToggleEdit] = useState(false)
    const handleClose = () => { setShow(false); setToggleEdit(false)};
    const handleShow = () => setShow(true);
    const [file,setFile] = useState(null)
    const [info,setInfo] = useState({
        title,
        description,
        price,
        category,
        location,
        approuved,
        buyed,
        avatar,
        created_at 
    })
    const [modalShow, setModalShow] = React.useState(false);

    const selectImageToUpload = e => {
        setFile(e.target.files[0]) 
    }

const handleChange = e => {
 setInfo({...info, [e.target.name]: e.target.value})
}

const update = e => {
    e.preventDefault()
    setToggleEdit(!toggleEdit)
}

const updateNow = e => { 
    e.preventDefault()
    dispatch(updateAnnounce( _id, info, file,user_id))
    setToggleEdit(!toggleEdit)
    }

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <p className="model-delete">Are you sure to delete this announce !</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={()=>{ dispatch(deleteAnnounce(_id)); dispatch(getUserAnnouces(user_id)); dispatch(getFavoriteList(auth.user._id , {favorites :auth.user.favorites}))}}>Delete</Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        <div className="cart-fav">
            <div className="div-img">
               <img src={avatar} alt="title" className="cartAnnounce_img"/>
            </div>
            <div className="info">
                    <h6> <TiTag/>  {title} </h6>
                    <h6 className="price"> <GrMoney/> {price} Dt</h6>
                    <h6 className="location"> <IoLocationSharp/> {location} </h6>
                    <div>
                      <h6 className="Status-title"> Status : </h6>
                      <h6 className="approuved"> {approuved ? "Approved" : "Not approved yet"}</h6>
                    </div>
            </div>
            {   auth.user.isActive ? 
            <div>
              <Link title="See more"><FaEye  onClick={handleShow} className="see-More-btn eye-logo"></FaEye></Link>
              <Link title="Delete"><BsFillTrashFill className="delete-btn" onClick={() => setModalShow(true)}></BsFillTrashFill></Link>
            </div> : 
            <div></div> 
            }
            <>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
            </>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Announce Details</Modal.Title>
        </Modal.Header>
        <form  >
        <Modal.Body>      
            <div>
              <div><p>Creation Date : {new Date(created_at).toLocaleString()}</p></div> 
              { !toggleEdit ? <><Form.Label>Title : </Form.Label><Form.Control type ="text" name="title" onChange={handleChange} value={info.title} disabled/> </> : <><Form.Label>Title :</Form.Label> <Form.Control type ="text" name="title" onChange={handleChange} value={info.title}/> </> }
            </div>
            <div>
               { !toggleEdit ? <><Form.Label>Description : </Form.Label><Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={info.description} disabled/> </> : <><Form.Label>Description :</Form.Label> <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={info.description}/> </> }
            </div>
            <div>
            { !toggleEdit ? <><Form.Label>Price (Dt): </Form.Label> <Form.Control type ="number"  name="price" onChange={handleChange} value={info.price} disabled/></> : <><Form.Label>Price :</Form.Label> <Form.Control type ="number"  name="price" onChange={handleChange} value={info.price}/>  </> }         
            </div>
            <div>
            { !toggleEdit ?
                 <>
                <Form.Label>Uploaded Image : </Form.Label>
                 <div className="box"><img src={avatar} alt="Image" key={Date.now()} className="img-my-post"/></div> </>   : 
                <>
                    <Form.Label>Upload Image : </Form.Label>
                    <Form.File type ="file" name="avatar" onChange={selectImageToUpload} /> 
                    <div className="box"><img src={avatar} alt="Image" key={Date.now()} className="img-my-post"/></div> 
                </>    }      
            </div>
            <div>
            { !toggleEdit ?  
                     <>
                      <Form.Label>Category : </Form.Label>
                      <Form.Control type ="text"  name="category" onChange={handleChange} value={info.category} disabled/>
                     </>
                     : 
                    <>
                        <Form.Label>Category : </Form.Label>
                        <Form.Control as="select"  name="category"  onClick={handleChange} >
                            <option  value={info.category}>{info.category}</option>
                            <option  value="Immovable">Immovable</option>
                            <option  value="Vehicles">Vehicles</option>
                            <option  value="House and equipment">House and equipment</option>
                            <option  value="IT and multimedia">IT and multimedia</option>
                            <option  value="Clothing and well-being">Clothing and well-being</option>
                        </Form.Control>
                    </>       
             }
            </div>
            <div>
            { !toggleEdit ?
                <>
                 <Form.Label >Location : </Form.Label> 
                 <Form.Control type ="text"  name="category" onChange={handleChange} value={info.location} disabled/>
                </>
                : 
                <>
                    <Form.Label >Location : </Form.Label>
                    <Form.Control as="select" name="location"  onClick={handleChange} >
                    <option  value={info.location}>{info.location}</option>
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
                </>
            }
            </div>          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ !toggleEdit ?   update :updateNow  } type="submit">
          { !toggleEdit ? "Update" : "Save" }
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
        </div>
    )
}

export default CartAnnounce
