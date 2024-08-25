import React from "react";
import { Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Blog</h2>
                <Formik
                    initialValues={{
                        title: formData?.title || "",
                        content: formData?.content || "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = "You must provide a value";
                        }
                        if (!values.content) {
                            errors.content = "You must provide content";
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        navigate("/blogs/preview", { state: values });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <label htmlFor="title" className="text-gray-700 font-medium mb-2">
                                Blog Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                className={`p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.title && touched.title ? "border-red-500" : "border-gray-300"}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                placeholder="Enter blog title"
                            />
                            {errors.title && touched.title && (
                                <div className="text-red-500 text-sm mb-4">{errors.title}</div>
                            )}

                            <label htmlFor="content" className="text-gray-700 font-medium mb-2">
                                Blog Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows="6"
                                className={`p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.content && touched.content ? "border-red-500" : "border-gray-300"}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.content}
                                placeholder="Enter blog content"
                            />
                            {errors.content && touched.content && (
                                <div className="text-red-500 text-sm mb-4">{errors.content}</div>
                            )}

                            <div className="flex justify-between mt-6">
                                <Link
                                    to="/"
                                    className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                                    disabled={isSubmitting}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateBlogForm;
