import { createSlice } from "@reduxjs/toolkit";
import { submitBlog } from "./blogThunks";

const initialState = {
    blogs: [],
    blog: null,
    // status: "idle",
    // error: null,
};
const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        // Add your non-async reducers here if needed
        addABlog: (state, action) => {
            state.blogs = action.payload;
        },
        addBlogs: (state, action) => {
            state.blogs = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     // builder
    //     // 	.addCase(submitBlog.pending, (state) => {
    //     // 		state.status = "loading";
    //     // 	})
    //     // 	.addCase(submitBlog.fulfilled, (state, action) => {
    //     // 		state.status = "succeeded";
    //     // 		state.blogs.push(action.payload);
    //     // 	})
    //     // 	.addCase(submitBlog.rejected, (state, action) => {
    //     // 		state.status = "failed";
    //     // 		state.error = action.payload;
    //     // 	})
    // },
});

export const { addABlog, addBlogs } = blogSlice.actions;
export default blogSlice.reducer;
