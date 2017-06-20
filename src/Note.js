import React from 'react'

const Note = ({ note, setCurrentNote }) => {
  return (
    <a onClick={() => setCurrentNote(note)}>
      <li>
        <div className="note">
          <div className="note-title">
            {note.title}
          </div>
          <div className="note-body">
            <p>
              {note.body}
            </p>
          </div>
        </div>
      </li>
    </a>
  )
}

export default Note
