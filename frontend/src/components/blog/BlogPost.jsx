import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ blog }) => {
	if (!blog) return "";


	return (
		<div className="w-3/4 bg-white my-2 p-4 shadow-md shadow-slate-300 rounded-md">
			<h1 className="text-2xl mb-2">{blog.title}</h1>
			<p>{blog.text}</p>

			<hr />
			<div className="text-orange-300 ">
				<Link to={`/blogs/${blog._id}`}>Read</Link>
			</div>
		</div>
	);
};

export default BlogPost;
