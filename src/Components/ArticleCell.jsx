// import { Card, Avatar } from 'antd'
import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class ArticleCell extends Component {
  render() {
    return (
      <Card style={{ width: 600, marginTop: 16 }}>
        <Card.Header>
          <Card.Title style={{ textAlign: 'left' }}>{this.props.titre}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{this.props.content}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
