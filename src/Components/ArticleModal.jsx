import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import ArticleForm from './ArticleForm';

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
    alert("titre : " + this.state.title + "\n contenu : " + this.state.content);
    this.props.handleCancel();
    this.setState({ title: "", content: ""})
  }

  handleChange = (e) => {
    this.setState(e.target.id === "title" ? { title: e.target.value } : { content: e.target.value });

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
