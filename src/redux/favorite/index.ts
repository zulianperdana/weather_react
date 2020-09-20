import { createSlice } from '@reduxjs/toolkit';
import FavoriteState from './state';
import { createBaseTransform } from '@utils/redux_persists_transformer';

export const FavoritePersistTransform = createBaseTransform((o) => new FavoriteState(o), 'favorite');

const initialState = new FavoriteState();

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<{ name: string; key: string }>) =>
            state.addFavorite(action.payload.name, action.payload.key),
        removeFavorite: (state, action: PayloadAction<string>) => state.removeFavorite(action.payload),
        removeBigCity: (state, action: PayloadAction<string>) => state.removeBigCity(action.payload),
    },
});

export const { addFavorite, removeBigCity, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
