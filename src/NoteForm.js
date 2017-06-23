import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

import './NoteForm.css'

class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: this.blankNote(),
      editorValue: RichTextEditor.createEmptyValue()
    }
  }

  componentWillReceiveProps({ match, notes }) {
    const idFromUrl = match.params.id
    const note = notes[idFromUrl] || this.blankNote()

    const noteNotFound = (idFromUrl && !note.id)
    if (noteNotFound) this.props.history.push('/notes')

    let editorValue = this.state.editorValue
    if (editorValue.toString('html') !== note.body) {
      editorValue = RichTextEditor.createValueFromString(note.body, 'html')
    }
   
    this.setState({ note, editorValue })
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  handleChanges = (ev) => {
    const note = {...this.state.note}
    note[ev.target.name] = ev.target.value
    this.setState(
      { note },
      this.props.saveNote(note)
    )
  }

  handleEditorChanges = (editorValue) => {
    const note = {...this.state.note}
    note.body = editorValue.toString('html')
    this.setState({ note, editorValue }, () => this.props.saveNote(note))
  }

  handleRemove = (ev) => {
    this.props.removeNote(this.state.note)
  }

  render() {
    return (
      <div className="NoteForm">
        <div className="form-actions">
          <button
            type="button"
            onClick={this.handleRemove}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
        <form>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title your note"
              onChange={this.handleChanges}
              value={this.state.note.title}
            />
          </p>
          <RichTextEditor
            name="body"
            placeholder="Just start typing..."
            value={this.state.editorValue}
            onChange={this.handleEditorChanges}
          />
        </form>
      </div>
    )
  }
}

export default NoteForm
