import { Map } from 'immutable';
import { RootState } from '../store';

export const getCityNotes = (state: RootState, cityId: string): Map<string, string> => state.note.notes.get(cityId);
