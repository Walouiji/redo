import { Row, Col, Avatar, Image } from 'antd';
import { DeleteFilled, MessageFilled } from '@ant-design/icons'
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd'
import Fire from '../Fire.js';


export default class ArticleCell extends Component {

	handleChange = (e) => {
		this.setState({ content: e.target.value });

	}
	firebase = new Fire();

	constructor() {
		super();
		this.state = {
			isEdit: false,
			content: "",
			author: "",
		}
	}

	componentDidMount() {
		this.setState({
			content: this.props.article.content,
			author: this.firebase.user !== null ? this.firebase.user.email: ""
		})
	}

	handleUpdate() {
		const { article } = this.props;
		const updatedArticle = {
			id: article.id,
			title: article.title,
			content: this.state.content,
			createdAt: article.createdAt,
			comments: article.comments
		}
		this.firebase.updateArticle(updatedArticle)
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
		console.log(this.author);
		return (
			<Card style={{ width: 550, marginTop: 16 }} extra={<p>X</p>} >
				<Card.Header>
					<Row>
						<Col span={18} push={2}>
							<Card.Title style={{ textAlign: 'left' }}>{this.props.article.title}</Card.Title>
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
						
					{this.props.article.imagePath !== undefined ?
					<Image
					width={200}
					src={this.props.article.imagePath}
					/> : <p></p>
					}
				</Card.Body>
				<Card.Footer>
				{/* <p style={{fontSize: 15}}><MessageFilled />{this.props.article.comments.length} comments</p> */}
					{/* <Button onClick={() => { this.handleDelete() }} ><DeleteFilled />Delete</Button> */}
					<Row justify="start">
						<Col span={4}>
								<MessageFilled />
							<p style={{fontSize: 15}}>{this.props.article.comments.length} comments</p>
							</Col>
						<Col span={3}>
						<DeleteFilled />
							<p onClick={() => { this.handleDelete() }} style={{fontSize: 15}} >Delete</p>
							</Col>
						</Row>
				</Card.Footer>
			</Card>
		)
	}
}
