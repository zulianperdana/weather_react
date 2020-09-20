import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import preferenceReducer, { PrefPersistTransform } from './preference';
import weathersReducer, { WeatherPersistTransform } from './weather';
import favoriteReducer, { FavoritePersistTransform } from './favorite';
import searchReducer, { SearchPersistTransform } from './search';
import noteReducer, { NotePersistTransform } from './note';
import { Api } from '@services/api';

const persistConfig = {
    key: 'root4',
    storage,
    transforms: [
        PrefPersistTransform,
        WeatherPersistTransform,
        FavoritePersistTransform,
        SearchPersistTransform,
        NotePersistTransform,
    ],
    stateReconciler: hardSet,
};

const rootReducer = combineReducers({
    preference: preferenceReducer,
    weathers: weathersReducer,
    favorite: favoriteReducer,
    note: noteReducer,
    search: searchReducer,
});

const createStore = (): any => {
    const api: Api = new Api();
    const store = configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: [thunk.withExtraArgument(api)],
    });
    const persistor = persistStore(store);
    return { persistor, store };
};

export type RootState = ReturnType<typeof rootReducer>;

export default createStore;
