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
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler(user)
        }
      }
    )
  }

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
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

  saveNote = (note) => {
    let shouldRedirect = false
    if (!note.id) {
      note.id = `note-${Date.now()}`
      shouldRedirect = true
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes, currentNote: note })
    if (shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.resetCurrentNote()
    this.setState(
      { notes },
      this.props.history.push('/notes')
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
    localStorage.setItem('uid', userData.uid)
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
          this.resetCurrentNote()
          localStorage.removeItem('uid')
          this.setState({ uid: null, notes: {} })
          base.removeBinding(this.ref)
        }
      )
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  render() {
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
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            this.signedIn()
              ? <Main {...noteData} {...actions} />
              : <Redirect to="/sign-in" />
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn()
              ? <SignIn />
              : <Redirect to="/notes" />
          )} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
