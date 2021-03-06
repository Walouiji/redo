import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd';
import Fire from '../Fire';

export default class ProfileModal extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.type);
        const firebase = new Fire();
        this.props.type === "se connecter"? firebase.login(this.state.email, this.state.password): firebase.register(this.state.email, this.state.password)
        
        this.props.handleCancel();
    }

    handleChange = (e) => {
        this.setState(e.target.name === "email" ? { email: e.target.value } : { password: e.target.value });

    }

    componentWillUnmount() {
        this.setState({
            email: "",
            password: ""
        })
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
                    <Input name="password" type={'password'} onChange={this.handleChange} />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
