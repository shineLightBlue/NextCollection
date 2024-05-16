'use client'
import { useEffect, useState } from "react"
import { useFormState } from 'react-dom'
import NotePreview from '@/components/NotePreview'
import { deleteNote, saveNote } from "../app/actions"
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'
const initialState = {
    message: null
}
export default function NoteEditor({
    noteId,
    initialTitle,
    initialBody
}) {
    const [saveState, saveFormAction] = useFormState(saveNote, initialState)
    const [delState, delFormAction] = useFormState(deleteNote, initialState)
    const [title, setTitle] = useState(initialTitle)
    const [body, setBody] = useState(initialBody)
    const isDraft = !noteId
    console.log(saveState,'saveState')
    useEffect(()=>{
        console.log(saveState,'saveState useEffect')
        if(saveState.errors){
            console.log(saveState.errors)
        }
    },[saveState])
    return (
        <div className="note-editor">
            <form className="note-editor-form">
                <div className="note-editor-menu">
                    <input type="hidden" name="noteId" value={noteId} />
                    <SaveButton formAction={saveFormAction}></SaveButton>
                    <DeleteButton isDraft={isDraft} formAction={delFormAction}></DeleteButton>
                </div>
                <div className="note-editor-menu">
                    {saveState.errors && saveState.errors[0].message}
                </div>
                <label className="offscreen">
                    Enter a title for your note
                </label>
                <input type="text" id="note-title-input" value={title}
                    name="title"
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                <label className="offscreen">
                    Enter the body for your note
                </label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)}
                    name="body"></textarea>
            </form>
            <div className="note-editor-preview">
                <div className="label label--preview">Preview</div>
                <h1 className="note-title">{title}</h1>
                <NotePreview>{body}</NotePreview>
            </div>
        </div>
    )
}