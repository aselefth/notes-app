import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {v4} from 'uuid';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: []
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.map(note => note.active = false);
      state.notes.push({
        name: 'new note',
        text: '',
        id: v4(),
        active: true,
        readOnly: false,
        fontSize: 14,
        italic: false,
        bold: false
      });
    }, 
    changeNote: (state, action) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      note.name = action.payload.name;
      note.text = action.payload.text;
      
    },
    setActive: (state, action) => {
      state.notes = state.notes.map(note => {return {...note, active: false}})
      const note = state.notes.find(note => note.id == action.payload.id)
      note.active = true;
     
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
      if (state.notes.length > 1) 
      state.notes[state.notes.length - 1].active = true;
    },
    toggleReadOnly: (state, action) => {
      const note = state.notes.find(note => note.id == action.payload.id);
      note.readOnly = !note.readOnly;
    },
    changeNoteFontSize: (state, action) => {
      const note = state.notes.find(note => note.id == action.payload.id);
      note.fontSize = action.payload.fontSize;
    },
    toggleItalic: (state, action) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      note.italic = !note.italic;
    },
    toggleBold: (state, action) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      note.bold = !note.bold;
    }
  }
})

export const {
  addNote, 
  changeNote, 
  setActive, 
  removeNote, 
  toggleReadOnly, 
  changeNoteFontSize,
  toggleItalic,
  toggleBold
} = notesSlice.actions;
export default notesSlice.reducer;