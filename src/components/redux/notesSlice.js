import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks pour les opérations asynchrones
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('http://localhost:3000/notes');
  return response.data;
});

export const addNote = createAsyncThunk('notes/addNote', async (newNote) => {
  const response = await axios.post('http://localhost:3000/notes', newNote);
  return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ id, updatedNote }) => {
  const response = await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`http://localhost:3000/notes/${id}`);
  return id;
});

// Slice Redux pour les notes
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.items.findIndex((note) => note.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((note) => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
