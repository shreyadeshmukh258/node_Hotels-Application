import express from "express";

const app = express();

app.use(express.json()); // important for JSON data

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.get("/chiken", (req, res) => {
  res.send("Sure sir,i would love to serve chiken");
});
app.get("/idli", (req, res) => {
  res.send({
    "Name":"idli",
    "noOfIdeli":2,
    "is_sambar":true,
    "isChatani":false
  });
});

// POST API
app.post("/items",(req,res)=>{
  res.send("Data is saved");
})

app.post("/submit", (req, res) => {
  console.log(req.body); // data from frontend
  res.send("Data received");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});