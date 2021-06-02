import React from 'react'
import './AnnounceList.css';
import { Spinner} from 'react-bootstrap';

import ApprouvedCart from '../ApprouvedCart/ApprouvedCart'

const AnnounceList = ({announces}) => {

    return (
        <div className="container">  
             { announces ? announces.map( 
                el => <ApprouvedCart el={el} key={el._id}/> 
            ) :
            <div className="spinner-div">
               <Spinner animation="border" variant="primary" />
            </div>
            }
        </div>
    )
}

export default AnnounceList
