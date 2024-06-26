import { createSlice } from "@reduxjs/toolkit";
import { submitBlog } from "./blogThunks";

initialState = {
    blogs: [],
    status: "idle",
    error: null,
}
const blogSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		// Add your non-async reducers here if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitBlog.pending, (state) => {
				state.status = "loading";
			})
			.addCase(submitBlog.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.blogs.push(action.payload);
			})
			.addCase(submitBlog.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			
	},
});

export default blogSlice.reducer;


