import React from 'react'
import { Link } from 'react-router-dom'

import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './Sidebar.css'
import SignOut from './SignOut'

const Sidebar = ({ signOut }) => {
  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={quill} alt="Noteherder" />
      </div>
      <Link to="/notes" className="new-note">
        <button>
          <img src={newHover} alt="New note" />
          <img className="outline" src={newIcon} alt="New note" />
        </button>
      </Link>
      <SignOut signOut={signOut} />
    </div>
  )
}

export default Sidebar
