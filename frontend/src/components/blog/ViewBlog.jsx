import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AXIOS } from "../../utils/axiosApi";
import { BASE_URL_AWS } from "../../utils/constants";
import { useSelector } from "react-redux";

const ViewBlog = () => {
    const { _id } = useParams();
    const [currentBlog, setCurrentBlog] = useState(null);
    const { user } = useSelector((store) => store.user);
    // const [currentUserId, setCurrentUserId] = useState(null); // New state for current user ID

    const navigate = useNavigate();

    const getABlogPost = async (id) => {
        try {
            const response = await AXIOS.get("/api/blog/" + id);
            console.log("response", response);
            setCurrentBlog(response.data);
        } catch (error) {
            console.error("Failed to get current blog:", error);
            // Handle error case here
        }
    };

    useEffect(() => {
        console.log("No blogs found in store");
        getABlogPost(_id);
    }, [_id]);

    if (!currentBlog) return null;

    const imageUrl = `${BASE_URL_AWS}/${currentBlog?.imageUrl}`;
    const { displayName, profileImage } = currentBlog?.userId || {};

    const isOwner = user._id === currentBlog?.userId?._id;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center py-8 px-4">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden relative">
                {/* User Info at the Top Right */}
                {displayName && profileImage && (
                    <div className="absolute top-4 right-4 flex items-center space-x-3">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={profileImage}
                            alt={displayName}
                        />
                        <span className="font-semibold text-gray-800">
                            {displayName}
                        </span>
                    </div>
                )}
                
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {currentBlog?.title}
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {currentBlog?.content}
                    </p>
                    {imageUrl && (
                        <div className="flex justify-center mb-6">
                            <img
                                className="rounded-lg shadow-md max-w-full h-auto"
                                src={imageUrl}
                                alt={currentBlog?.title}
                            />
                        </div>
                    )}
                    <div className="flex justify-between">
                        <button
                            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-all"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                        {isOwner && (
                            <button
                                className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-all"
                                onClick={() => navigate(`/edit-blog/${_id}`)} // Navigate to the edit page
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBlog;