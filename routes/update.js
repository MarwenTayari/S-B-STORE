const express = require('express') 
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config() 

//Update User 
router.put("/user/:id",
[
    body('firstname', 'Firstname must contain only alphabetic').isString(),
    body('lastname', 'Lastname must contain only alphabetic').isString(),
    body('email', 'Please enter a valid E-mail').isEmail(),
    body('phone' , 'Phone number must contain only numbers').isNumeric(),
    body('birthday', 'Please enter a valid date').isDate(),
    body('address' , 'Please enter a valid address').isString(),
    body('password' , 'Minimum length allowed for password is 5 characters')
] ,
(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
}
  User.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'user was updated'})
})
})

//add favorite to Array 
router.put('/addfavorites/:id', (req,res)=> {
  User.findByIdAndUpdate({_id:req.params.id},{$push:{favorites:req.body._id}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Announce was added to favorites'})
})
})

//remove favorite from Array 
router.put('/removefavorites/:id', (req,res)=> {
  User.findByIdAndUpdate({_id:req.params.id},{$pull:{favorites:req.body._id}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Announce was removed from favorites'})
})
})

module.exports = router;