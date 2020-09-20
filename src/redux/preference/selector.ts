import { RootState } from '../store';

export const getIsDarkMode = (state: RootState): boolean => state.preference.darkMode;
export const getCurrentLocation = (state: RootState): string => state.preference.currentLocation;
