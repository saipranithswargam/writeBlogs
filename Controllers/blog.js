const User = require("../model/user");
const Blog = require("../model/blogs");

exports.CreateBlog = (req,res)=>{
    const blogTitle = req.body.title;
    const blogContent = req.body.blogContent;
    const userId = req.body.userId;
    User.findByPk(userId).then(result=>{
        return result;
    }).then(user=>{
        return user.createBlog({
            blogTitle:blogTitle,
            blogContent:blogContent,
        })
    }).then(result=>{
        console.log(result);
        res.send("Blog has been created successfully !");
    })
    .catch(err=>{
        console.log(err)
    })
    res.send("blog has been composed successfully");
}