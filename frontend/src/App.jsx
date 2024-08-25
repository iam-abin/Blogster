import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Header from "./components/Header";
import ViewBlog from "./components/blog/ViewBlog";
import CreateBlogForm from "./components/blog/CreateBlogForm";
import PreviewBlog from "./components/blog/PreviewBlog";
import { AXIOS } from "./utils/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/redux/reducers/user/userSlice";

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    const getCurrentUser = async () => {
        const currentUser = await AXIOS.get("/api/current-user");
        console.log(
            "This is App.js get current user function",
            currentUser.data
        );
        // console.log();
        dispatch(addUser(currentUser.data));
    };
    useEffect(() => {
        getCurrentUser();
    }, []);
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    exact
                    path="/blog/read/:_id"
                    element={user ? <ViewBlog /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/blogs/new"
                    element={user ? <CreateBlogForm /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/blogs/preview"
                    element={user ? <PreviewBlog /> : <Navigate to={"/"} />}
                />
            </Routes>
        </>
    );
}

export default App;
