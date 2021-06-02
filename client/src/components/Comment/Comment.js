import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { deleteComment, updateComment} from '../../actions/commentActions'
import {loadAnnounce} from '../../actions/announceActions'
import './Comment.css' 
import { CgProfile } from "react-icons/cg"
import { Form, ButtonGroup ,DropdownButton, Dropdown} from 'react-bootstrap';  

const Comment = ({el,announce}) => {
    const {date , user_id ,  firstname , lastname, comment, id } = el ; 
    const {_id } = announce 
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()

const [info,setInfo]= useState({
    comment
})

const [toggleEdit,setToggleEdit] = useState(false)

const handleChange = e => {
    setInfo({...info, [e.target.name]: e.target.value })}

    return (

        <div key={date} className="comment-div-user">
            <span className="commenter"><CgProfile/> {`${firstname} ${lastname}`}</span>
                { user._id===user_id ? 
                      <ButtonGroup vertical className="groupe-btn" >
                         <DropdownButton as={ButtonGroup} title="" id="bg-vertical-dropdown-3" className="drop-down" size="sm">
                           {  !toggleEdit ? 
                            <Dropdown.Item eventKey="1" onClick={()=>setToggleEdit(!toggleEdit)} >Update</Dropdown.Item>
                            :
                            <Dropdown.Item eventKey="1" onClick={()=>{dispatch(updateComment(_id,{date:date,...info})); setToggleEdit(!toggleEdit); dispatch(loadAnnounce(_id))}} >Save</Dropdown.Item>
                        }
                            <Dropdown.Item eventKey="2" onClick={()=>{dispatch(deleteComment(_id,{date}));dispatch(loadAnnounce(_id)) }} >Delete</Dropdown.Item>
                        </DropdownButton> 
                       </ButtonGroup>
                      : 
                    <div></div>
                }
                 <div className="date-post-comment">
                     <span >{new Date(date).toLocaleString()}</span>
                 </div>
                 { !toggleEdit ? 
                  <div className="comment-span"><p >{comment}</p> </div>  :
                       <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control as="textarea" rows={3} placeholder="Comment here..." name="comment" onChange={handleChange} value={info.comment}/>
                       </Form.Group>
                 }
                  </div>
    )
}

export default Comment         