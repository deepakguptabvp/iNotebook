import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success") 
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><h5>Title</h5></label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Enter your Title Here"  value={note.title} onChange={onChange} minLength={5} required/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><h5>Description</h5></label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter your Description Here" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><h5>Tag</h5></label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter your Tag Here" value={note.tag} onChange={onChange} minLength={5} required/>
                </div>

                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote