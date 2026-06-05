const express=require('express');

const app = express();
const db=require('./db');
const Person=require('./models/Person');
const MenuItem=require('./models/Menu');

require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //data stores in req.body

app.get('/', (req, res) => {
  res.send('welcome to hotel ...,how i can help you');
});


// Import router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

//use the routes
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);




// app.get('/chiken',(req,res)=>{
//   res.send('I would love to serve chiken');
// })
// app.get("/idli", (req, res) => {
//   res.send({
//     "Name":"idli",
//     "noOfIdeli":2,
//     "is_sambar":true,
//     "isChatani":false
//   });
// });

// // POST API
// app.post("/items",(req,res)=>{
//   res.send("Data is saved");
// })

// app.post("/submit", (req, res) => {
//   console.log(req.body); // data from frontend
//   res.send("Data received");
// });

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
})









// console.log("Server is running");
// let a=45;
// let b=56;
// console.log(a+b);

    // function callback(){
    //     console.log("Addition is completed");
    // };
    // const result=(a,b,callback)=>{
    //     console.log(a+b);
    //     callback();
    // }
    // result(24,56,callback);
    
    // const add=(3,4,()=>{
    //     console.log(3+4);
    //     console.log("Now in short function addition is complete")});
    // add();

//-----------importing libraries like os fs-------------------


// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user);
// console.log(user.username);
// fs.appendFile('greeting.txt','Hello '+user.username+'a',()=>{
//     console.log("I am good at backend")
// });

// console.log(os);


// const notes=require('./notes.js');
// const _=require('lodash')

// console.log(notes.age);
// console.log("age is coming from  notes.js file");

// console.log("The addition of two number = "+notes.addNumber(30,45));


// let arr=["person","person",1,23,1,23,4,"Shreya"];
// //to get unique elements in array
// let uniq=_.uniq(arr);
// console.log(uniq);



//------convert json format to object format----------
// const jsonString='{"name":"Shreya","age":20,"City":"Sangli"}';
// const jsonObject=JSON.parse(jsonString);
// console.log(jsonObject.name);