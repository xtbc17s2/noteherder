import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

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
          // finished signing in
          this.authHandler(user)
        } else {
          // finished signing out
          this.setState({ uid: null })
        }
      }
    )
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `notes/${this.state.uid}`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = `note-${Date.now()}`
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({
      notes,
      currentNote: note,
    })
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.resetCurrentNote()
    this.setState(
      { notes },
    )
  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  signOut = () => {
    auth
      .signOut()
      .then(
        () => {
          // stop syncing with Firebase
          base.removeBinding(this.ref)
          this.setState({
            notes: {},
            currentNote: this.blankNote()
          })
        }
      )
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
  }

  render() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      signOut: this.signOut,
    }
    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            <Main
              {...noteData}
              {...actions}
            />
          )} />
          <Route path="/sign-in" component={SignIn} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    )
  }
}

export default App;
