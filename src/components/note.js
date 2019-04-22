/* eslint-disable react/no-danger */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditStatus = this.onEditStatus.bind(this);
    this.onTextEdit = this.onTextEdit.bind(this);
    this.editBody = this.editBody.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.moving = this.moving.bind(this);
  }

  onDeleteClick(event) {
    this.props.deleteNote(this.props.id);
  }

  onEditStatus(event) {
    event.preventDefault();
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  onTextEdit(event) {
    this.props.editText(this.props.id, event.target.value);
  }

  onChangeTitle(event) {
    event.preventDefault();
    this.props.changeTitle(this.props.id, event.target.value);
  }

  moving(event, ui) {
    // this.props.note.x = ui.x;
    // this.props.note.y = ui.y;
    this.props.moveNote(this.props.id, ui.x, ui.y);
  }

  editTitle() {
    if (this.state.isEditing) {
      return (
        <input type="text" onChange={this.onChangeTitle} value={this.props.note.title} />
      );
    } else {
      return (
        console.log('enter title note'),
          <h3>{this.props.note.title}</h3>
      );
    }
  }

  editBody() {
    console.log(this.state.isEditing);
    if (this.state.isEditing) {
      return (
        <div className="note-content">
          <TextareaAutosize className="text-content" onChange={this.onTextEdit} value={this.props.note.text} />;
        </div>
      );
    } else {
      return (
        console.log('enter title note'),
          <div className="note-content">
            <div className="text-content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
          </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".moving-note"
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStart}
        onDrag={this.moving}
        onStop={this.onStopDrag}
      >
        <div id="each-note">
          <div className="note-attributes">
            {this.editTitle()}
            <div className="note-buttons">
              <i tabIndex="-1" role="button" onClick={this.onDeleteClick} className="fas fa-trash" />
              <i tabIndex="-1" role="button" onClick={this.onDrag} className="moving-note fa fa-arrows-alt" />
              <i tabIndex="-1" role="button" onClick={this.onEditStatus} className="far fa-edit" />
            </div>
          </div>
          {this.editBody()}
        </div>
      </Draggable>
    );
  }
}
export default Note;
