import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";
import { AXIOS } from "../../utils/axiosApi";

const PreviewBlog = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state;

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onCancel = () => {
        navigate(-1, {
            state: {
                title: formData.title,
                content: formData.content,
            },
        });
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);

        const formDataToSend = new FormData();

        // Append form values
        Object.keys(values).forEach((key) => {
            formDataToSend.append(key, values[key]);
        });

        try {
            // Get upload URL from your backend
            const uploadConfig = await AXIOS.get('/api/upload');

            if (file) {
                // Upload the file to the URL received from the backend
                await axios.put(uploadConfig.data.url, file, {
                    headers: {
                        'Content-Type': file.type
                    }
                });

                // Append the image URL key to the formData
                values["imageUrl"] = uploadConfig.data.key;
            }

            // Send the formData to the backend
            await AXIOS.post("/api/blog", values);

            navigate("/"); // Redirect after successful submission
        } catch (error) {
            console.error("Failed to submit blog:", error);
            // Handle the error appropriately
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <div className="w-full max-w-6xl p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Please Confirm Your Entries</h1>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Blog Title</h2>
                    <p className="text-gray-700">{formData.title}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Content</h2>
                    <p className="text-gray-700">{formData.content}</p>
                </div>

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
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Add an image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            <div className="flex justify-between">

                                <button
                                    type="button"
                                    className="bg-yellow-500 text-white py-2 px-4 rounded-md"
                                    onClick={onCancel}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white py-2 px-4 rounded-md"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save Blog"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PreviewBlog;
