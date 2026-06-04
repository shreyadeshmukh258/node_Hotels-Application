const express=require('express');
const router=express.Router();

const MenuItem=require('../models/Menu');

router.post('/',async (req,res)=>{
  try{
    const data=req.body
    const newItem=new MenuItem(data);
    const response=await newItem.save();
    console.log("data saved");
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

router.get('/',async (req,res)=>{
  try{
   const data=await MenuItem.find();
   console.log("Data fetched");
   res.status(200).json(data);
  }catch(err){
   console.log(err);
   res.status(500).json({error:'Internal Servr error'});
  }
})

router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='sweet'||tasteType=='spicy'||tasteType=='sour')
        {
          const response=await MenuItem.find({taste : tasteType}) ;
          console.log("Response fetched");
          res.status(200).json(response);
        }else{
          res.status(404).json({Error:'invalid tasteType'});
        }

    }catch(err){
       console.log(err);
       res.status(500).json({error:'Internal server error'});
    }
})

//here we export router
module.exports=router;

