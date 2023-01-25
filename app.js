const express = require('express');
const app = express();
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const sequalise = require("./util/database");
const homeRoutes = require('./routes/home');
const profileRoutes = require("./routes/profile")
const User = require("./model/user");
const Blog = require("./model/blogs");

Blog.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Blog)

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(homeRoutes);
app.use(profileRoutes);
sequalise.sync().then(()=>{
}).catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})
    


