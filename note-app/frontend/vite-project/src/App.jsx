import React,{userState,useEffect, useState} from 'react';
import axios from 'axios';
import Notecard from './Notecard';
import './App.css'

const App=()=>{
  const[notes,setNotes]=useState([]);
  const[newNote,setNewNote]=useState({title:"",content:""});

  useEffect(()=>{
    axios.get("http://localhost:3000/notes").then((res)=>setNotes(res.data));
  },[]);


  const handleCreate=()=>{
    axios.post("http://localhost:3000/notes",newNote).then((res)=>{
      setNotes([...notes,res.data]);
      setNewNote({title:"",content:""});
    });
  };

const handleDelete=(id)=>{
  axios.delete(`http://localhost:3000/notes${id}`).then(()=>{
    setNotes(notes.filter((note)=>note._id!==id));
  })
}

return(
  <div className='container'>
    <h1>Notes App</h1>
    <input type="text" placeholder='Title' value={newNote.title} onChange={(e)=>
      setNewNote({...newNote,title:e.target.value})}/>
      <textarea placeholder="Content" value ={newNote.content} onChange={(e)=>
      setNewNote({...newNote,content:e.target.value})}></textarea>
        <button onClick={handleCreate}>Add Note</button>
        {notes.map((note)=>(
          <Notecard key={note._id} note={note} onDelete={handleDelete}/>
        ))}
      
  </div>
);
};
export default App;