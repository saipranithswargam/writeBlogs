const e = require("express");
const User = require("../model/user");
const Blogs = require("../model/blogs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET);
exports.CreateOrFind = (req, res) => {
    if (req.body.btnValue == "signup") {
        res.render("login_signup/login_signup", {
            title: "signup",
            forBtn: "Sign Up",
        });
    } else {
        res.render(
            res.render("login_signup/login_signup", {
                title: "Login",
                forBtn: "Login",
            })
        );
    }
};
exports.getHomePage = (req, res) => {
    res.render("home/intro");
};

exports.createNewUser = (req, res) => {
    const email = req.body.email;
    const password = cryptr.encrypt(req.body.password);
    User.findOne({ where: { email: email } })
        .then((result) => {
            if (!result) {
                User.create({ email: email, password: password }).then(
                    (result) => {
                        Blogs.findAndCountAll({ where: { userId: result.id } })
                .then((result2) => {
                    const count = result2.count;
                    const blogData = [];
                    const blogTitle = [];
                    result2.rows.forEach((blog) => {
                        blogData.push(blog.blogContent);
                        blogTitle.push(blog.blogTitle);
                    });
                    res.render("profile/profilePage", {
                        email:email,
                        userId:result.id,
                        blogData: blogData,
                        blogTitle: blogTitle,
                        count: count,
                    });
                })
                    }
                );
            } else {
                res.send(
                    "a user already exists with that gmail..try logging in"
                );
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/home");
        });
};
exports.FindUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ where: { email: email } }).then((result) => {
        const resultPassword = cryptr.decrypt(result.password);
        if (resultPassword === password) {
            Blogs.findAndCountAll({ where: { userId: result.id } })
                .then((result2) => {
                    const count = result2.count;
                    const blogData = [];
                    const blogTitle = [];
                    result2.rows.forEach((blog) => {
                        blogData.push(blog.blogContent);
                        blogTitle.push(blog.blogTitle);
                    });
                    res.render("profile/profilePage", {
                        email:email,
                        blogData: blogData,
                        blogTitle: blogTitle,
                        count: count,
                        userId:result.id,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.send("Incorret password please try again !");
        }
    });
};
