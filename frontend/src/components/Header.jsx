import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
	const user = useSelector((store)=>store.user)
	console.log(user);
	
	useEffect(()=>{

	},[])
	
	const handleLoginClick = async() => {
		window.location.href = 'http://localhost:5000/auth/google';
	};

	return (
		<div className="bg-indigo-800 w-3/4 h-20 mx-auto text-white ">
			<ul className="flex justify-between">
				<div className=" h-20 w-40 flex justify-center items-center">
					<li className="text-2xl font-bold">Blogster</li>
				</div>
				<div className="flex w-40 justify-center items-center">
					{user && <li>My Blogs</li>}
					{user && <li>Logout</li>}
                    <p className="hover:cursor-pointer" onClick={handleLoginClick}>Login With Google</p>
				</div>
			</ul>
		</div>
	);
};

export default Header;
