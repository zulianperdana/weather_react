import { addNote, editNote, removeNote } from './index';
import { getCityNotes } from './selector';
import createStore from '../store';

describe('favorite state', () => {
    it(`should handle addNote`, () => {
        const { store } = createStore();
        store.dispatch(addNote({ cityKey: '1', content: 'ok' }));
        expect(getCityNotes(store.getState(), '1').toList().get(0)).toEqual('ok');
    });

    it(`should handle editNote`, () => {
        const { store } = createStore();
        store.dispatch(addNote({ cityKey: '1', content: 'ok' }));
        expect(getCityNotes(store.getState(), '1').toList().get(0)).toEqual('ok');
        const key = store.getState().note.notes.get('1').keySeq().get(0);
        store.dispatch(editNote({ cityKey: '1', id: key, content: 'oye' }));
        expect(getCityNotes(store.getState(), '1').toList().get(0)).toEqual('oye');
    });

    it(`should handle editNote`, () => {
        const { store } = createStore();
        store.dispatch(addNote({ cityKey: '1', content: 'ok' }));
        expect(getCityNotes(store.getState(), '1').size).toEqual(1);
        const key = store.getState().note.notes.get('1').keySeq().get(0);
        store.dispatch(removeNote({ cityKey: '1', id: key }));
        expect(getCityNotes(store.getState(), '1').size).toEqual(0);
    });
});
