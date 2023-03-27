import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmOGVmMjJhNTE1ZTEwMTFkOTFmZDAyIn0sImlhdCI6MTY2MDQ4MzI1M30.-GUxdbXqK2mYbSrduO_ZD0ACQOrf2En4SOcTDHDQDDc'
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmOGVmMjJhNTE1ZTEwMTFkOTFmZDAyIn0sImlhdCI6MTY2MDQ4MzI1M30.-GUxdbXqK2mYbSrduO_ZD0ACQOrf2En4SOcTDHDQDDc'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmOGVmMjJhNTE1ZTEwMTFkOTFmZDAyIn0sImlhdCI6MTY2MDQ4MzI1M30.-GUxdbXqK2mYbSrduO_ZD0ACQOrf2En4SOcTDHDQDDc'
      }
    });
    const json = response.json();
    console.log(json);
     
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmOGVmMjJhNTE1ZTEwMTFkOTFmZDAyIn0sImlhdCI6MTY2MDQ4MzI1M30.-GUxdbXqK2mYbSrduO_ZD0ACQOrf2En4SOcTDHDQDDc'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;








// console.log("Adding a new note");
// const note = {
//   "_id": "62fb9f279a333ed3f481c1937",
//   "user": "62f8ef22a515e1011d91fd02",
//   "title": title,
//   "description": description,
//   "tag": tag,
//   "date": "2022-08-16T13:44:07.303Z",
//   "__v": 0
// };



// {
//   'Content-Type': 'application/json',
//     "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmOGVmMjJhNTE1ZTEwMTFkOTFmZDAyIn0sImlhdCI6MTY2MDQ4MzI1M30.-GUxdbXqK2mYbSrduO_ZD0ACQOrf2En4SOcTDHDQDDc'
// },