import { Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { Component } from 'react';
import Fire from '../Fire';

class Commentform extends Component {


    constructor() {
        super();
        this.state = {
            comments: [],
            textComment: ""
        }
    }

    comments = []

    handleChange = (e) => {
        this.setState({textComment: e.target.value});
    }

    handleClick() {
        // const firebase = new Fire();
        this.comments.push(this.state.textComment);
    }

    render() {
        console.log(this.comments);
        return (
            <Form>
                <label>Add Comment</label>
                <TextArea
                value={this.state.textComment}
                onChange={this.handleChange}
                />
                <Button onClick={this.handleClick}>Send</Button>
                {this.state.textComment}
            </Form>
        );
    }
}

export default Commentform;
