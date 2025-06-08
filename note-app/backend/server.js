require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

mongoose
.connect("mongodb://127.0.0.1:27017/notesapp")
.then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log("Mongodb coneection error",err));

const NoteSchema=new mongoose.Schema(
    {
        title:String,
        content:String,
    }
);
const Note=mongoose.model("Note",NoteSchema);

app.post('/notes',async(req,res)=>{
    const newNote=new Note(req.body);
    await newNote.save();
    console.log("Note created: ",newNote);
    res.jason(newNote);
});

app.get('/note',async(req,res)=>{
    const notes=await Note.find();
    res.jason(notes);
});

app.put('/notes/:id',async(req,res)=>{
    const note=awaitNote.findByIDandUpdate(req.params.id,req.body,{new:true});
    console.log("Note updated",note);
    res.json(note);
});

app.delete('/notes/:id',async(req,res)=>{
    await Note.findByIDandDelete(req.params.id);
    console.log("Note Deleted",req.params.id);
    res.json(note);
});

app.listen(3000,()=>console.log("Server started on port 3000"));