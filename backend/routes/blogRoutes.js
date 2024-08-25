const mongoose = require("mongoose");
// const {checkUser} = require("../middlewares/checkUser");
const { checkUser } = require("../middlewares/requireLogin");
const cleanCache = require("../middlewares/cleanCache");

const Blog = mongoose.model("Blog");

module.exports = (app) => {
    // To get all the posts
    app.get("/api/blogs", checkUser, async (req, res) => {
        // const blogs = await Blog.find().populate('userId').cache({
        //     cacheValuekey: req.user._id,
        // });
        const blogs = await Blog.find().populate("userId").cache({
            cacheValuekey: req.user._id,
        });
        res.send(blogs);
    });

     // To get all the posts of a user
     app.get("/api/my-blogs", checkUser, async (req, res) => {
        const userId = req.user._id
        const blogs = await Blog.find({userId }).populate("userId").cache({
            cacheValuekey: userId,
        });
        res.send(blogs);
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
