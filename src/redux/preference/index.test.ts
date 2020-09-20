import { toggleDarkMode, setCurrentLocation } from './index';
import { getIsDarkMode, getCurrentLocation } from './selector';
import createStore from '../store';

describe('preference state', () => {
    it(`should handle toggleDarkMode`, () => {
        const { store } = createStore();
        expect(getIsDarkMode(store.getState())).toEqual(false);
        store.dispatch(toggleDarkMode(true));
        expect(getIsDarkMode(store.getState())).toEqual(true);
        store.dispatch(toggleDarkMode(false));
        expect(getIsDarkMode(store.getState())).toEqual(false);
    });

    it(`should handle setCurrentLocation`, () => {
        const { store } = createStore();
        expect(getCurrentLocation(store.getState())).toEqual('');
        store.dispatch(setCurrentLocation('1'));
        expect(getCurrentLocation(store.getState())).toEqual('1');
    });
});
