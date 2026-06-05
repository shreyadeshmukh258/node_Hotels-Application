const mongoose=require('mongoose');

//define the mongoDB connection URL
//local mongodb url

const mongoURL='mongodb://localhost:27017/hotels';

//const mongoURL='mongodb+srv://shreyadeshmukh258_db_user:Shrey%40123@cluster0.lsxhww9.mongodb.net/hotel'

//
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