const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const cleanHash = require("../middlewares/cleanCache");

const Blog = mongoose.model("Blog");

module.exports = (app) => {
 

    app.get("/api/blog", requireLogin, async (req, res) => {
        const blogs = await Blog.find({ _user: req.user.id }).cache({
            key: req.user.id,
        });

        res.send(blogs);
    });

	// app.get("/api/blog/blogs", requireLogin, async (req, res) => {
		app.get("/api/blogs", async (req, res) => {
        const blogs = await Blog.find();

        res.send(blogs);
    });

	app.get("/api/blog/:id", requireLogin, async (req, res) => {
        const blog = await Blog.findOne({
            _user: req.user.id,
            _id: req.params.id,
        });

        res.send(blog);
    });

    // app.post("/api/blog", requireLogin, cleanHash, async (req, res) => {
    app.post("/api/blog", async (req, res) => {
        const { title, content, imageUrl } = req.body;

        console.log("req.body ", req.body);
        const blog = new Blog({
            title,
            content,
            imageUrl: "iuhqogfuqwhdoqwgfuyrgd/ojib",
            // _user: req.user.id,
        });

        try {
            await blog.save();
            res.send(blog);
        } catch (err) {
            res.send(400, err);
        }
    });
};
