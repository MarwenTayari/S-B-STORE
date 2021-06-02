const express = require ('express')
const connectDB = require ('./helpers/ConnectDB')
const cors = require('cors')

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

const PORT  = process.env.PORT || 5000     
app.listen(PORT, ()=> console.log(`The server is running on PORT : ${PORT}`))     