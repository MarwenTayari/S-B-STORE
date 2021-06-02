const express = require ('express') 
const router = express.Router()  
const authMiddleware = require('../helpers/authMiddleware')
const Announce = require('../models/Announce')

//add comment 
router.put('/add/:id', (req,res)=> {
    Announce.findByIdAndUpdate({_id:req.params.id},{$push:{comments:req.body}},(err,msg)=> {
      err ? console.log(err) : res.json({msg:'Comment was added'})
  })
  })

//Delete comment 
router.put('/delete/:id' , (req,res)=> {
  Announce.findByIdAndUpdate({_id:req.params.id},{$pull:{comments:{date:req.body.date}}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Comment was deleted'})
})
})

//Update comment   
router.put('/update/:id' , (req,res)=> {
  Announce.findByIdAndUpdate({_id:req.params.id},{$set:{"comments.$[el].comment": req.body.comment}},{ 
    arrayFilters: [{ "el.date": req.body.date }],
    new: true
  },(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Comment was updated'})
})
})


module.exports = router