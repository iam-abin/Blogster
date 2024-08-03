import React, { useEffect, useState } from "react";
import BlogPost from "./blog/BlogPost";
import { blogsData } from "../data/dummy"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { AXIOS } from "../utils/axiosApi";
import { addBlogs } from "../utils/redux/reducers/blog/blogSlice";

const HomePage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
	const dispatch = useDispatch()
    const handleSubmit = async (values) => {
        try {
            const response = await AXIOS.get("/api/blogs", values);
            console.log(response);
            setBlogPosts(response.data);
			dispatch(addBlogs(response.data))
        } catch (error) {
            console.error("Failed to get all blogs:", error);
            // Handle error case here
        }
    };
    useEffect(() => {
        handleSubmit();
    }, []);
    return (
        <>
            <div className="flex flex-col items-center">
                {blogPosts.map((blog, index) => {
                    console.log(blog);
                    return <BlogPost key={index} blog={blog} />;
                })}
            </div>
            <div className="flex justify-end mr-32 h-16">
                <Link className="mr-0 font-bold text-red-400" to={"/blogs/new"}>
                    <AddCircleOutlineIcon className="w-full h-full" />
                </Link>
            </div>
        </>
    );
};

export default HomePage;
