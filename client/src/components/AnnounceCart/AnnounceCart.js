import React,{useState} from 'react'
import {toggleApprouved, deleteAnnounce} from '../../actions/adminActions'
import {useDispatch, useSelector} from 'react-redux' 
import { Link } from 'react-router-dom'
import {getUserOfAnnounce} from '../../actions/announceActions'
import {  Button , Modal} from 'react-bootstrap';  
import './AnnounceCart.css' 
import { FaEye } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

const AnnounceCart = ({el}) => {
    const dispatch = useDispatch()
    const client = useSelector(state=>state.announce.userOfAnnounce)
    const {title , description ,_id ,price, avatar, approuved , created_at, owner , category , location} = el
    const [toggle,setToggle]=useState({
        approuved})
    const [modalShow, setModalShow] = React.useState(false);

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

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
                <Button variant="danger" onClick={()=> {dispatch(deleteAnnounce(_id))}}>Delete</Button>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
        }


    return (
        <div className={ !toggle.approuved ? "Announce-div-unap" : "Announce-div-ap"}>
            <span className="title">{title}</span>
            <span className="price-an">{price} Dt</span>
            <span className="created_at">{new Date(created_at).toLocaleString()}</span>
            { <span className="approuved-post">{ !toggle.approuved ? "Not Approved" : "Approved"}</span> } 
              <Link title="See more"><FaEye className="show-post"  onClick={()=> {handleShow() ;dispatch(getUserOfAnnounce(owner))}}></FaEye></Link>
              <Link title="Delete"><BsFillTrashFill className="delete-post"  onClick={() => setModalShow(true)}></BsFillTrashFill></Link>
              <Button title="Approve announce" variant={ !toggle.approuved ? "success" : "warning" } className="posts-btn" onClick={()=> {setToggle({...toggle,approuved:!toggle.approuved}) ; dispatch(toggleApprouved(_id, toggle))}}>
                  { !toggle.approuved ? "Approve" : "Unapprove" }
              </Button>
              <>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="announce-title">Announce Title : {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className="announce-info">
                    <div className="img-div">
                      <img src={avatar} alt={title} className="cartAnnounce_img"/>
                    </div>
                    <div className="info-ann">
                        <h6 className="title-motif"> Creation date : </h6> <p className="uni-p">{new Date(created_at).toLocaleString()}</p>
                        <h6 className="title-motif"> Description : </h6> <p className="uni-p">{description}</p>
                        <h6 className="title-motif"> Price :</h6> <p className="uni-p"> {price} Dt</p>
                        <h6 className="title-motif"> Category : </h6> <p className="uni-p">{category}</p>
                        <h6 className="title-motif"> Location : </h6> <p className="uni-p">{location}</p>
                    </div>
                </div>
               { client && 
               <div className="client-info">
                    <h6 className="title-motif">The Seller : </h6>
                    <p className="uni-p"> Firstname : {client.firstname}</p>
                    <p className="client-lastName"> Lastname : {client.lastname}</p>
                    <p className="client-lastName"> Phone number : {client.phone}</p>
                    <p className="uni-p"> E-mail : {client.email}</p>
                </div>}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AnnounceCart