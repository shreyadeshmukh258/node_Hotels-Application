// problem 1st 

//     var prompt=require('prompt-sync')();
//     let age=prompt("Enter age: ");
//     console.log("Your age is "+age);
    
//     if(age<18)
//     {
//       console.log("you get 20% discount");
//     }
//     else if(age>=18 && age<=65)
// {
//     console.log("Normal ticket price is applied");
//     }
//     else{
//     console.log("you get 30% senoir discount");
//     }



//problem 2nd 

    //   var prompt=require('prompt-sync')();
    //   let len=prompt("Enter length :");
    //   let wid=prompt("Enter width: ");
      
    //   let area=len*wid;
    //   console.log("Area of rectangle of length "+len +" width "+wid+ " is "+area);


//Problem 3rd

        // let product1 ={
        
        //     name:"Smart Phone",
        //     price:24000,
        //     isStock:true
        // }
        // let product2 ={
        
        //     name:"Washing Machine",
        //     price:400000,
        //     isStock:true
        // }
        // let product3 ={
        
        //     name:"Study Material",
        //     price:2000,
        //     isStock:false
        // }
        // console.log(product2);
        // console.log(product3.price);

//problem 4th
let prompt=require('prompt-sync')();

let guestList=["Shreya","Dhiraj","yash","Shrutika","Piyu"];
let name=prompt("Enter name: ");

if(guestList.includes(name))
    console.log("Welcome to party");
else
    console.log("Your not invited");
