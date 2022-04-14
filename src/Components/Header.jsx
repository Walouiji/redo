import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';

import '../App.css';

import ArticleModal from './ArticleModal';

import logo from '../logo.png';
import { Nav, Navbar, Container } from 'react-bootstrap';
import ProfileCard from './ProfileCard';

export default class Header extends Component {

  constructor() {
    super();
    this.state = {
      isModalVisible: false
    }

  }
  handleAvatarClick() {
    // console.log("hello");
  }

  accountMenu = (
    <ProfileCard></ProfileCard>
  )

  render() {
    return <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Redo
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link onClick={() => this.setState({ isModalVisible: true })} >Créer article</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* <Navbar.Text>
          <Input.Search className="Header-Input" placeholder="Rechercher" enterButton />
        </Navbar.Text> */}
        <Dropdown trigger="click" overlay={this.accountMenu}>
        <Avatar onClick={this.handleAvatarClick} size={32} src="https://joeschmoe.io/api/v1/random" />
        </Dropdown>
      </Container>
      <ArticleModal
      isVisible={this.state.isModalVisible}
      handleOk={() => this.setState({
          isModalVisible: false
        })}
        handleCancel={() => this.setState({
          isModalVisible: false
        })}
      />
    </Navbar>

  }
}
