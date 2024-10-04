import React, { useEffect, useState } from "react";
import BlogPost from "./blog/BlogPost";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AXIOS } from "../utils/axiosApi";
import { addBlogs } from "../utils/redux/reducers/blog/blogSlice";

const HomePage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // For pagination
    const { isMyBlogs } = useSelector((store) => store.blog);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const getAllBlogs = async (currentPage) => {
        try {
            let response;
            if (!isMyBlogs) {
                response = await AXIOS.get(`/api/blogs/${currentPage}`);
            } else {
                response = await AXIOS.get(`/api/my-blogs/${currentPage}`);
            }
            console.log(response);
            setBlogPosts(response.data.blogs);
            setTotalPages(response.data.totalPages);
            dispatch(addBlogs(response.data.blogs));
        } catch (error) {
            console.error("Failed to get all blogs:", error);
            // Handle error case here
        }
    };
    useEffect(() => {
        getAllBlogs(currentPage);
    }, [isMyBlogs, currentPage]);

    // Pagination handler
    const handlePageChange = (page) => {
        console.log(page);

        setCurrentPage(page);
    };

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
                {blogPosts && blogPosts.length ? (
                    blogPosts.map((blog, index) => {
                        return <BlogPost key={index} blog={blog} />;
                    })
                ) : (
                    <div className="flex justify-center items-center h-48 w-full">
                        You dont have any posts yet
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex gap-2 mt-4">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
                        >
                            Previous
                        </button>

                        {/* Pagination Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${
                                    currentPage === index + 1
                                        ? "bg-blue-700 text-white"
                                        : "bg-blue-500 text-white"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
