import { Record, Map, fromJS } from 'immutable';
import { City, CurrentWeather, Forecast } from './models';

export interface WeatherStateProps {
    cities: Map<string, City>;
    currentWeathers: Map<string, CurrentWeather>;
    forecasts: Map<string, Forecast>;
}

const defaultProps: WeatherStateProps = {
    cities: Map<string, City>(),
    currentWeathers: Map<string, CurrentWeather>(),
    forecasts: Map<string, Forecast>(),
};

export default class WeatherState extends Record(defaultProps) implements WeatherStateProps {
    public readonly cities!: Map<string, City>;
    public readonly currentWeathers!: Map<string, CurrentWeather>;
    public readonly forecasts!: Map<string, Forecast>;

    public constructor(values?: Partial<WeatherStateProps>) {
        values ? super(fromJS(values)) : super();
    }

    public setCity(key: string, city: City): WeatherState {
        return this.update('cities', (v) => v.set(key, fromJS(city)));
    }

    public setForecast(key: string, forecast: Forecast): WeatherState {
        return this.update('forecasts', (v) => v.set(key, fromJS(forecast)));
    }

    public setCurrentWeather(key: string, currentWeather: CurrentWeather): WeatherState {
        return this.update('currentWeathers', (v) => v.set(key, fromJS(currentWeather)));
    }
}
