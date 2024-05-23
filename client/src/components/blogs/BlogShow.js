import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

class BlogShow extends Component {
	componentDidMount() {
		this.props.fetchBlog(this.props.match.params._id);
	}

	renderimage() {
		if (this.props.blog.imageUrl) {
			return (
				<img
					width="500"
					height="500"
					src={ "https://blog-app-new-bucket.s3.ap-south-1.amazonaws.com/" + this.props.blog.imageUrl }
					alt=""
				></img>
			);
		}
	}

	render() {
		if (!this.props.blog) {
			return "";
		}

		const { title, content } = this.props.blog;

		return (
			<div>
				<h3>{title}</h3>
				<p>{content}</p>
				{this.renderimage()}
			</div>
		);
	}
}

function mapStateToProps({ blogs }, ownProps) {
	return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
