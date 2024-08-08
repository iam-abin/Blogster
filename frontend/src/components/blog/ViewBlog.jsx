import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AXIOS } from "../../utils/axiosApi";

const ViewBlog = () => {
    let blog = true;
    const { _id } = useParams();
    const [currentBlog, setCurrentBlog] = useState(null);
    const blogs = useSelector((store) => store.blog.blogs);
    const navigate = useNavigate();

    const getABlogPost = async (id) => {
        try {
            const response = await AXIOS.get("/api/blog/"+id);
            console.log(response);
            setCurrentBlog(response.data)
        } catch (error) {
            console.error("Failed to get current blog:", error);
            // Handle error case here
        }
    };
    useEffect(() => {
        if (blogs.length) {
            const selectedBlog = blogs.find((blog) => blog._id === _id);
            setCurrentBlog(selectedBlog);
            selectedBlog && setCurrentBlog(selectedBlog);
        } else {
			console.log("No blogs in found in store");
			getABlogPost(_id)
        }
    }, []);

    let imageUrl =
        "6654fdb1175533afcb5e04f8/d98e2b70-1c71-11ef-b1de-bbfb2c16c856.jpeg";
    if (!blog) return "";

    // blog.imageUrl (it is an id of image from s3)

    return (
        <div className="bg-red-200 flex flex-col items-center justify-center">
            <div className="w-3/4 p-6 bg-gray-400">{currentBlog?.title}</div>
            <div className="w-3/4 p-6 bg-gray-400">{currentBlog?.content}</div>
            <div className="flex flex-row justify-between w-3/4 ">
                {_id && imageUrl && (
                    <img
                        width="500"
                        height="500"
                        src={`https://blog-app-new-bucket.s3.ap-south-1.amazonaws.com/${imageUrl}`}
                        alt=""
                    />
                )}
                <span
                    className="hover:cursor-pointer bg-blue-600 px-4 h-6"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </span>
            </div>
        </div>
    );
};

export default ViewBlog;
