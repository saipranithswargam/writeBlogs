const User = require("../model/user");
const Blog = require("../model/blogs");
exports.CreateBlog = (req, res) => {
    const blogTitle = req.body.title;
    const blogContent = req.body.blogContent;
    const userId = req.body.userId;
    let userEmail;
    User.findByPk(userId)
        .then((result) => {
            userEmail = result.email;
            return result;
        })
        .then((user) => {
            return user.createBlog({
                blogTitle: blogTitle,
                blogContent: blogContent,
            });
        })
        .then((result) => {
            Blog.findAndCountAll({ where: { userId: userId } })
                .then((result2) => {
                    console.log(result2);
                    const count = result2.count;
                    const blogData = [];
                    const blogTitle = [];
                    result2.rows.forEach((blog) => {
                        blogData.push(blog.blogContent);
                        blogTitle.push(blog.blogTitle);
                    });
                    res.render("profile/profilePage", {
                        userId: userId,
                        email:userEmail,
                        blogData: blogData,
                        blogTitle: blogTitle,
                        count: count,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};
