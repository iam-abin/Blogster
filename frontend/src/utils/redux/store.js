import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./reducers/user/userSlice";
// import blogReducer from "./reducers/blog/blogSlice";

export const store = configureStore({
    reducer: {
        user: useReducer,
        // blog: blogReducer,
    },
});
