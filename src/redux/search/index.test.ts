import { setQuery, setResults } from './index';
import { getQueryString, getSearchResults } from './selector';
import createStore from '../store';

describe('search state', () => {
    it(`should handle setQuery`, () => {
        const { store } = createStore();
        expect(getQueryString(store.getState())).toEqual('');
        store.dispatch(setQuery('ok'));
        expect(getQueryString(store.getState())).toEqual('ok');
    });

    it(`should handle setResults`, () => {
        const { store } = createStore();
        expect(getSearchResults(store.getState()).length).toEqual(0);
        store.dispatch(setResults(['a', 'b', 'c']));
        expect(getSearchResults(store.getState()).length).toEqual(3);
    });
});
