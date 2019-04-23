/* eslint-disable class-methods-use-this */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';
import NewNote from './components/new_note';
import * as db from './services/datastore';
import './style.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Map(),
    };
  }

  // fetching the notes map everytime somethign is rendered again
  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  // telling firebase to create a new note with the specific title
  createNote(noteTitle) {
    db.makeNewNote(noteTitle);
  }

  // telling firebase to delete the note
  deleteNote(id) {
    db.noteDelete(id);
  }

  // telling firebase to edit the text in the body of the note
  editText(id, text) {
    db.noteText(id, text);
  }

  // telling firebase to change the title to what the user specified
  changeTitle(id, title) {
    db.noteTitleText(id, title);
  }

  // telling firebase that the note was moved so update its location
  moveNote(id, xpos, ypos) {
    db.notePosition(id, xpos, ypos);
  }

  render() {
    return (
      <div>
        <div id="directions">
          <h3>Type and Enter to Add Note</h3>
        </div>
        <div>
          <NewNote onNewNote={this.createNote} />
        </div>
        <div>
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note id={id}
                note={note}
                deleteNote={key => this.deleteNote(key)}
                editText={(keyId, text) => this.editText(keyId, text)}
                changeTitle={(eachId, title) => this.changeTitle(eachId, title)}
                moveNote={(idKey, xPos, yPos) => this.moveNote(idKey, xPos, yPos)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
