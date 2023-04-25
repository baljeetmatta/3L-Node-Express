const express=require("express");
const app=express();
const sessions=require("express-session");
const cookieParser=require("cookie-parser");

const path=require("path");

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const day=1000*60*60*24;
app.use(sessions({
    secret:'kjhsd@78@!02',
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:day}

}));

app.use(express.json());

app.get("/dashboard.html",(req,res,next)=>{

    if(req.session.username==null)
    res.redirect("/login");
    else
    next();


})

app.use(express.static("public"))

app.post("/login",(req,res)=>{

if(req.body.username==req.body.password)
{
    req.session.username=req.body.username;
    res.redirect("/dashboard");

}
else
res.redirect("/login");

//console.log(req.body);
//res.end();


});

app.get("/dashboard",(req,res)=>{

    if(req.session.username!=null)
    res.sendFile(path.join(__dirname,"./public/dashboard.html"));
    else
    res.redirect("/login");


})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");


})


app.get("/login",(req,res)=>{

    res.sendFile(path.join(__dirname,"./public/login.html"));

})



app.listen(3000,(err)=>{

    if(err)
    console.log("Error in starting server");
    else
    console.log("Server Started...");

});