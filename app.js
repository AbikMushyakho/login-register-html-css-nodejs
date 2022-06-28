const express =require("express");
const mongoose = require("mongoose");
const app =express();
const path = require('path');
const UserRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose
    .connect('mongodb://localhost:27017')
    .then(()=>{
        console.log("Mongodb Connected!!!")
    })
    .catch(()=>{
        console.log("Database not Connected!!!")
    })

//using static 
const static_path = path.join(__dirname,'/Public')
app.use(express.static(static_path));

app.use('',UserRoutes);

app.get('/',(req, res)=> {
    res.send("Backend is working");
});



// Frontend routes
app.get('/login_register', (req, res)=> {
    res.sendFile(static_path + '/index.html');
});
app.get('/forget_password', (req, res)=> {
    res.sendFile(static_path + '/forget_pw.html');
});
app.get('/verify_code', (req, res)=> {
    res.sendFile(static_path + '/verify_code.html');
});
app.get('/change_password', (req, res)=> {
    res.sendFile(static_path + '/change_password.html');
});
app.listen(3000,()=>{
    console.log("server started on port 3000!!!");
});