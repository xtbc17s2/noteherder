import React from 'react'

import './Header.css'
import quill from './quill.svg'

const Header = () => {
  return (
    <header className="Header">
      <img src={quill} alt=""/>
      <span className="title">Noteherder</span>
    </header>
  )
}

export default Header
