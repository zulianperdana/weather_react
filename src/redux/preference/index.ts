import { createSlice } from '@reduxjs/toolkit';
import PreferenceState from './state';
import { createBaseTransform } from '@utils/redux_persists_transformer';

export const PrefPersistTransform = createBaseTransform((o) => new PreferenceState(o), 'preference');

const initialState = new PreferenceState();

const preferenceSlice = createSlice({
    name: 'preference',
    initialState: initialState,
    reducers: {
        toggleDarkMode: (state, action: PayloadAction<boolean>) => state.toggleDarkMode(action.payload),
        setCurrentLocation: (state, action: PayloadAction<string>) => {
            console.log('state', state);
            return state.setCurrentLocation(action.payload);
        },
    },
});

export const { toggleDarkMode, setCurrentLocation } = preferenceSlice.actions;

export default preferenceSlice.reducer;
