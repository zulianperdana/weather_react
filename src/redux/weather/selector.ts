import { RootState } from '../store';
import { City, CurrentWeather, Forecast } from './models';

export const getCityByKey = (state: RootState, key: string): City => state.weathers.cities.get(key);
export const getCurrentWeatherByKey = (state: RootState, key: string): CurrentWeather =>
    state.weathers.currentWeathers.get(key);
export const getForecastByKey = (state: RootState, key: string): Forecast => state.weathers.forecasts.get(key);
