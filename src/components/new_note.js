import React, { Component } from 'react';

class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = { noteTitle: '', id: 0 };
    this.onInputChange = this.onInputChange.bind(this);
    this.makeNote = this.makeNote.bind(this);
  }

  onInputChange(event) {
    this.setState({ noteTitle: event.target.value });
  }

  makeNote(event) {
    event.preventDefault();
    this.setState(prevState => ({
      id: prevState.id + 1,
    }));
    this.props.onNewNote(this.state.noteTitle, this.state.id);
    this.setState({ noteTitle: '' });
  }

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
