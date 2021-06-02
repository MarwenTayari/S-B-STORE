import React,{useState , useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addComment } from '../../actions/commentActions'
import { getFavoriteList} from '../../actions/authActions' 
import {getApprouvedAnnounce } from '../../actions/adminActions'
import {getUserOfAnnounce,loadAnnounce} from '../../actions/announceActions'
import { IoLocationSharp } from 'react-icons/io5'
import { GrMoney} from "react-icons/gr";
import './AnnounceDesc.css' 
import { AiFillPhone} from "react-icons/ai";
import { CgProfile } from "react-icons/cg"
import { Form, Button, Spinner} from 'react-bootstrap'; 
import Comment from '../Comment/Comment' 
import { v1 as uuidv1 } from 'uuid';

const AnnounceDesc = (props) => {
    const {announces} = props
    const seller = useSelector(state=> state.announce.userOfAnnounce)
    const user = useSelector(state=> state.auth.user)
    const announceComment= useSelector(state=> state.announce.announce)
    const dispatch = useDispatch()

    useEffect(()=>{
        scrollToTop();
        if (!announces){
        dispatch(getApprouvedAnnounce()); }
        
        if(!seller && announces){
        dispatch(getUserOfAnnounce(announces.filter((el) => el._id=== props.match.params.id)[0].owner))
        dispatch(loadAnnounce(props.match.params.id))
    }

    if(user)
    {setInfo(user)
        dispatch(getFavoriteList(user._id , {favorites :user.favorites}))
    }
    },[announces , user])

    const scrollToTop = () => {
        window.scrollTo({ 
            top : 0 , 
            behavior: "smooth" })
    }

const [info,setInfo]= useState({
    id: uuidv1() , 
    comment:"", 
    firstname:"", 
    lastname:"",
    user_id:"" , 
    date:"" 
})

const handleChange = e => {
    setInfo({...info, comment: e.target.value , 
                    firstname: user.firstname,
                    lastname: user.lastname, 
                    user_id: user._id, 
                    date:Date.now() , 
                    id: uuidv1() 
    })
   }

    return (
        <div className="AnnounceDesc-div">
            { announces && seller && announceComment ? announces.filter((el) => el._id=== props.match.params.id)
        .map((announce, i) =>
            (<div key={i}>   
                <div className ="container-desc">
                    <h4 className="title-desc"> Title : {announce.title}</h4> 
                    <h6 className="date-desc"> Creation date : {new Date(announce.created_at).toLocaleString()}</h6>
                        <div className="price-location">
                            <h5 className="price-desc"> <GrMoney/> {announce.price} Dt</h5>
                            <h5 className="location-desc"> <IoLocationSharp/> {announce.location} </h5>
                        </div>
                        { seller &&
                            <div> 
                           <CgProfile /> <h6 className="seller-name">{`${seller.firstname} ${seller.lastname}`}</h6>
                           <div className="seller-phone-div">
                              <AiFillPhone /> <h6 className="seller-phone">{seller.phone}</h6>
                            </div>
                        </div>}
                    <img className="img-announceDesc" src={announce.avatar} alt={announce.title}/>
                    <h4 className="desc-announceDesc" > Description : </h4> 
                    <p> {announce.description}</p>
                 </div>

                    <div className="comment-div">
                    <div>
                          {   announceComment &&
                              announceComment[0] &&
                              announceComment[0].comments.map(
                                  el => <Comment key={el.id} el={el} announce={announce}/>
                              ) 
                          }
                    </div>
                    <div className="input-div-comment">
                        <Form onSubmit={  info.comment && info.comment!==""  ? (e)=> 
                        {
                            e.preventDefault(); 
                            setInfo({...info, 
                                firstname: user.firstname,
                                lastname: user.lastname, 
                                user_id: user._id, 
                                date:Date.now() , 
                                id: uuidv1() })
                            dispatch(addComment(announce._id, info)); 
                            dispatch(loadAnnounce(announce._id))
                            setInfo({...info,comment:""})
                        } : (e)=> 
                        {
                            e.preventDefault(); 
                        }
                        }>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Control as="textarea" rows={3} placeholder="Comment here..." name="comment" onChange={handleChange} value={info.comment}/>
                            </Form.Group>
                            <Button variant="primary" className="post-comment-btn" type="submit" >Post</Button>
                        </Form>
                    </div>
                    </div>
            </div>)) :
            <div className="comments-div">
               <Spinner animation="border" variant="primary" />
            </div>
            }
        </div>
    )
}

export default AnnounceDesc