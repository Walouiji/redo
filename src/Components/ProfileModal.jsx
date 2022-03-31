import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd';
import Fire from '../Fire';

export default class extends Component {
    constructor() {
        super();
        this.state = {
            loginEmail: "",
            loginPassword: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const firebase = new Fire(error => {
            if (error) {
                console.error(error);
                return;
            }
            firebase.addArticle({
                title: this.state.title,
                content: this.state.content,
                createdAt: new Date(),
                comments: []
            })
        })
        this.props.handleCancel();
    }

    handleChange = (e) => {
        this.setState(e.target.id === "title" ? { title: e.target.value } : { content: e.target.value });

    }

    login = async () => {
        const auth = new Fire().auth;
        const user = await auth.signInWithEmailAndPassword(
            auth,
            this.state.loginEmail,
            this.state.loginPassword
        );
        console.log(user);

    };

    render() {
        return <Modal
            title={this.props.type}
            visible={this.props.isVisible}
            onOk={this.props.handleCancel}
            onCancel={this.props.handleCancel}
        >
            <Form>
                <Form.Item
                    label="Adresse email"
                    name="email"
                    rules={[{ required: true, message: 'Veuillez renseigner un email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[{ required: true, message: 'Mot de passe requis' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
