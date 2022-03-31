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
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const firebase = new Fire(error => {
			if (error) {
				console.error(error);
			} else {
				firebase.addArticle({
					title: this.state.title,
					content: this.state.content,
					createdAt: new Date(),
					comments: []
				})
			}
		})
		this.props.handleCancel();
	}

	handleChange = (e) => {
		this.setState(e.target.id === "title" ? { title: e.target.value } : { content: e.target.value });

	}

	componentWillUnmount() {
		this.setState({
			title: "",
			content: "",
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
				title={this.props.title}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		</Modal>;
	}
}
