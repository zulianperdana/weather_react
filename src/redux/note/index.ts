import { createSlice } from '@reduxjs/toolkit';
import NoteState from './state';
import { createBaseTransform } from '@utils/redux_persists_transformer';

export const NotePersistTransform = createBaseTransform((o) => new NoteState(o), 'note');

const initialState = new NoteState();

const noteSlice = createSlice({
    name: 'note',
    initialState: initialState,
    reducers: {
        addNote: (state, action: PayloadAction<{ cityKey: string; content: string }>) =>
            state.addNote(action.payload.cityKey, action.payload.content),
        editNote: (state, action: PayloadAction<{ cityKey: string; id: string; content: string }>) =>
            state.editNote(action.payload.cityKey, action.payload.id, action.payload.content),
        removeNote: (state, action: PayloadAction<{ cityKey: string; id: string }>) =>
            state.removeNote(action.payload.cityKey, action.payload.id),
    },
});

export const { addNote, editNote, removeNote } = noteSlice.actions;

export default noteSlice.reducer;
