const mongoose = require('mongoose') 

const AnnounceSchema = mongoose.Schema ({
    owner : {
        type : mongoose.Types.ObjectId , 
        ref : "User"
    }, 
    title : String , 
    description : String , 
    price : Number, 
    approuved : Boolean,
    buyed: Boolean,
    location: String, 
    category : String ,
    avatar: String , 
    comments : {
        type : Array , 
        default : [] 
    }, 
    created_at: {
        type : Date , 
        default : Date.now 
    }
})


module.exports = mongoose.model("Announce", AnnounceSchema)