import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.css'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import SignOut from './SignOut'

const Sidebar = ({ signOut }) => {
  return (
    <nav className="Sidebar">
      <div className="logo">
        <img src={quill} alt="Noteherder" />
      </div>
      <Link to="/notes" className="new-note">
        <img src={newHover} alt="New note" />
        <img className="outline" src={newIcon} alt="New note" />
      </Link>
      <SignOut signOut={signOut} />
    </nav>
  )
}

export default Sidebar
