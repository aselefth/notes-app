import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import Note from "./components/Note";
import { useEffect, useState } from "react";
import { addNote } from "./store/notesSlice";

function App() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  return (
    <div className="App flex relative ml-[10rem]">
      <Navigation />
      <div className="w-[100%]">
        {notes.length == 0 ? <Home /> : ""}
        {notes.map((note) =>
          note.active == true ? <Note key={note.id} note={note} /> : ""
        )}
      </div>
      <div
        className="fixed bottom-8 left-8 shadow-md bg-gray-400 w-[3rem] h-[3rem] m-0 rounded-[1rem] text-2xl font-bold cursor-pointer flex justify-center items-center hover:opacity-[.85]"
        onClick={() => dispatch(addNote())}
      >
        +
      </div>
    </div>
  );
}

export default App;
