import { setCity, setCurrentWeather, setForecast } from './index';
import createStore from '../store';
import { getCityByKey, getCurrentWeatherByKey, getForecastByKey } from './selector';
import { City, CurrentWeather, Forecast, getKey } from './models';

const city: City = {
    country: 'Indonesia',
    lat: 1,
    lon: 2,
    name: 'Jakarta',
    region: 'Asia',
    timezone_id: 'Asia/Jakarta',
    utc_offset: 8,
    loading: false,
    error: false,
};

const forecast: Forecast = {
    forecasts: [],
};

const currentWeather: CurrentWeather = {
    cloudcover: 1,
    wind_speed: 1,
    feelslike: 1,
    humidity: 1,
    observationt_time: '12.00 PM',
    precip: 1,
    pressure: 1,
    temperature: 1,
    unit: 'm',
    uv_index: 1,
    visibility: 1,
    weather_code: 1,
    weather_descriptions: ['a'],
    weather_icons: [''],
    wind_degree: 360,
    wind_dir: 'a',
};

describe('weather state', () => {
    it(`should handle setCity`, () => {
        const { store } = createStore();
        store.dispatch(setCity(city));
        expect(getCityByKey(store.getState(), getKey(city)).toJS()).toEqual(city);
    });

    it(`should handle setCurrentWeather`, () => {
        const { store } = createStore();
        store.dispatch(setCurrentWeather({ key: city.name, currentWeather }));
        expect(getCurrentWeatherByKey(store.getState(), getKey(city)).toJS()).toEqual(currentWeather);
    });

    it(`should handle setForecast`, () => {
        const { store } = createStore();
        store.dispatch(setForecast({ key: city.name, forecast }));
        expect(getForecastByKey(store.getState(), getKey(city)).toJS()).toEqual(forecast);
    });
});
