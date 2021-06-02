import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-div">
               <span className="actor-span">© copyright TAYARI Marwen - 2021</span>
               <span className="address-span">43 RUE EL OMREAN- 4011 HAMMAM SOUSSE - TUNISIA </span>
               <a href="mailto:tayarimarwen@gmail.com"><i>tayarimarwen@gmail.com</i></a>
               <div classNme="contact-div">
                  <a
                    href="https://www.linkedin.com/in/marwen-tayari-28999910a/"
                    target="_blank" rel="noreferrer"
                    ><img src="https://img.icons8.com/fluent/48/000000/linkedin.png" 
                    /></a>
                    <a
                    href="https://github.com/MarwenTayari?tab=repositories" rel="noreferrer"
                    target="_blank"
                    ><img src="https://img.icons8.com/fluent/48/000000/github.png" 
                    /></a>
                    <a href="https://www.facebook.com/marwen.tayari" target="_blank" rel="noreferrer"
                    ><img src="https://img.icons8.com/color/48/000000/facebook.png" 
                    /></a>
               </div>
        </div>
    )
}

export default Footer