const express= require('express')
const app=express()
const postRoutes= require('./routes/post');
const authRoutes= require('./routes/auth');
const userRoutes= require('./routes/user');
const fs=require('fs')
const morgan=require('morgan');
// import mongoose
const mongoose = require('mongoose');
const cors=require('cors') 
// load env variables
const expressValidator= require('express-validator');
const dotenv = require('dotenv');
dotenv.config()
 
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser'); 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});
app.get('/',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err){
      res.status(400).json({
        error:err
      });
    }
    const docs=JSON.parse(data);
    res.json(docs);
  });
});

//apiDocs


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors()); // used so as to allow cors cross origin resource sharing as node running on port 8080 and frontend on 30000
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function(err,req,res,next){
    if(err.name==="UnauthorizedError"){
        res.status(401).json({error:"Unauthorised access"});
    }
});
const port=8080;
app.listen(port, ()=>{console.log(`A NODE JS API IS listening on port : ${port}`);
});



/*

use cookie-parser and install it to accesss token to see if user is logged in or not
express-jwt is installed to check if user is signed in and  the jsonweb token is valid or not so that protected routes are not allowed to be accessed by people
*/