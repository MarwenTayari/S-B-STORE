import React, {useEffect , useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAnnounceList , searchByTitleAdmin , filterAppNotAnnounce} from '../../actions/adminActions'
import AnnounceCart from '../AnnounceCart/AnnounceCart' 
import './Posts.css'
import { Form , Button , Spinner } from 'react-bootstrap'; 

const Posts = () => {

    const [search,setSearch] = useState({
        title : ""
    })
    const [toggle,setToggle] = useState({approuved:null})

const dispatch = useDispatch()
const announces = useSelector(state => state.admin.announces)

useEffect( ()=> {
    scrollToTop(); 
    dispatch(getAnnounceList())
},[])

const scrollToTop = () => {
    window.scrollTo({ 
        top : 0 , 
        behavior: "smooth" })
}

const handelChange = (e) => {
    setSearch( {...search,[e.target.name]:e.target.value})
   }

   const searchNow=(e)=> {
    e.preventDefault() ; 
    dispatch(searchByTitleAdmin(search))
}

const handleChangefilter =(e)=> {
    setToggle({...toggle,[e.target.name]:e.target.value})
 }
 
 const filterNow =e=> {
     e.preventDefault() 
     dispatch(filterAppNotAnnounce(toggle))
 }

    return (
        <div className="posts-div">
            <div className="search-filter-div">
            <Form inline onSubmit ={searchNow} className="form-search-users form-search-posts">
                    <Form.Control type="text" name="title"  onChange={handelChange} 
                    className="mx-sm-3"
                    id="inputPassword5" placeholder="Search for title.." />
                    <Button variant="secondary"  type="submit" className="btn-search-filter-users" id="btn-search-posts">Search</Button> 
             </Form>
             
             <Form inline onSubmit ={filterNow} className="form-filter-posts form-filter-users ">
                  <Form.Label className="my-1 mr-2"  htmlFor="inlineFormCustomSelectPref" id="label-status"> Status : </Form.Label>
                    <Form.Control as="select"  name="approuved" className="filter-users-select" id="filter-posts-select" onClick={handleChangefilter} custom>
                        <option  >Show All</option>
                        <option  value={true} >Approved</option>
                        <option  value={false}>Not Approved</option>
                     </Form.Control>
                <Button variant="secondary" type="submit" className="btn-search-filter-users" id="btn-filter-posts"> Filter </Button>
            </Form>
            </div>

        <div className="titles">
                    <h6 className="title-announce">Title :</h6>
                    <h6 className="price-announce">Price :</h6>
                    <h6 className="description-announce">Date of creation :</h6>
                    <h6 className="status-announce">Status :</h6>
                </div>
              { announces ? 
              announces.map( el => 
                <AnnounceCart  el={el} key={el._id}/> 
                )
                :
                <div className="spinner-div-users">
                   <Spinner animation="border" variant="primary" />
                </div>
                }
         </div>
    )
}

export default Posts
