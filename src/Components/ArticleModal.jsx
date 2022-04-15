import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import ArticleForm from './ArticleForm';
import Fire from '../Fire';

export default class ArticleModal extends Component {

	constructor() {
		super();
		this.state = {
			title: "",
			content: "",
			category: "",
			imagePath: "",
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const firebase = new Fire();
		firebase.addArticle({
			title: this.state.title,
			category: this.state.category,
			content: this.state.content,
			createdAt: new Date(),
			imagePath: this.state.imagePath,
			comments: []
		})
		this.props.handleCancel();
	}

	handleChange = (e) => {
		switch (e.target.id) {
			case "title":
				this.setState({ title: e.target.value });
				break;
			case "content":
				this.setState({ content: e.target.value });
				break;
			case "imagePath":
				this.setState({ imagePath: e.target.value });
			default:
				break;
		}
		//this.setState(e.target.id === "title" ? { title: e.target.value } : { content: e.target.value });
	}

	handleCategory = (e) => {
		this.setState({ category: e.key })
	}

	componentWillUnmount() {
		this.setState({
			title: "",
			content: "",
			imagePath: "",
		})
	}

	render() {
		return <Modal
			title="Créer un article"
			visible={this.props.isVisible}
			footer={[
				<Button key="submit" onClick={this.handleSubmit}>Valider</Button>
			]}
			onCancel={this.props.handleCancel}
		>
			<ArticleForm
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				handleCategory={this.handleCategory}
			/>
		</Modal>;
	}
}
