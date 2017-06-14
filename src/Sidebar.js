import React from 'react'

import quill from './quill.svg'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={quill} alt="Noteherder" />
      </div>
      <button className="new-note">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1152887/new-hover.png" alt="New note" />
        <img className="outline" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1152887/new.png" alt="New note" />
      </button>
    </div>
  )
}

export default Sidebar
