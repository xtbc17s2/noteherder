import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
  return (
    <div className="Main">
      <Sidebar
        resetCurrentNote={props.resetCurrentNote}
        signOut={props.signOut}
      />
      <NoteList
        notes={props.notes}
        setCurrentNote={props.setCurrentNote}
      />
      <Switch>
        <Route path="/notes/:id" render={(navProps) => (
          <NoteForm {...props} {...navProps} />
        )} />
        <Route render={(navProps) => (
          <NoteForm {...props} {...navProps} />
        )} />
      </Switch>
    </div>
  )
}

export default Main
