import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    // status: "idle",
    // error: null,
}
const userSlice = createSlice({
	name: "user",
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
});

export const { addUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;


