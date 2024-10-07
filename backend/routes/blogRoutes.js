const mongoose = require("mongoose");
const { checkUser } = require("../middlewares/requireLogin");
const cleanCache = require("../middlewares/cleanCache");

const Blog = mongoose.model("Blog");

module.exports = (app) => {
    // To get all the posts based on page number
    app.get("/api/blogs/:page", checkUser, async (req, res) => {
        const { page } = req.params;
        const limit = 3;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("userId")
            .cache({
                cacheValuekey: req.user._id,
            });

        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);
        res.send({ blogs, totalPages });
    });

    // To get all the posts of a user
    app.get("/api/my-blogs/:page", checkUser, async (req, res) => {
        const userId = req.user._id;
        const { page } = req.params;
        const limit = 3;
        const skip = (page - 1) * limit;
        const blogs = await Blog.find({ userId })
            .skip(skip)
            .limit(limit)
            .populate("userId")
            .cache({
                cacheValuekey: userId,
            });

        const totalBlogs = await Blog.countDocuments({ userId });
        const totalPages = Math.ceil(totalBlogs / limit);

        res.send({ blogs, totalPages });
    });

    // To get a post using post id
    app.get("/api/blog/:id", checkUser, async (req, res) => {
        const blog = await Blog.findOne({
            _id: req.params.id,
        })
            .populate("userId")
            .cache({
                cacheValuekey: req.user._id,
            });

        res.send(blog);
    });

    // update a post
    app.patch("/api/blog/:id", checkUser, cleanCache, async (req, res) => {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);

        res.send(blog);
    });

    // To create a blog
    app.post("/api/blog", checkUser, cleanCache, async (req, res) => {
        const { title, content, imageUrl } = req.body;
        const blog = new Blog({
            title,
            content,
            imageUrl: imageUrl,
            userId: req.user._id,
        });

        try {
            await blog.save();
            res.send(blog);
        } catch (err) {
            res.send(400, err);
        }
    });
};
