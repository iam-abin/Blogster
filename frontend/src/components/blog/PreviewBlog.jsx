import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { AXIOS } from "../../utils/axiosApi";
// import { submitBlog } from '../../redux/slices/blogSlice'; // Ensure this path is correct

const PreviewBlog = () => {
	const [file, setFile] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Use navigate for redirection
	const location = useLocation();
	console.log("location ",location);
	const formData = location.state;


	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

  const onCancel = () => navigate(-1, {state:  {
    title: formData.title,
    content: formData.content,
  }})

	const handleSubmit = async (values) => {
		const formDataToSend = new FormData();
		Object.keys(values).forEach((key) => {
			formDataToSend.append(key, values[key]);
		});
		console.log(formDataToSend.entries());
		if (file) {
			formDataToSend.append("file", file);
		}
		try {
			// await dispatch(submitBlog(formDataToSend)).unwrap();
			console.log(formDataToSend);
			// await AXIOS.post("/api/blog",formDataToSend, {
				const response = await AXIOS.post("/api/blog",values, {
				// headers:{
				// 	"Content-Type": "multipart/form-data"
				// }
			});
			console.log(response);
			navigate("/"); // Redirect to a success page after submission
		} catch (error) {
			console.error("Failed to submit blog:", error);
			// Handle error case here
		}
	};

	return (
		<div className=" w-3/4 mx-auto">
			<h1 className="mb-4">Please confirm your entries</h1>

			<span className="font-light text-sm">Blog Title</span>
			<p className="mb-3">{formData.title}</p>

			<span className="font-light text-sm">Content</span>
			<p className="mb-4">{formData.content}</p>
			<Formik
				initialValues={{
					title: formData.title,
					content: formData.content,
				}}
				validate={(values) => {
					const errors = {};
					if (!values.title) {
						errors.title = "Title is required";
					}
					if (!values.content) {
						errors.content = "Content is required";
					}
					return errors;
				}}
				onSubmit={handleSubmit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit: formikSubmit,
					isSubmitting,
				}) => (
					<Form
						onSubmit={formikSubmit}
						className="flex flex-col  mx-auto"
					>
						{/* <input
						type="text"
						name="title"
						className="border-black mb-5"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.title}
					/>
					{errors.title && touched.title && <div>{errors.title}</div>}
					<textarea
						name="content"
						className="border-black mb-5"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.content}
					/>
					{errors.content && touched.content && (
						<div>{errors.content}</div>
					)} */}
						<h1 className="text-2xl">Add an image</h1>
						<div className="flex flex-row justify-between mt-5">
							<input
								className="text-sm"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
							/>
							<button
								type="submit"
								className="bg-green-600 w-28 h-10"
								disabled={isSubmitting}
							>
								Save Blog
							</button>
						</div>
						<div className="flex justify-start mt-5">
							<button
								className="bg-yellow-500 w-28 h-10"
								type="button"
								onClick={onCancel}
							>
								Back
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default PreviewBlog;
