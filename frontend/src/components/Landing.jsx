import React from "react";
import HomePage from "./HomePage";
import { useSelector } from "react-redux";

const Landing = () => {
	const { user } = useSelector((store) => store.user);
	return (
		<>
			{!user && (
				<div className="flex flex-col py-10 items-center gap-6">
					<h1 className="text-5xl font-bold">Blogster!</h1>
					Write private blogs
				</div>
			)}

      {user && <HomePage />}
		</>
	);
};

export default Landing;
