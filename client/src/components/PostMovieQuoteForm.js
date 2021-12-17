import React from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

class PostMovieQuoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieQuote: {
        quote: '',
        movie: '',
        character: ''
      }
    };
  }

  handleChange = e => {
    this.setState({
      movieQuote: {
        ...this.state.movieQuote,
        [e.target.name]: e.target.value
      }
    });
  };

  postMessage = e => {
    e.preventDefault();
    this.props.postMessage(this.state.movieQuote);
  };

  render() {
    return (
      <div className="quotes-form">
        <h2>POST (add) a new quote</h2>
        <form onSubmit={this.postMessage}>
          <input
            type="text"
            name="quote"
            placeholder="Quote"
            onChange={this.handleChange}
            value={this.state.movieQuote.quote}
          />
          <input
            type="text"
            name="character"
            placeholder="Character"
            onChange={this.handleChange}
            value={this.state.movieQuote.character}
          />
          <input
            type="text"
            name="movie"
            placeholder="Movie"
            onChange={this.handleChange}
            value={this.state.movieQuote.movie}
          />
          {this.props.postError ? (
            <ErrorMessage message={this.props.postError} />
          ) : null}
          {this.props.postSuccessMessage ? (
            <SuccessMessage message={this.props.postSuccessMessage} />
          ) : null}
          <button className="quotes-btn" type="submit">
            POST quote
          </button>
        </form>
      </div>
    );
  }
}

export default PostMovieQuoteForm;
