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
    }
  }

  componentWillMount() {
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          this.authHandler(user)
        } else {
          // finished signing out
          this.unauthHandler()
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

  stopSyncing = () => {
    if (this.ref) {
      base.removeBinding(this.ref)
    }
  }

  saveNote = (note) => {
    let shouldRedirect = false
    if (!note.id) {
      note.id = `note-${Date.now()}`
      shouldRedirect = true
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
    if (shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState({ notes })
    this.props.history.push('/notes')
  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  unauthHandler = () => {
    this.stopSyncing()
    this.setState({
      notes: {},
      uid: null,
    })
  }

  signOut = () => {
    auth.signOut()
  }

  render() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      signOut: this.signOut,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            this.signedIn()
              ? <Main
                  notes={this.state.notes}
                  {...actions}
                />
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
    )
  }
}

export default App;
