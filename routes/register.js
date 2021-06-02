const express = require('express') 
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config() 

//Register User 
router.post("/",
[
    body('firstname', 'Firstname must contain only alphabetic').isString(),
    body('lastname', 'Lastname must contain only alphabetic').isString(),
    body('email', 'Please enter a valid E-mail').isEmail(),
    body('phone' , 'Phone number must contain only numbers').isNumeric(),
    body('birthday', 'Please enter a valid date').isDate(),
    body('address' , 'Please enter a valid address').isString(),
    body('password' , 'Minimum length allowed for password is 5 characters').isLength({ min: 5 })
] ,
(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
}

  User.find({email: req.body.email})
      .then( users => {
        if (users.length){
            return res.status(400).send({errors : [{msg : "User already exists!"}]})
        } 

    let newUser = new User(req.body)
    bcrypt.genSalt(10,(err,salt) => {
        if(err) {
            throw err
        }
    bcrypt.hash(req.body.password,salt,(err,hashedPwd)=> {
            if(err){
                throw err
            }
            newUser.password = hashedPwd;
            
            newUser.save();

            let payload =  {
                userId : newUser._id
            }

            jwt.sign(payload,process.env.SECRET_KEY, (err,token)=> {
                if (err){
                    throw err
                }
                res.send({token})
            })
        });
    });
  })
})

module.exports = router;