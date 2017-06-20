import React, { Component } from 'react'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'
import base, { auth } from './base'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      uid: null,
      currentNote: this.blankNote(),
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler(user)
        }
      }
    )
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = `note-${Date.now()}`
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes, currentNote: note })
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState(
      { notes },
      this.resetCurrentNote()
    )
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (userData) => {
    this.setState(
      { uid: userData.uid },
      this.syncNotes
    )
  }

  signOut = () => {
    auth
      .signOut()
      .then(
        () => {
          base.removeBinding(this.ref)
          this.resetCurrentNote()
          this.setState({ uid: null, notes: {} })
        }
      )
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  renderMain = () => {
    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
    }
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      signOut: this.signOut,
    }
    return (
      <Main
        {...noteData}
        {...actions}
      />
    )
  }

  render() {
    return (
      <div className="App">
        { this.signedIn() ? this.renderMain() : <SignIn /> }
      </div>
    );
  }
}

export default App;
