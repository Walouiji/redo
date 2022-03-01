import './App.css';
import React from 'react';
import AddButton from './Components/AddButton';
import ArticleModal from './Components/ArticleModal';
import Header from './Components/Header';
import ArticleCell from './Components/ArticleCell';
import Fire from './Fire';

import { Row, Col, Card } from 'antd';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      titre: "",
      contenu: "",
      mock: [
        {
          titre: "Lorem",
          contenu: "In do magna qui Lorem id excepteur. Enim cillum labore et reprehenderit Lorem do consequat sunt pariatur aliquip minim. Consectetur occaecat aliquip consequat pariatur magna tempor et esse do ipsum magna excepteur. Adipisicing do adipisicing officia cillum voluptate. Quis commodo voluptate sint amet aliquip esse dolor eiusmod cupidatat ut do anim id consequat."
        },
        {
          titre: "Ipsum",
          contenu: "Est eu incididunt minim mollit qui ipsum laboris voluptate. Id qui do culpa officia eu ipsum qui. Eu qui est labore eiusmod reprehenderit laboris qui. Id aliqua officia eu sit ex veniam eiusmod velit."
        },
        {
          titre: "ged",
          contenu: "Do ut minim in enim minim aute laborum cupidatat est. Adipisicing dolor veniam cupidatat anim fugiat qui incididunt eiusmod amet adipisicing nulla dolore cillum. Consectetur minim ea excepteur excepteur. Officia reprehenderit cillum amet est."
        },
        {
          titre: "ugiykth",
          contenu: "Aliquip deserunt occaecat amet nostrud pariatur dolor ullamco laboris ea adipisicing labore sint pariatur qui. Non in duis ullamco proident aliquip. Ut anim occaecat enim exercitation voluptate exercitation Lorem anim magna eiusmod cupidatat consequat sint. Incididunt mollit elit id in qui tempor."
        },
        {
          titre: "grsev",
          contenu: "Sint aute consectetur proident excepteur et eiusmod consectetur dolor dolore excepteur amet eiusmod et officia. Eu dolor dolor ex eu non. Irure eu reprehenderit nisi dolor laborum minim eu culpa Lorem. Enim culpa id nostrud adipisicing velit eu ipsum aute anim pariatur. Veniam laborum est do cillum ut deserunt ad nisi duis aliquip. Esse magna aliqua ad dolor veniam. Occaecat occaecat aliqua dolore aliquip veniam irure ullamco ea pariatur tempor occaecat dolore adipisicing ex."
        },
      ],
      articles: [],
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    const firebase = new Fire(error => {
      if (error) {
        this.setState({ error: error });
      } else {
        firebase.getArticles(article => {
          this.setState({
            article: article,
            loading: false
          });
        })
      }
    })
  }

  render() {
    console.log(this.state.articles);
    return (
      <div className="App">
        <header className="App-header">
          <Header className="App-header" />
        </header>
        <div className="App-body">
          <Row>
            <Col span={18} push={6}>
              <Card style={{marginRight: 200, marginLeft: 325, marginTop: 15}}>
                <p>
                  Welcome to Redo, the best news website ever !
                </p>
                <AddButton
                  handleClick={() => this.setState({ isModalVisible: true })} 
                  content="Ajouter un article"
                />
              </Card>
            </Col>
            <Col span={6} pull={18}>
              {this.state.mock.map((article) =>
                <ArticleCell titre={article.titre} content={article.contenu}></ArticleCell>
              )}
            </Col>
          </Row>
        </div>
        <ArticleModal
          isVisible={this.state.isModalVisible}
          handleOk={() => this.setState({
            isModalVisible: false,
            titre: "",
            contenu: ""
          })}
          handleCancel={() => this.setState({
            isModalVisible: false
          })}
        />
      </div>)
  }
}

export default App