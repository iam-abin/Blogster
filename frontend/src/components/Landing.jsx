import React from "react";
import HomePage from "./HomePage";

const Landing = () => {
	const loggedin = false;
	return (
		<>
			{!loggedin && (
				<div className="flex flex-col py-10 items-center gap-6">
					<h1 className="text-5xl font-bold">Blogster!</h1>
					Write private blogs
				</div>
			)}

      {loggedin && <HomePage />}
		</>
	);
};

export default Landing;
