import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCfl8ayqF7KvR3UeOMVzgEopIsD98MgSFw',
  authDomain: 'react-notes-a3aba.firebaseapp.com',
  databaseURL: 'https://react-notes-a3aba.firebaseio.com',
  projectId: 'react-notes-a3aba',
  storageBucket: 'react-notes-a3aba.appspot.com',
  messagingSenderId: '441343825174',
};

Firebase.initializeApp(config);

const database = Firebase.database();

function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

function makeNewNote(titleOfNote) {
  database.ref('notes').push().set({
    title: titleOfNote,
    text: '',
    x: Math.floor(Math.random() * 1000),
    y: Math.floor(Math.random() * 500),
    zIndex: 0,
  });
}

function noteDelete(id) {
  database.ref('notes').child(id).remove();
}

function noteText(id, newText) {
  database.ref('notes').child(id).update({ text: newText });
}

function noteTitleText(id, newTitle) {
  database.ref('notes').child(id).update({ title: newTitle });
}

function notePosition(id, xPos, yPos) {
  database.ref('notes').child(id).update({ x: xPos, y: yPos });
}

export {
  fetchNotes, makeNewNote, noteDelete, noteText, noteTitleText, notePosition,
};
