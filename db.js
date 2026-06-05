const mongoose=require('mongoose');

//define the mongoDB connection URL
//local mongodb url
//MONGODB_URL_LOCAL='mongodb://localhost:27017/hotels';
const mongoURL=process.env.MONGODB_URL;

//set up the mongodb connection
mongoose.connect(mongoURL);

//Get default connection 
//Mongooose maintain default connection object represeting the mongodb connection
const db=mongoose.connection;

//Define event listers for database connection
db.on('connected',()=>{
    console.log("Connected to mongodb server");
})

db.on('error',(err)=>{
    console.log("Connection error",err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//Export database connection
module.exports =db;