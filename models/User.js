const mongoose = require('mongoose') 

const UserSchema = mongoose.Schema ({
    firstname : String , 
    lastname : String , 
    email : String , 
    phone : Number , 
    isAdmin : {
        type : Boolean,
        default : false} , 
    birthday : String , 
    address : String , 
    password : String ,
    favorites : {
        type : Array,
        default : [] } ,   
    isActive : {
        type : Boolean,
        default : true} , 
    created_at: {
        type : Date , 
        default : Date.now 
    }
})

module.exports = mongoose.model("User", UserSchema)