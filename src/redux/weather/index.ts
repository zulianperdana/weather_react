import { createSlice } from '@reduxjs/toolkit';
import WeatherState from './state';
import { City, CurrentWeather, Forecast } from './models';
import { fetchCurrentWeather } from './thunk';
import { createBaseTransform } from '@utils/redux_persists_transformer';

export const WeatherPersistTransform = createBaseTransform((o) => new WeatherState(o), 'weathers');

const initialState = new WeatherState();

const weathersSlice = createSlice({
    name: 'weathers',
    initialState: initialState,
    reducers: {
        setCity: (state, action: PayloadAction<City>) => state.setCity(action.payload.name, action.payload),
        setForecast: (state, action: PayloadAction<{ forecast: Forecast; key: string }>) =>
            state.setForecast(action.payload.key, action.payload.forecast),
        setCurrentWeather: (state, action: PayloadAction<{ currentWeather: CurrentWeather; key: string }>) =>
            state.setCurrentWeather(action.payload.key, action.payload.currentWeather),
    },
    extraReducers: {
        [fetchCurrentWeather.fulfilled as any]: (state, { payload, meta }) => {
            const { result } = payload;
            if (result === undefined) {
                console.log('INI PAYLOAD', payload);
                return state;
            }
            const { city, currentWeather } = result;
            return state.setCity(meta.arg, city).setCurrentWeather(meta.arg, currentWeather);
        },
    } as any,
});

weathersSlice.actions.setCity();

export const { setCity, setCurrentWeather, setForecast } = weathersSlice.actions;

export default weathersSlice.reducer;
