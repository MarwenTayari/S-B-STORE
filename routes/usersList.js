const express = require('express')
const router = express.Router()
const authMiddleware = require('../helpers/authMiddleware')
const User = require('../models/User')

//Get all users (for Admin)
router.get('/',authMiddleware,(req,res)=> {
    User.find({isAdmin:false}) 
        .then(data => {
        res.send(data)
         })
    .catch(err => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"});
    })
}) 

//To Toggle isActive for user (for Admin) 
router.put('/toggle/:id',authMiddleware,(req,res)=> {
     let toggle = !req.body.isActive 
    User.findOneAndUpdate({_id:req.params.id},{$set:{isActive:toggle}},(err,msg)=> {
        err ? console.log(err) : res.json({msg:'isActive was Toggled'})})
     })

//To get user of Announce 
router.get('/:id', (req,res)=> {
    User.findById({_id:req.params.id}).then(data => {
        res.send(data)
         })
    .catch(err => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"});
    })
}) 

//To search for users   {$and:[{approuved:true},{title:{$regex:req.query.title,$options: 'i'}}]}     , {lastname:{$regex:req.body.name,$options: 'i'}}
router.get('/name/search',(req,res)=> {
    User.find({$and:[{isAdmin:false},{$or:[{firstname:{$regex:req.query.name,$options: 'i'}}, {lastname:{$regex:req.query.name,$options: 'i'}}]} ]}) 
        .then(data => {
        res.send(data)
         })
    .catch(err => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"});
    })
}) 

//To filter users 
router.get('/name/filter',(req,res)=> {
    if(req.query.isActive==="Show All")
        {   User.find({isAdmin:false}) 
            .then(data => {
            res.send(data)
            })
            .catch(err => {
            console.error(err.message); 
            res.status(500).send({msg : "Server Error"});
            })
        }
   else 
    User.find({$and:[{isAdmin:false},{isActive:req.query.isActive}]}) 
        .then(data => {
        res.send(data)
         })
    .catch(err => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"});
    })
}) 

module.exports = router