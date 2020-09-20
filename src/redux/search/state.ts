import { Record, List, fromJS } from 'immutable';

export interface SearchStateProps {
    query: string;
    results: List<string>;
}

const defaultProps: SearchStateProps = {
    query: '',
    results: List<string>(),
};

export default class SearchState extends Record(defaultProps) implements SearchStateProps {
    public readonly query!: string;
    public readonly results!: List<string>;

    public constructor(values?: Partial<SearchStateProps>) {
        values ? super(fromJS(values)) : super();
    }

    public setQuery(query: string): SearchState {
        return this.set('query', query);
    }

    public setResults(results: string[]): SearchState {
        return this.set('results', List(results));
    }
}
