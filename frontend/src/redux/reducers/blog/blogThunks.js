import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitBlog = createAsyncThunk(
	"user/fetchUser",
	async ({ values, file }) => {
		try {
			// Request to get presigned url
			const uploadConfig = await axios.get("/api/upload");

			// Upload file to S3
			await axios.put(uploadConfig.data.url, file, {
				headers: {
					"Content-Type": file.type,
				},
			});

			// Request to upload blog details
			const res = await axios.post("/api/blogs", {
				...values,
				imageUrl: uploadConfig.data.key,
			});

			return res.data;
		} catch (error) {
			throw error.response.data;
		}
	}
);
