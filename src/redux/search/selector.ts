import { RootState } from '../store';

export const getQueryString = (state: RootState): string => state.search.query;
export const getSearchResults = (state: RootState): string[] => state.search.results.toJS();
