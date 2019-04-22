/* eslint-disable new-cap */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';
import NewNote from './components/new_note';
// import * as db from './services/datastore';
import './style.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Map(),
    };
    this.createNote = this.createNote.bind(this);
  }

  createNote(noteTitle, id) {
    this.setState(prevState => ({
      notes: prevState.notes.set(id, {
        title: noteTitle,
        text: '',
        x: 0,
        y: 0,
        zIndex: 0,
      }),
    }));
  }

  deleteNote(id) {
    this.setState(prevState => ({
      notes: prevState.notes.delete(id),
    }));
  }

  editText(id, text1) {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => {
        return (
          Object.assign({}, n, { text: text1 })
        );
      }),
    }));
  }

  changeTitle(id, title1) {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => {
        return (
          Object.assign({}, n, { title: title1 })
        );
      }),
    }));
  }

  moveNote(id, xpos, ypos) {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => {
        return (
          Object.assign({}, n, { x: xpos, y: ypos })
        );
      }),
    }));
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
