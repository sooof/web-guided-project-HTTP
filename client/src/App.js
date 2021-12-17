import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PostMovieQuoteForm from './components/PostMovieQuoteForm';
import PutMovieQuoteForm from './components/PutMovieQuoteForm';
import DeleteMovieQuoteForm from './components/DeleteMovieQuoteForm';

// import './App.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      postSuccessMessage: '',
      postError: '',
      putSuccessMessage: '',
      putError: '',
      deleteSuccessMessage: '',
      deleteError: '',
      showForm: 'delete'
    };
  }

  postMessage = quote => {
    // https://lambda-school-test-apis.herokuapp.com/ is the base url here
    axios
      .post('https://lambda-school-test-apis.herokuapp.com/quote', quote)
      .then(response => {
        this.setState({
          postSuccessMessage: response.data.successMessage,
          postError: ''
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          postSuccessMessage: '',
          postError: err.response.data.Error
        });
      });
  };

  putMessage = (id, updateQuote) => {
    // https://lambda-school-test-apis.herokuapp.com is the base url for the server
    // Make a POST request using axios to the endpoint /quotes/:id, where :id is the
    // .   id of whatever quote you are trying to update. For now this will just be
    // .   an arbitrary, hardcoded number.
    // Again, each quote needs to have all three fields - quote, character, and
    //     movie - in order to be a successful call. But, go ahead and try to
    //     make a request without one of the fields just to see how the server
    //     is going to handle errors.
    axios.put(`https://lambda-school-test-apis.herokuapp.com/quotes/${id}`,updateQuote)
      .then(resp=>{
        console.log("putMassage resp = ", resp)
        this.setState({
          putError: '',
          putSuccessMessage: resp.data.successMessage
        })
      })
      .catch(err=>{
        console.log(err)
        this.setState({
          putError: err.response.data.Error,
          putSuccessMessage: ''
        })
      })
  };

  deleteMessage = quote => {
    // https://lambda-school-test-apis.herokuapp.com is the base url for the server
    // Make a DELETE request using axios to the endpoint /quote/:id, where :id is the
    // .   id of whatever quote you are trying to delete. For now this will just be
    // .   an arbitrary, hardcoded number.
    axios.delete(`https://lambda-school-test-apis.herokuapp.com/quotes/${quote.id}`)
      .then(resp=>{
        console.log("deleteMessage resp=", resp)
        this.setState({
          deleteError:'',
          deleteSuccessMessage: resp.data.successMessage
        })
      })
      .catch(err=>{ 
        console.log(err)
        this.setState({
          deleteError: `${err.response.status} ${err.response.statusText}`,
          deleteSuccessMessage: ''
        })
      })
  };


  changeTabs = tab => {
    this.setState({
      showForm: tab,
      postSuccessMessage: '',
      postError: '',
      putSuccessMessage: '',
      putError: '',
      deleteSuccessMessage: '',
      deleteError: ''
    });
  };



  render() {
    return (
      <div className="App">
        <h1 className="app-header">Movie Quotes!</h1>
        <nav>
          <ul>
            <li
              onClick={() => this.changeTabs('post')}
              className={this.state.showForm === 'post' ? 'active' : null}
            >
              Post
            </li>
            <li
              onClick={() => this.changeTabs('put')}
              className={this.state.showForm === 'put' ? 'active' : null}
            >
              Put
            </li>
            <li
              onClick={() => this.changeTabs('delete')}
              className={this.state.showForm === 'delete' ? 'active' : null}
            >
              Delete
            </li>
          </ul>
        </nav>
        {this.state.showForm === 'post' && (
          <PostMovieQuoteForm
            postMessage={this.postMessage}
            postSuccessMessage={this.state.postSuccessMessage}
            postError={this.state.postError}
          />
        )}
        {this.state.showForm === 'put' && <PutMovieQuoteForm 
                                          putMessage={this.putMessage}
                                          putSuccessMessage={this.postSuccessMessage} 
                                          putError={this.state.putError} />}
        {this.state.showForm === 'delete' && <DeleteMovieQuoteForm 
                                          deleteMessage={this.deleteMessage} 
                                          deleteSuccessMessage={this.deleteSuccessMessage}
                                          deleteError={this.deleteError}/>}
      </div>
    );
  }
}

export default App;