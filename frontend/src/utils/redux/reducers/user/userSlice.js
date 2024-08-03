import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    // status: "idle",
    // error: null,
}
const userSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		// Add your non-async reducers here if needed
		addUser:(state, action)=>{
			state.user = action.payload
		},
		logoutUser:(state, action)=>{
			state.user = null
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(submitBlog.pending, (state) => {
	// 			state.status = "loading";
	// 		})
	// 		.addCase(submitBlog.fulfilled, (state, action) => {
	// 			state.status = "succeeded";
	// 			state.blogs.push(action.payload);
	// 		})
	// 		.addCase(submitBlog.rejected, (state, action) => {
	// 			state.status = "failed";
	// 			state.error = action.payload;
	// 		});
	// },
});

export const { addUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;


