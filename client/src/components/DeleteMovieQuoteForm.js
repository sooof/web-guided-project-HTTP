import React from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

class DeleteMovieQuoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieQuote: {
        quote: "Toto, I've got a feeling we're not in Kansas anymore.",
        movie: 'Wizard of Oz',
        character: 'Dorothy'
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

  deleteMessage = e => {
    e.preventDefault();
    // invoke this.props.deleteMessage here once it is written and passed in
    this.props.deleteMessage('243567')
  };

  render() {
    return (
      <div className="quotes-form">
        <h2>DELETE (delete) a quote</h2>
        <form onSubmit={this.deleteMessage}>
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
          {this.props.deleteError ? (
            <ErrorMessage message={this.props.deleteError} />
          ) : null}
          {this.props.deleteSuccessMessage ? (
            <SuccessMessage message={this.props.deleteSuccessMessage} />
          ) : null}
          <button className="quotes-btn" type="submit">
            DELETE quote
          </button>
        </form>
      </div>
    );
  }
}

export default DeleteMovieQuoteForm;
