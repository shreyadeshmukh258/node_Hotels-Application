const express=require('express');
const router=express.Router();

const Person=require('../models/Person');
//POST route to add person
router.post('/',async (req,res)=>{
  try{
  const data=req.body  //Assuming the request body stores person data 

  //creating new Person document using mongoose model
  const newPerson=new Person(data);

  //save the newPeson to the database
  const response=await newPerson.save();
  console.log("data saved");
  res.status(200).json(response);
   
  }
  catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Server Error'});
  }
});

//GET method to get the person details
router.get('/',async (req,res)=>{
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
router.delete('/:id',(req,res)=>{
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