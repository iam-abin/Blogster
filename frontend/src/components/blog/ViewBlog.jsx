import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogsData } from "../../data/dummy";
import { useEffect } from "react";

const ViewBlog = () => {
	let blog = true;

	const { _id } = useParams();
	console.log("---");
	console.log(_id);
	console.log("---");
	const navigate = useNavigate();
  useEffect(()=>{

  },[])

	let imageUrl =
		"6654fdb1175533afcb5e04f8/d98e2b70-1c71-11ef-b1de-bbfb2c16c856.jpeg";
	let text = `There are many variations of passages of Lorem Ipsum available, 
  but the majority have suffered alteration in some form, by injected humour .
  anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to
   repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a
    dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem
     Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;
	if (!blog) return "";

	// blog.imageUrl (it is an id of image from s3)

	return (
		<div className="bg-red-200 flex flex-col items-center justify-center">
			<div className="w-3/4 p-6 bg-gray-400">{text}</div>
			<div className="flex flex-row justify-between w-3/4 ">
				{_id && imageUrl && (
					<img
						width="500"
						height="500"
						src={`https://blog-app-new-bucket.s3.ap-south-1.amazonaws.com/${imageUrl}`}
						alt=""
					/>
				)}
				<span
					className="hover:cursor-pointer bg-blue-600 px-4 h-6"
					onClick={() => navigate(-1)}
				>
					Go Back
				</span>
			</div>
		</div>
	);
};

export default ViewBlog;
