import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AXIOS } from "../../utils/axiosApi";
import { BASE_URL_AWS } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const EditBlog = () => {
    const { _id } = useParams();
    const [blog, setBlog] = useState(null);
    const [file, setFile] = useState(null);
    const { user } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await AXIOS.get(`/api/blog/${_id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Failed to fetch blog:", error);
                // Handle error appropriately
            }
        };

        fetchBlog();
    }, [_id]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        if (file) {
            const uploadConfig = await AXIOS.get('/api/upload');
            await axios.put(uploadConfig.data.url, file, {
                headers: {
                    'Content-Type': file.type
                }
            });
            values["imageUrl"] = uploadConfig.data.key;
        }

        try {
            await AXIOS.patch(`/api/blog/${_id}`, values);
            navigate(`/view-blog/${_id}`);
        } catch (error) {
            console.error("Failed to update blog:", error);
            // Handle error appropriately
        } finally {
            setSubmitting(false);
        }
    };

    if (!blog) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center py-8 px-4">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Blog</h1>
                    <Formik
                        initialValues={{
                            title: blog.title,
                            content: blog.content,
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        className="block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Content</label>
                                    <Field
                                        as="textarea"
                                        name="content"
                                        className="block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Image</label>
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
                                        className="bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition-all"
                                        onClick={() => navigate(`/view-blog/${_id}`)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-all"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </button>
                                    
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
