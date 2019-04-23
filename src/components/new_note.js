import React, { Component } from 'react';

class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = { noteTitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.makeNote = this.makeNote.bind(this);
  }

  // when the user starts typing in the input update noteTitle with the input
  onInputChange(event) {
    this.setState({ noteTitle: event.target.value });
  }

  // when the user clicks "add note" pass the data back up to the parent (App component)
  // learned how to pass props from child to parents from this: https://stackoverflow.com/questions/38394015/how-to-pass-data-from-child-component-to-its-parent-in-reactjs
  makeNote(event) {
    event.preventDefault();
    this.props.onNewNote(this.state.noteTitle);
    this.setState({ noteTitle: '' });
  }

  // learned how to submit data from input here: https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
  render() {
    return (
      <div id="add-note">
        <form onSubmit={this.makeNote}>
          <input onChange={this.onInputChange} type="text" placeholder="Enter a title for note" value={this.state.noteTitle} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NewNote;
