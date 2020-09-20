import { addFavorite, removeFavorite, removeBigCity } from './index';
import { getFavorites, getBigCities } from './selector';
import createStore from '../store';

describe('favorite state', () => {
    it(`should handle addFavorite`, () => {
        const { store } = createStore();
        store.dispatch(addFavorite({ name: 'Surabaya', key: '1' }));
        expect(getFavorites(store.getState()).size).toEqual(1);
    });

    it(`should handle addFavorite duplicate`, () => {
        const { store } = createStore();
        store.dispatch(addFavorite({ name: 'Surabaya', key: '1' }));
        expect(getFavorites(store.getState()).size).toEqual(1);
        store.dispatch(addFavorite({ name: 'Surabaya', key: '1' }));
        expect(getFavorites(store.getState()).size).toEqual(0);
    });

    it('should handle removeFavorite', () => {
        const { store } = createStore();
        store.dispatch(addFavorite({ name: 'Surabaya', key: '1' }));
        expect(getFavorites(store.getState()).size).toEqual(1);
        store.dispatch(removeFavorite('1'));
        expect(getFavorites(store.getState()).size).toEqual(0);
    });

    it('should handle removeBigCity', () => {
        const { store } = createStore();
        expect(getBigCities(store.getState()).size).toEqual(15);
        store.dispatch(removeBigCity('Tokyo'));
        expect(getBigCities(store.getState()).size).toEqual(14);
    });
});
