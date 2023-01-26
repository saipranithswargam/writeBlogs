const User = require("../model/user");
const Blog = require("../model/blogs");
exports.CreateBlog = (req, res) => {
    const blogTitle = req.body.title;
    const blogContent = req.body.blogContent;
    const userId = req.body.userId;
    User.findByPk(userId)
        .then((result) => {
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
                    const count = result2.count;
                    const blogData = [];
                    const blogTitle = [];
                    result2.rows.forEach((blog) => {
                        blogData.push(blog.blogContent);
                        blogTitle.push(blog.blogTitle);
                    });
                    res.render("profile/profilePage", {
                        user: result,
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
