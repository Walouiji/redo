import './App.css';
import React from 'react';
import AddButton from './Components/AddButton';
import ArticleModal from './Components/ArticleModal';
import Header from './Components/Header';
import ArticleCell from './Components/ArticleCell';
import Fire from './Fire';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      titre: "",
      contenu: "",
      articles: [],
      loading: true,
      loginEmail: "",
      loginPassword: "",
    }
  }


  componentDidMount() {
    const firebase = new Fire();
    firebase.getArticles(article => {
      this.setState({
        articles: article,
        loading: false
      });
    });
  }

  render() {
    const firebase = new Fire();

    console.log(firebase.imageRef);
    return (
      <div className="App">
        <header className="App-header">
          <Header className="App-header" />
        </header>
        <div className="App-body">
              {this.state.articles.map((article) =>
                <ArticleCell key={article.id} article={article}>
                  <AddButton
                    handleClick={() => this.setState({
                      isModalVisible: true,
                      type: 'update'
                    })}
                    content="modifier un article"
                  />
                </ArticleCell>
              )}
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