// import { Card, Avatar } from 'antd'
import { Row, Col, Avatar, Image } from 'antd';
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd'
import Fire from '../Fire.js';


export default class ArticleCell extends Component {

	handleChange = (e) => {
		this.setState({ content: e.target.value });

	}

	constructor() {
		super();
		this.state = {
			isEdit: false,
			content: ""
		}
	}

	componentDidMount() {
		this.setState({
			content: this.props.article.content
		})
	}

	handleUpdate() {
		const firebase = new Fire();
		const { article } = this.props;
		const updatedArticle = {
			id: article.id,
			title: article.title,
			content: this.state.content,
			createdAt: article.createdAt,
			comments: article.comments
		}
		firebase.updateArticle(updatedArticle)
		this.setState({
			isEdit: false,
		})
	}

	handleDelete() {
		const firebase = new Fire();
		const { article } = this.props;
		article.content = this.state.content;
		firebase.deleteArticle(article);
	}

	render() {
		const date = new Date(this.props.article.createdAt.seconds * 1000);
		return (
			<Card style={{ width: 550, marginTop: 16 }} extra={<p>X</p>} >
				<Card.Header>
					<Row>
						<Col span={18} push={2}>
							<Card.Title style={{ textAlign: 'left' }}>{this.props.article.title}</Card.Title>
						</Col>
						<Col span={5} pull={20}>
							<Avatar src="https://joeschmoe.io/api/v1/random" />
						</Col>
					</Row>
					<Card.Subtitle style={{ textAlign: 'left', fontSize: 13 }}>{date.toDateString()} </Card.Subtitle>
				</Card.Header>
				<Card.Body>
					{this.state.isEdit === true ?
						<div>
							<TextArea
								value={this.state.content}
								onChange={this.handleChange}
							/>
							<Button onClick={() => { this.handleUpdate() }}>Update</Button>
						</div> : <Card.Text onClick={
							() => { this.setState({ isEdit: true }); }}
						>{this.props.article.content}</Card.Text>}
						<Image
						width={200}
						src="~/Images/castor.jpg"
						/>
				</Card.Body>
				<Card.Footer style={{ alignItems: 'left' }}>

					<Button onClick={() => { this.handleDelete() }} >Delete</Button>
				</Card.Footer>
			</Card>
		)
	}
}
