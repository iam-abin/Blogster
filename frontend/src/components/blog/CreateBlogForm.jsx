import React from "react";
import { Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state;
    return (
        <>
            <div className="bg-red-200 w-3/4 p-10 mx-auto">
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
                        // Navigate to the result page with the form data
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
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-3/5 mx-auto"
                        >
				
                            <input
                                type="text"
                                name="title"
                                className="p-2 mb-3"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            {errors.title && touched.title && errors.title}

                            <input
                                className="p-2"
                                type="text"
                                name="content"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.content}
                            />
                            {errors.content &&
                                touched.content &&
                                errors.content}

                            <div className="flex flex-row justify-between mt-5">
                                <Link
                                    to="/"
                                    className="px-7 py-2 bg-orange-600"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="px-7 py-2 bg-green-700"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Next
                                </button>
                            </div>

                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default CreateBlogForm;
