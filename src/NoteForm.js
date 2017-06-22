import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
  componentWillReceiveProps(nextProps) {
    const nonBlankIdFromUrl = nextProps.match.params.id

    if (nonBlankIdFromUrl) {
      if (this.notAlreadyEditing(nonBlankIdFromUrl)) {
        this.loadNoteWith(nonBlankIdFromUrl, { from: nextProps.notes })
        || this.handleMissingNote({ from: nextProps.notes })
      }
    } else if (this.currentlyEditingNonBlankNote()) {
      this.props.resetCurrentNote()
    }
  }

  loadNoteWith = (noteId, { from }) => {
    console.log('loadNoteWith')
    const noteCollection = from
    const note = noteCollection[noteId]
    if (!note) return false
    this.props.setCurrentNote(note)
  }

  handleMissingNote = ({ from }) => {
    const noteCollection = from
    this.keepWaitingForFirebase(noteCollection) || this.noteDoesNotExist()
  }

  noteDoesNotExist = () => {
    console.log('noteDoesNotExist')
    this.props.history.push('/notes')
  }

  notAlreadyEditing = (noteId) => {
    console.log('currentlyEditingNonBlankNote')
    return noteId !== this.props.currentNote.id
  }

  currentlyEditingNonBlankNote = () => {
    console.log('currentlyEditingNonBlankNote', this.props.currentNote.id)
    return Boolean(this.props.currentNote.id)
  }

  keepWaitingForFirebase = (notes) => {
    console.log('keepWaitingForFirebase', (Object.keys(notes)))
    return Object.keys(notes).length === 0
  }

  handleChanges = (ev) => {
    const note = {...this.props.currentNote}
    note[ev.target.name] = ev.target.value
    this.props.saveNote(note)
  }

  handleRemove = (ev) => {
    this.props.removeNote(this.props.currentNote)
  }

  render() {
    return (
      <div className="NoteForm">
        <form>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title your note"
              onChange={this.handleChanges}
              value={this.props.currentNote.title}
            />
          </p>
          <p>
            <textarea
              name="body"
              placeholder="Just start typing..."
              onChange={this.handleChanges}
              value={this.props.currentNote.body}
            ></textarea>
          </p>
          <button
           type="button"
           onClick={this.handleRemove}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default NoteForm
