import React, {useRef} from 'react'
import Search from '../Search/Search'
import { Button , OverlayTrigger , Tooltip} from 'react-bootstrap';
import './Home.css'

const Home = () => {

    const listSection = useRef(null) ; 

    const gotoListSection = () => {
        listSection.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="Home-div" >
            <div className="animation-div" >
                <div className="block-animation">
                   <div className="body-animation">
                       <div className="typing">
                           Welcome to <span> S </span> & <span> B </span> STORE
                       </div>
                       <div className="cursor">|</div>
                    </div>
                    <div className="scroll-btn-div">
                        <OverlayTrigger
                        key='bottom'
                        placement='bottom'
                        overlay={
                          <Tooltip id='tooltip-bottom'>
                            <strong>Go to Announcements</strong>
                          </Tooltip>
                        }
                        >
                           <Button variant="outline-primary" onClick={gotoListSection} className="scroll-btn" >Check</Button>
                         </OverlayTrigger>
                    </div>
                </div> 
            </div>
            <div ref={listSection}>
                <Search />
            </div>
        </div>
    )
}

export default Home 

/*<div className="wrapper">
                    <ul className="dynamic-txts">
                        <li><span>Do you have somthing</span></li>
                        <li><span>to Buy or to Sell </span></li>
                        <li><span>You are in the right place </span></li>
                        <li><span>Here you can Buy or Sell everything you want</span></li>
                        <li><span>Welcome to Buy and Sell Store </span></li>
                    </ul>
                    <Button variant="outline-primary" onClick={gotoListSection} className="scroll-btn">Consult</Button>
               </div>*/