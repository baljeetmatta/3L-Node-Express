const express=require("express");
const path=require("path")
const importData=require("./data")
//const bodyparser=require("body-parser");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//http.createServer((req,res)=>{
///})
//endpoints
//get,put,post,delete,all
//fetch,update,add,delete
app.listen(3000,(err)=>{
    if(err)
    console.log("Error in starting server..")
    else
    console.log("Server started");
});
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.send('Welcome to home page')

})
//  doesn't works on /about
//  /about/2
// app.get("/about/:x/pages/:y",(req,res)=>{
//    // res.send("About us page")
//   // console.log(__dirname);
// res.send("Request recieved "+req.params.x);

//   // res.sendFile(path.join(__dirname,"./public/aboutus.html"));

// })

app.post("/sendData",(req,res)=>{
const {uname,password}=req.body;
console.log(uname);

//console.log(req.body.username,req.body.password)
res.end();

})
app.get("/about",(req,res)=>{
    res.send('About us page'+req.query.name+", "+req.query.age);
    
})
app.get("/jsonData",(req,res)=>{
   // res.json({"name":"test"});
res.json(importData.Products);
})

// app.get("/style.css",(req,res)=>{
//     // res.send("About us page")
//     console.log(__dirname);
    
//     res.sendFile(path.join(__dirname,"./public/style.css"));
 
//  })
 
app.all("*",(req,res)=>{
    res.status(404).send("Page not found");

})
