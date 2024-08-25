const mongoose = require("mongoose");
// const {checkUser} = require("../middlewares/checkUser");
const {checkUser} = require("../middlewares/requireLogin")
const cleanCache = require("../middlewares/cleanCache");

const Blog = mongoose.model("Blog");

module.exports = (app) => {
    app.get("/api/blogs", checkUser, async (req, res) => {
        const blogs = await Blog.find().cache({
            cacheValuekey: req.user._id,
        });
        res.send(blogs);
    });

    app.get("/api/blog/:id", checkUser, async (req, res) => {
        
        const blog = await Blog.findOne({
            _id: req.params.id,
        })

        res.send(blog);
    });

    app.post("/api/blog", checkUser, cleanCache, async (req, res) => {
        const { title, content, imageUrl } = req.body;
        console.log("req.body ===>",req.body);
        
        const blog = new Blog({
            title,
            content,
            imageUrl: imageUrl,
            userId: req.user.id,
        });

        try {
            await blog.save();
            res.send(blog);
        } catch (err) {
            res.send(400, err);
        }
    });
};
