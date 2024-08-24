const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const cleanHash = require("../middlewares/cleanCache");

const Blog = mongoose.model("Blog");

module.exports = (app) => {
    app.get("/api/blogs", requireLogin, async (req, res) => {
        const blogs = await Blog.find();
        res.send(blogs);
    });

    app.get("/api/blog/:id", requireLogin, async (req, res) => {
        const blog = await Blog.findOne({
            _id: req.params.id,
        }).cache({
            cacheValuekey: req.user.id,
        });

        res.send(blog);
    });

    app.post("/api/blog", requireLogin, cleanHash, async (req, res) => {
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
