import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Avatar, Button } from "antd";
import ProfileModal from "./ProfileModal";
import Fire from "../Fire";

export default class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      type: "s'inscrire",
    };
  }

  render() {
    const firebase = new Fire();
    console.log(firebase.user);
    return (
      <div>
        <Card style={{ width: "300px" }}>
          <Card.Header>
            <Avatar size={124} src="https://joeschmoe.io/api/v1/random" />
            <Card.Title> {firebase.user == null ? "Bienvenue !": firebase.user.email} </Card.Title>
          </Card.Header>
          <Card.Body>
            {firebase.user == null ? 
              <div>
                <Card.Text>
                  <p
                    onClick={() =>
                      this.setState({
                        isModalVisible: true,
                        type: "s'inscrire",
                      })
                    }
                  >
                    S'inscrire
                  </p>
                </Card.Text>
                <Card.Text>
                  <p
                    onClick={() =>
                      this.setState({
                        isModalVisible: true,
                        type: "se connecter",
                      })
                    }
                  >
                    Se Connecter
                  </p>
                </Card.Text>
              </div>
            : (
              <Button onClick={() => firebase.logout()}>
                Se déconnecter
              </Button>
            )}
          </Card.Body>
        </Card>
        <ProfileModal
          isVisible={this.state.isModalVisible}
          handleCancel={() =>
            this.setState({
              isModalVisible: false,
            })
          }
          type={this.state.type}
        />
      </div>
    );
  }
}
