const express = require('express')
const router = express.Router()
const authMiddleware = require('../helpers/authMiddleware')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//LOAD CONNECTED USER 
router.get('/', authMiddleware , (req,res)=> {
    User.findById(req.userId)
        .select("-password")
        .then(user => {
            if(!user)  {
                return res.status(404).json({msg:'User not found !'})
            }
            res.status(200).json(user)
        })
        .catch(err => {
            console.error(err.message); 
            res.status(500).send({msg : "Server Error"});
        })
})

//LOGIN USER 
router.post("/", 
    [
    body('email', 'Please register before').isEmail(),
    body('password' , 'Please enter your password').notEmpty()
    ], (req,res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
    }
    User.findOne({email : req.body.email})
        .then(user => {
            if(!user){
                return res.status(404).json({ errors : [{msg:"Please register before"}]})
            }
            bcrypt.compare(req.body.password, user.password, (err,isMatch)=> {
                if (err) {
                    throw err; 
                } 
                else if (!isMatch) {
                    return res.status(400).json({errors : [{msg : "Wrong Password ! "}]})
                } else {
                    let payload = {
                        userId : user._id, 
                    }; 
                
                jwt.sign(payload, process.env.SECRET_KEY, (err,token)=> {
                    if(err) {
                        throw err 
                    }
                    res.send({token})
                });}
            })
        })
    })

module.exports = router