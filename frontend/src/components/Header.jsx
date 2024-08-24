import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/redux/reducers/user/userSlice";
import { AXIOS } from "../utils/axiosApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate()
    const { user } = useSelector((store) => store.user);
    console.log("This is header user", user);

    useEffect(() => {}, []);

    const handleLoginClick = async () => {
        window.location.href = "http://localhost:5000/auth/google";
        // const userDetails = axios.get("/auth/google");
        // console.log("userDetails after google login :",userDetails);
    };

    const handleLogoutClick = async () => {
		await AXIOS.get("/auth/logout");
        dispatch(logoutUser());
		navigate('/')
	
    };

    return (
        <div className="bg-indigo-800 w-3/4 h-20 mx-auto text-white ">
            <ul className="flex justify-between">
                <div className=" h-20 w-40 flex justify-center items-center">
                    <li className="text-2xl font-bold">Blogster</li>
                </div>
                <div className="flex w-40 justify-center items-center mr-5">
                    <div className="flex gap-5 ">
                        {user && <li>My Blogs</li>}
                        {user && (
                            <li
                                className="hover:cursor-pointer"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </li>
                        )}
                    </div>
                    {!user && (
                        <p
                            className="hover:cursor-pointer"
                            onClick={handleLoginClick}
                        >
                            Login With Google
                        </p>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Header;
