import { createSlice } from '@reduxjs/toolkit';
import SearchState from './state';
import { createBaseTransform } from '@utils/redux_persists_transformer';

export const SearchPersistTransform = createBaseTransform((o) => new SearchState(o), 'search');

const initialState = new SearchState();

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => state.setQuery(action.payload),
        setResults: (state, action: PayloadAction<string[]>) => state.setResults(action.payload),
    },
});

export const { setQuery, setResults } = searchSlice.actions;

export default searchSlice.reducer;
