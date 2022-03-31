import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { Avatar } from 'antd';
import ProfileModal from './ProfileModal';

export default class ProfileCard extends Component {

    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            type: "s'inscrire"
        }
    }

    render() {
        return (
            <div>
                <Card style={{ width: '300px' }}>
                    <Card.Header>
                        <Avatar size={124} src="https://joeschmoe.io/api/v1/random" />
                        <Card.Title>Profile name</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <a onClick={() => this.setState({
                                isModalVisible: true,
                                type: "s'inscrire"
                            })}>S'inscrire</a>
                        </Card.Text>
                        <Card.Text>
                            <a onClick={() => this.setState({
                                isModalVisible: true,
                                type: "se connecter"
                            })}>Se Connecter</a>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <ProfileModal
                    isVisible={this.state.isModalVisible}
                    handleCancel={() => this.setState({
                        isModalVisible: false
                    })}
                    type={this.state.type}
                />
            </div>
        )
    }
}
