import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ blog }) => {
    if (!blog) return "";
    
    const { title, content, userId } = blog;
    const { displayName, profileImage } = userId;
    

    return (
        <div className="w-3/5 bg-white my-2 p-4 shadow-md shadow-slate-300 rounded-md">
            <div className="flex justify-between">
            <h1 className="text-2xl mb-2">{title}</h1>
            <div className="flex gap-2 items-center mb-4">
                <span className="font-semibold text-gray-500">{displayName}</span>
                <img
                    src={profileImage}
                    alt={displayName}
                    className="w-9 h-9 rounded-full mr-3"
                />
            </div>
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
