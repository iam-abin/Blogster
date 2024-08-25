import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    blog: null,
    // status: "idle",
    isMyBlogs: false
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
        setMyBlogs: (state, action) => { // To show all the blogs of current loggined user
            console.log("=====================",action.payload);
            
            if(typeof action.payload === 'boolean'){
                state.isMyBlogs = action.payload;
            }else{
                state.isMyBlogs = !state.isMyBlogs;
            }
                

        },
    },
});

export const { addABlog, addBlogs, setMyBlogs } = blogSlice.actions;
export default blogSlice.reducer;
