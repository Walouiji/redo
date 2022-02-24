import './App.css';
import React from 'react';
import AddButton from './Components/AddButton';
import ArticleModal from './Components/ArticleModal';
import Header from './Components/Header';
import TextArea from 'antd/lib/input/TextArea';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      titre: "",
      contenu: ""
    }
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <Header className="App-header" />
      </header>
      <div className="App-body">
        <p>
          Welcome to Redo, the best news website ever !
        </p>
        <AddButton
          handleClick={() => this.setState({ isModalVisible: true })}
          content="Ajouter un article"
        />
        <ArticleModal
          isVisible={this.state.isModalVisible}
          handleOk={() => this.setState({
            isModalVisible: false,
            titre: "",
            contenu:  ""
          })}
          handleCancel={() => this.setState({
            isModalVisible: false
          })}
        />
      </div>
    </div>
  }
}

export default App