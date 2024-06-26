import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Header from "./components/Header";
import ViewBlog from "./components/blog/ViewBlog";
import CreateBlogForm from "./components/blog/CreateBlogForm";
import PreviewBlog from "./components/blog/PreviewBlog";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>

			<Header />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route exact path="/blogs/:_id" element={<ViewBlog />} />
				<Route path="/blogs/new" element={<CreateBlogForm />} />
				<Route path="/blogs/preview" element={<PreviewBlog />} />

				{/* <Route path="/" element={<ViewBlog />} /> */}
				{/* <Route path="/blogs" component={Dashboard} /> */}
			</Routes>
		</>
	);
}

export default App;
