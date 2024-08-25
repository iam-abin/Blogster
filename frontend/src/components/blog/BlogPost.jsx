import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ blog }) => {
    if (!blog) return "";
    
    const { title, content, userId } = blog;
    const { displayName, profileImage } = userId;
    

    return (
        <div className="w-3/4 bg-white my-2 p-4 shadow-md shadow-slate-300 rounded-md">
            <h1 className="text-2xl mb-2">{title}</h1>
            <div className="flex items-center mb-4">
                <img
                    src={profileImage}
                    alt={displayName}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{displayName}</span>
            </div>
            <p>{content}</p>
            <hr />
            <div className="text-orange-300 mt-4">
                <Link to={`/blog/read/${blog._id}`}>Read</Link>
            </div>
        </div>
    );
};

export default BlogPost;
