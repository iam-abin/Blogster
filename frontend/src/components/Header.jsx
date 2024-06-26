import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	let loggedin = false;
	return (
		<div className="bg-indigo-800 w-3/4 h-20 mx-auto text-white ">
			<ul className="flex justify-between">
				<div className=" h-20 w-40 flex justify-center items-center">
					<li className="text-2xl font-bold">Blogster</li>
				</div>
				<div className="flex w-40 justify-center items-center">
					{loggedin && <li>My Blogs</li>}
					{loggedin && <li>Logout</li>}
                    <Link to={""}>Login With Google</Link>
					
				</div>
			</ul>
		</div>
	);
};

export default Header;
