const mongoose = require('mongoose') 

const ImageSchema = mongoose.Schema ({ 
    imageName: String ,  
    created_at: {
        type : Date , 
        default : Date.now 
    }
})

module.exports = mongoose.model("Image", ImageSchema) 