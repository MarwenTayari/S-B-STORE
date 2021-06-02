const express = require ('express')
const connectDB = require ('./helpers/ConnectDB')
const cors = require('cors')
const path = require('path')

const app = express()

//connect to DataBase 
connectDB() 

/*app.options('*', cors());
middlewares  */
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static(__dirname + "/uploads"))

//Define Routes 
app.use("/register" , require('./routes/register'))
app.use("/login" , require('./routes/login'))
app.use("/update" , require('./routes/update'))
app.use("/announce" , require('./routes/announce'))
app.use("/users" , require('./routes/usersList'))
app.use("/comment" , require('./routes/comment'))

//serve a static assets if in production 
if(process.env.NODE_ENV ==='production') {
    //set static folder 
    app.use(express.static('client/build')); 

    app.get('*',(req,res) =>{
      res.sendFile(path.resolve(__dirname,'client','bulid','index.html'))
    })
}

const PORT  = process.env.PORT || 5000     
app.listen(PORT, ()=> console.log(`The server is running on PORT : ${PORT}`))     