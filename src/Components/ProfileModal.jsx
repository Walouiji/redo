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
        console.log(this.props.type);
        const firebase = new Fire();
        this.props.type == "login"? firebase.login(this.state.loginEmail, this.state.loginPassword): firebase.register(this.state.loginEmail, this.state.loginPassword)
        
        this.props.handleCancel();
    }

    handleChange = (e) => {
        this.setState(e.target.name === "email" ? { loginEmail: e.target.value } : { loginPassword: e.target.value });

    }

    render() {
        return <Modal
            title={this.props.type}
            visible={this.props.isVisible}
            onOk={this.handleSubmit}
            onCancel={this.props.handleCancel}
        >
            <Form>
                <Form.Item
                    label="Adresse email"
                    name="email"
                    rules={[{ required: true, message: 'Veuillez renseigner un email' }]}
                >
                    <Input name="email" onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[{ required: true, message: 'Mot de passe requis' }]}
                >
                    <Input name="password" onChange={this.handleChange} />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
