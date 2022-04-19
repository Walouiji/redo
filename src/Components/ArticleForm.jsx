import React, { Component } from 'react'
import { Form, Input, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { categories } from '../config/categories_enum';

export default class ArticleForm extends Component {

    constructor() {
        super();
        this.state = {
            category: 'Select a category',
        }
    }

    menu = (
        <Menu onClick={(e) => this.props.handleCategory(e)}>
            {categories.map((category) => (
                <Menu.Item
                    id={category}
                    key={category}
                    onClick={() => this.setState({ category: category })}
                >
                    {category}
                </Menu.Item>
            ))}
        </Menu>
    );

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
                <br />
                <Dropdown trigger="click" overlay={this.menu}>
                    <Button>
                        {this.state.category} <DownOutlined />
                    </Button>
                </Dropdown> <br />
                <label>Contenu:</label>
                <TextArea
                    value={this.props.contenu}
                    id="content"
                    onChange={this.props.handleChange}
                    rows={4}
                />
                <label>Image:</label>
                <Input
                    value={this.props.imagePath}
                    id="imagePath"
                    onChange={this.props.handleChange}
                />
            </Form>
        )
    }
}
