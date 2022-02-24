import React, { Component } from 'react'
import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export default class ArticleForm extends Component {
    
    render() {
        return (
            <Form onFinish={this.props.handleSubmit}>
                <label>Title:</label>
                <Input
                    type="text"
                    id="title"
                    value={this.props.title}
                    onChange={this.props.handleChange}
                />
                <label>Contenu:</label>
                <TextArea
                    value={this.props.contenu}
                    onChange={this.props.handleChange}
                    rows={4}
                />
            </Form>
        )
    }
}
