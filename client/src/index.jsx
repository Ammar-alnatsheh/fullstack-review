import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

    this.search = this.search.bind(this);
    this.successCB = this.successCB.bind(this);

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO

    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({ 'user': `${term}` }),
      contentType: 'application/json',
      success: this.successCB,
      error: function(error) {
        console.error('Failed to fetch repos', error);
      }
    });

  }

  successCB(data) {
    console.log("got data from the server",data);
    var result = [];
    data.forEach(element => {
      result.push(element.name);
    });

    this.setState({
      repos: result
    });

  };

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));