import React from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

class PutMovieQuoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieQuote: {
        quote: 'But why is all the rum gone?',
        movie: 'Pirates of the Carribean',
        character: 'Jack Sparrow'
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

  putMessage = e => {
    e.preventDefault();
    // invoke this.props.putMessage here once it is written and passed in
    // then pass in the movie quote that is on state as an argument
    this.props.putMessage('72', this.state.movieQuote)
  };

  render() {
    return (
      <div className="quotes-form">
        <h2>PUT (update) a quote</h2>
        <form onSubmit={this.putMessage}>
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
          {this.props.putError ? (
            <ErrorMessage message={this.props.putError} />
          ) : null}
          {this.props.putSuccessMessage ? (
            <SuccessMessage message={this.props.putSuccessMessage} />
          ) : null}
          <button className="quotes-btn" type="submit">
            PUT quote
          </button>
        </form>
      </div>
    );
  }
}

export default PutMovieQuoteForm;
