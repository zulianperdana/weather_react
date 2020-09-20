import { Record, fromJS } from 'immutable';

export interface PreferenceStateProps {
    darkMode: boolean;
    currentLocation: string;
}

const defaultProps: PreferenceStateProps = {
    darkMode: false,
    currentLocation: '',
};

export default class PreferenceState extends Record(defaultProps) implements PreferenceStateProps {
    public readonly darkMode!: boolean;

    public constructor(values?: Partial<PreferenceStateProps>) {
        values ? super(fromJS(values)) : super();
    }

    public toggleDarkMode(value: boolean): PreferenceState {
        return this.set('darkMode', value);
    }

    public setCurrentLocation(value: string): PreferenceState {
        return this.set('currentLocation', value);
    }
}
