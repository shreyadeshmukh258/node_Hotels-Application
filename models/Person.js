const mongoose=require('mongoose');

const bcrypt=require('bcrypt');
//define the Person Schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
personSchema.pre('save', async function () {
    const person = this;

    // Hash only if password changed
    if (!person.isModified('password')) return;

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    person.password = hashedPassword;
});


personSchema.methods.comparePassword=async function(candidatePassword){
   try{
    //use bcrypt to compare
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch

   }catch(err)
   {
    throw err;
   }
}
//Create Person MOdel
const Person=mongoose.model('Person',personSchema);
module.exports=Person;