import React from "react";
import BlogPost from "./blog/BlogPost";
import { blogsData } from "../data/dummy";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

const HomePage = () => {
	return (
		<>
			<div className="flex flex-col items-center">
				{blogsData.map((blog, index) => {
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
