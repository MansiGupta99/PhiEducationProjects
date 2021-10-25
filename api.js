const express = require("express");
const app = express();
require("dotenv/config");
var bodyparser = require("body-parser");
var path = require('path')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));
const sequelize = require("./models/config");
const contactMe = require("./routes/ContactMe");
const user = require("./routes/User");
const { database } = require("./models/modelExport.js");
database.sequelize.sync();

app.set('views', './views')
app.set('view engine', 'ejs')
app.use("/api",contactMe);
app.use("/api", user);

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/homePage.html')    
});

app.get("/adminLogin",(req,res)=>{
    res.sendFile(__dirname + '/views/adminLogin.html')
  });

 
app.listen(3000,console.log('Server running on PORT : 3000'))

