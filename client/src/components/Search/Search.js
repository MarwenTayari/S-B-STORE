import React,{useState, useEffect} from 'react'
import AnnounceList from '../AnnounceList/AnnounceList'
import {getApprouvedAnnounce , filterAnnounces , searchByTitle} from '../../actions/adminActions'
import {  getFavoriteList} from '../../actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import './Search.css'
import { Button , Form , Col } from 'react-bootstrap';

const Search = () => {
    const dispatch = useDispatch()
    const announces = useSelector(state=> state.admin.announces) 
    const auth = useSelector(state=> state.auth)

    const [search,setSearch] = useState({
        title : ""
    })

    const [info,setInfo] = useState({
        category: "",
        location:"",
    })

    const handleChangefilter = e => {
        setInfo({...info, [e.target.name]: e.target.value})
       }

const handelChange = (e) => {
    setSearch( {...search,[e.target.name]:e.target.value})
   }

useEffect( () => {
    dispatch(getApprouvedAnnounce()); 
    if (auth.user){
        dispatch(getFavoriteList(auth.user._id , {favorites :auth.user.favorites}))
    }
},[auth.user])

const filterNow=(e)=> {
    e.preventDefault() ; 
    dispatch(filterAnnounces(info))
}

const searchNow=(e)=> {
    e.preventDefault() ; 
    dispatch(searchByTitle(search))  
}

    return (
        <div className ="search-body">
          <div className="search-filter">
            <div className="search-title-div" >
                    <Form onSubmit ={searchNow} className="search-title-form">
                      <Form.Row>
                        <Col xs={7}>
                          <Form.Control type="text" name="title"  onChange={handelChange} className="search-title-input" placeholder="Search by title..." />
                        </Col>
                          <Button variant="secondary" className="search-btn" type="submit">Search</Button>
                       </Form.Row>
                    </Form>
            </div>

            <div className="filter-div">
             <Form  onSubmit ={filterNow} className="filter-form">
                <div className="filter-div-category">
                    <Form.Row>
                    <Col xs={10}>
                        <Form.Control as="select"  name="category"  onClick={handleChangefilter} className="search-category-input" custom>
                            <option  value="">Show All Categories</option>
                            <option  value="Immovable">Immovable</option>
                            <option  value="Vehicles">Vehicles</option>
                            <option  value="House and equipment">House and equipment</option>
                            <option  value="IT and multimedia">IT and multimedia</option>
                            <option  value="Clothing and well-being">Clothing and well-being</option>
                        </Form.Control>
                        </Col>
                    </Form.Row>
                </div>

                <div className="filter-div-location">
                    <Form.Row>
                    <Col xs={8}>
                    <Form.Control as="select"  name="location"  onClick={handleChangefilter} className="search-location-input" custom>
                                <option  value="">Show All Locations</option>
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
                    </Col>
                    <Button variant="secondary" type="submit" className="search-btn"> Filter </Button>
                    </Form.Row>
                </div>
            </Form>
            </div>
            </div>
              <AnnounceList announces={announces}/>
        </div>
    )
}

export default Search