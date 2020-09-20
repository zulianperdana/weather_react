import { Record, Map, fromJS } from 'immutable';
import { v4 as uuidv4 } from 'uuid';

export interface NoteStateProps {
    // the first string key is lat, lon string = `${lat},${lon}`
    // the second string is uuid
    notes: Map<string, Map<string, string>>;
}

const defaultProps: NoteStateProps = {
    notes: Map<string, Map<string, string>>(),
};

export default class NoteState extends Record(defaultProps) implements NoteStateProps {
    public readonly notes!: Map<string, Map<string, string>>;

    public constructor(values?: Partial<NoteStateProps>) {
        values ? super(fromJS(values)) : super();
    }

    private setNote(cityKey: string, id: string, content: string) {
        return this.update('notes', (v) => v.update(cityKey, Map<string, string>(), (vv) => vv.set(id, content)));
    }

    public addNote(cityKey: string, content: string): NoteState {
        const id = uuidv4();
        return this.setNote(cityKey, id, content);
    }

    public editNote(cityKey: string, id: string, content: string): NoteState {
        return this.setNote(cityKey, id, content);
    }

    public removeNote(cityKey: string, id: string): NoteState {
        return this.update('notes', (v) => v.update(cityKey, (vv) => vv.delete(id)));
    }
}
