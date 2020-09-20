import { List } from 'immutable';

interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase:
        | 'New Moon'
        | 'Waxing Crescent'
        | 'First Quarter'
        | 'Waxing Gibbous'
        | 'Full Moon'
        | 'Waning Gibbous'
        | 'Last Quarter'
        | 'Waning Crescent';
    moon_illumination: number;
}

interface DailyForecast {
    astro: Astro;
    date: Date;
    mintemp: number;
    maxtemp: number;
    avgtemp: number;
    totalsnow: number;
    sunhour: number;
    uv_index: number;
    hourly: Record<string, HourlyForecast>;
}

interface HourlyForecast {
    time: string;
    temperature: number;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    precip: number;
    humidity: number;
    visibility: number;
    pressure: number;
    cloudcover: number;
    heatindex: number;
    dewpoint: number;
    windchill: number;
    windgust: number;
    feelslike: number;
    chanceofrain: number;
    chanceofremdry: number;
    chanceofwindy: number;
    chanceofovercast: number;
    chanceofsunshine: number;
    chanceoffrost: number;
    chanceofhightemp: number;
    chanceoffog: number;
    chanceofsnow: number;
    chanceofthunder: number;
    uv_index: number;
}

export interface Forecast {
    forecasts: List<DailyForecast>;
}
