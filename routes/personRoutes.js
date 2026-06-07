const express=require('express');
const router=express.Router();

const Person=require('../models/Person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

//POST route to add person
router.post('/signup',async (req,res)=>{
  try{
  const data=req.body  //Assuming the request body stores person data 

  //creating new Person document using mongoose model
  const newPerson=new Person(data);

  //save the newPeson to the database
  const response=await newPerson.save();
  console.log("data saved");

  const payload={
    id:response.id,
    username:response.username
  }
   
  const token=generateToken(payload,process.env.JWT_SECRET);
  console.log("Token is :",token);

  res.status(200).json({response:response,token:token});
   
  }
  catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});
  }
});

//Login route
router.post('/login',async (req,res)=>{
  try{

   //Extract username and password from request body
   const {username,password}=req.body;

   //Find the user by username
   const user=await Person.findOne({username:username});

   if(!user || await !user.comparePassword(password))
    return res.status(401).json({error:'Invalid username or password'});


  //generate token
  const payload={
    id:user.id,
    username:user.username
  }

  const token=generateToken(payload,process.env.JWT_SECRET);

  //return token as response
  res.json({token})

  }catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});
  }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
   try{
    const userData=req.user;
    console.log("User Data :",userData);

    const userid=userData.id;
    const user=await Person.findOne(userid);

    res.status(200).json({user})

   }catch(err){
  console.log(err);
   res.status(500).json({error:'Internal Server Error'});
   }
})

//GET method to get the person details
router.get('/',jwtAuthMiddleware,async (req,res)=>{
  try{
   const data=await Person.find();
   console.log("Data fetched");
   res.status(200).json(data);
  }catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Servr error'});
  }
})

router.get('/:workType',async (req,res)=>{
  try{
  const workType=req.params.workType;  //Extract the workType from URL parameter

  if(workType=='chef'||workType=='manager'||workType=='waiter')
  {
      const response=await Person.find({work : workType}) ;
      console.log("Response fetched");
      res.status(200).json(response);
  }
  else{
    res.status(404).json({Error:'invalid workType'});
  }
  }catch(err){
     console.log(err);
     res.status(500).json({error:'Internal Servr error'}); 

  }
})

//udate data
router.put('/:id',async (req,res)=>{
    try{
      const person_id=req.params.id;
      const updatePersonData=req.body; //update data for person

      const response=await Person.findByIdAndUpdate(person_id,updatePersonData,{
        new:true , // Return the update document
        runValidators:true ,  //Run mongoose validation
      });

      if(!response)
      {
        return res.status(404).json({Error:'Not Found'});
      }
      console.log("Data Updated");
      res.status(200).json(response);


    }catch(err){
        console.log(err);
     res.status(500).json({error:'Internal Server error'}); 

    }
})

//deletion of data
router.delete('/:id',async (req,res)=>{
    try{
    const person_id=req.params.id;

    //Assuming you have a person model
    const response=await Person.findByIdAndRemove(person_id);
    if(!response)
      {
        return res.status(404).json({Error:'Not Found'});
      }
      console.log("Person deleted");
      res.status(200).json({message:'Person Deleted Successfully'});


    }catch(err){
    console.log(err);
     res.status(500).json({error:'Internal Server error'}); 

    }
})

module.exports=router;