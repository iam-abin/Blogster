import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/redux/reducers/user/userSlice";
import { AXIOS } from "../utils/axiosApi";
import { useNavigate } from "react-router-dom";
import { setMyBlogs } from "../utils/redux/reducers/blog/blogSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.user);
    const { isMyBlogs } = useSelector((store) => store.blog);
    
    const handleLoginClick = async () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    const handleLogoutClick = async () => {
        await AXIOS.get("/auth/logout");
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div className="bg-indigo-800 h-20 text-white flex items-center px-4">
            {/* Logo and Navigation */}
            <div className="flex-grow">
                <li className="text-2xl font-bold cursor-pointer list-none" onClick={() =>{
                    dispatch(setMyBlogs(false));
                    navigate('/')
                } }>Blogster</li>
            </div>

            {/* User Profile and Actions */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <div className="flex items-center space-x-2">
                            {user.profileImage && (
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            )}
                            {user.displayName && (
                                <span className="font-semibold">{user.displayName}</span>
                            )}
                        </div>
                        <div className="flex gap-5">
                            <li className={`cursor-pointer list-none p-2 rounded-lg ${isMyBlogs? "bg-blue-400":"bg-blue-500"}`} onClick={() => {
                                navigate("/")
                                dispatch(setMyBlogs())
                            }}>My Blogs</li>
                            <li className="cursor-pointer list-none" onClick={handleLogoutClick}>Logout</li>
                        </div>
                    </>
                ) : (
                    <p className="cursor-pointer" onClick={handleLoginClick}>Login With Google</p>
                )}
            </div>
        </div>
    );
};

export default Header;
