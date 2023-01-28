const express = require('express');
const Router = express.Router();
const BlogController  = require("../Controllers/blog")
Router.post("/compose",(req,res)=>{
    console.log(req.body.userId)
    res.render("blogs/compose",{userId:req.body.userId})
})

Router.post("/composedPost",BlogController.CreateBlog);

Router.post("/deleteBlog",BlogController.deleteBlog);

module.exports = Router;