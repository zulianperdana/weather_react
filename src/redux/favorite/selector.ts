import { List } from 'immutable';
import { RootState } from '../store';
import { City } from './state';

export const getFavorites = (state: RootState): List<City> =>
    state.favorite.favorites.sortBy((c: any) => c.get('name'));
export const getBigCities = (state: RootState): List<City> =>
    state.favorite.bigCities.sortBy((c: any) => c.get('name'));
