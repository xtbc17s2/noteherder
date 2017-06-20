import React from 'react'

import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './Sidebar.css'
import SignOut from './SignOut'

const Sidebar = ({ resetCurrentNote, signOut }) => {
  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={quill} alt="Noteherder" />
      </div>
      <button
        className="new-note"
        onClick={resetCurrentNote}
      >
        <img src={newHover} alt="New note" />
        <img className="outline" src={newIcon} alt="New note" />
      </button>
      <SignOut signOut={signOut} />
    </div>
  )
}

export default Sidebar
