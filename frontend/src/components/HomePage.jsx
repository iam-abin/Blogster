import React, { useEffect, useState } from "react";
import BlogPost from "./blog/BlogPost";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AXIOS } from "../utils/axiosApi";
import { addBlogs } from "../utils/redux/reducers/blog/blogSlice";

const HomePage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const { isMyBlogs } = useSelector((store) => store.blog);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const getAllBlogs = async () => {
        try {
            let response;
            if (!isMyBlogs) {
                response = await AXIOS.get("/api/blogs");
            } else {
                response = await AXIOS.get("/api/my-blogs");
            }
            console.log(response);
            setBlogPosts(response.data);
            dispatch(addBlogs(response.data));
        } catch (error) {
            console.error("Failed to get all blogs:", error);
            // Handle error case here
        }
    };
    useEffect(() => {
        getAllBlogs();
    }, [isMyBlogs]);
    return (
        <div className="min-h-screen bg-blue-50">
            <div className="flex justify-end mr-32 pt-5 h-16">
                <Link
                    className="mr-0 flex gap-2 font-bold text-red-400"
                    to={"/blogs/new"}
                >
                    <p>Add New Post </p>
                    <AddCircleOutlineIcon className="w-full h-full" />
                </Link>
            </div>
            <div className="flex flex-col items-center pb-10">
                {blogPosts.length ? (
                    blogPosts.map((blog, index) => {
                        return <BlogPost key={index} blog={blog} />;
                    })
                ) : (
                    <div className="flex justify-center items-center h-48 w-full">
                        You dont have any posts yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
