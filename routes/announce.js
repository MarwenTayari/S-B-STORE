const express = require ('express') 
const router = express.Router()  
const authMiddleware = require('../helpers/authMiddleware')
const Announce = require('../models/Announce')
//const Image = require('../models/Image')
const multer = require('multer')

//upload image 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
/*
router.post('/image', upload.single("avatar"), (req,res)=>{
    let path = req.protocol + "://" + req.hostname + ":" + 5000 + "/uploads/" + req.file.filename ; 
    let newImage = new Image({imageName : path})
    newImage.save()
     .then(img => res.status(201).send(img))
     .catch( err => { 
         console.error(err.message);
         res.status(500).send("Server Error")
     })
})
*/
//Add new Announce 
router.post('/' , [authMiddleware, upload.single('avatar')] , (req,res)=> {
    let path = req.protocol + "://" + req.hostname + ":" + 5000 + "/uploads/" + req.file.filename ; 
    let myBody = JSON.parse(req.body.info)
    let newAnnounce = new Announce({...myBody, owner : req.userId, avatar: path})
        newAnnounce.save().then(post => res.status(201).send(post))
})

//Get announces by seller (user) id
router.get('/:owner',authMiddleware , (req,res)=> {
    Announce.find({owner:req.params.owner})
    .then(announces => res.send(announces))
    .catch((err) => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"})
    })
 })

//Get all announces for Admin (approuved : false/true)  
router.get('/approuved/getAll', authMiddleware , (req,res)=> {
    Announce.find()
    .then(data => res.send(data))
    .catch((err) => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"})
    })
 })

 //Get announces  (approuved : true) , authMiddleware  
router.get('/approuved/true', (req,res)=> {
    Announce.find({approuved : true})
    .then(data => res.send(data))    
    .catch((err) => {
        console.error(err.message); 
        res.status(500).send({msg : "Server Error"})
    })
 })

//Toggle announce to approuve 
router.put('/toggle/:id',authMiddleware,(req,res)=> {
    let toggle = !req.body.approuved
    Announce.findOneAndUpdate({_id:req.params.id},{$set:{approuved:toggle}},(err,msg)=> {
       err ? console.log(err) : res.json({msg:'approuved was Toggled'})})
    })

 //Get Seller announces 
 router.get('/SellerAnnouncements', authMiddleware , (req,res)=> {
    Announce.find({ owner : req.userId})
     .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })
 })

//Delete Announce by id 
router.delete('/delete/:id',authMiddleware,(req,res)=> {
    Announce.findByIdAndDelete({_id:req.params.id}, (msg)=> {
         res.json({msg:'Announce was deleted.'})
    }).catch((err) => {
        res.status(500).send({msg : "Server Error"})
    })
})

//Update Announce 
router.put('/update/:id' , [authMiddleware, upload.single('avatar')] , (req,res)=> {
    if (req.file) {
    let path = req.protocol + "://" + req.hostname + ":" + 5000 + "/uploads/" + req.file.filename ;
    let myBody = JSON.parse(req.body.info)
    Announce.findByIdAndUpdate({_id:req.params.id},{$set:{...myBody, avatar: path}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Announce was updated'})
})}
 else {
    let myBody = JSON.parse(req.body.info)
    Announce.findByIdAndUpdate({_id:req.params.id},{$set:{...myBody}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Announce was updated'})
 
})}})

 //Get the favorites announces list 
 router.get('/favoritesList/:id', authMiddleware , (req,res)=> {
    Announce.find({ _id : req.query.favorites})
     .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })
 })

//Get (Search) announces by title , category , location with approuved true 
router.get('/filter/announces', (req,res)=> {
   if(req.query.category==="" && req.query.location===""){
    Announce.find({$and:[{approuved:true}]})
    .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })
   }   
    else if(req.query.location==="" && req.query.category!=="")
     {Announce.find({$and:[{approuved:true},{category:req.query.category}]})
    .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })} 
     else if (req.query.location!=="" && req.query.category==="")
     {Announce.find({$and:[{approuved:true},{location:req.query.location}]})
    .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })} 
     else 
     {
     Announce.find({$and:[{approuved:true},{location:req.query.location},{category:req.query.category}]})
    .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })}
})

//To get announes (search by title)
router.get('/search/announces', (req,res)=> {
     Announce.find({$and:[{approuved:true},{title:{$regex:req.query.title,$options: 'i'}}]})
     .then((announcements)=> res.send(announcements))
      .catch((err) => {
          console.error(err.message); 
          res.status(500).send({msg : "Server Error"})
      })
    }) 

//To get announes (search by title) for admin 
router.get('/search/admin', (req,res)=> {
    Announce.find({title:{$regex:req.query.title,$options: 'i'}})
    .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })
   })

//To get announes (filter by Approuved/Not)
router.get('/filter/appNot', (req,res)=> {
    if(req.query.approuved==="Show All"){
        Announce.find()
        .then((announcements)=> res.send(announcements))
         .catch((err) => {
             console.error(err.message); 
             res.status(500).send({msg : "Server Error"})
         })
    } else 
    Announce.find({approuved:req.query.approuved})
    .then((announcements)=> res.send(announcements))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })
   }) 

//To load announce 
router.get('/load/:id', (req,res)=> {
    Announce.find({ _id : req.params.id})
    .then((announce)=> res.send(announce))
     .catch((err) => {
         console.error(err.message); 
         res.status(500).send({msg : "Server Error"})
     })
   }) 

module.exports = router 

