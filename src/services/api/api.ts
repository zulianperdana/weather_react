import { ApisauceInstance, create, ApiResponse } from 'apisauce';

import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { City, CurrentWeather } from '@redux/weather/models';

/**
 * Manages all requests to the API.
 */
export class Api {
    /**
     * The underlying apisauce instance which performs the requests.
     */
    apisauce: ApisauceInstance;

    /**
     * Configurable options.
     */
    config: ApiConfig;

    /**
     * Creates the api.
     *
     * @param config The configuration to use.
     */
    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config;
        // default instance
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
        });
        this.apisauce.addRequestTransform((request) => {
            request.params.access_key = process.env.NEXT_PUBLIC_API_KEY;
            return request;
        });
    }

    async getCurrentWeather(query: string): Promise<any> {
        // make the api call
        console.log('QUERY IS', query);
        const response: ApiResponse<any> = await this.apisauce.get(`/current`, {
            query,
        });
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem) {
                alert(problem.kind);
                return problem;
            }
        }
        try {
            console.log(response.data);
            const { current, location, request } = response.data;
            const city: City = {
                country: location.country,
                lat: location.lat,
                lon: location.lon,
                name: location.name,
                region: location.region,
                timezone_id: location.timezone_id,
                utc_offset: location.utc_offset,
            };
            const currentWeather: CurrentWeather = {
                unit: request.unit,
                observation_time: current.observation_time,
                temperature: current.temperature,
                weather_code: current.weather_code,
                weather_icons: current.weather_icons,
                weather_descriptions: current.weather_descriptions,
                wind_speed: current.wind_speed,
                wind_degree: current.wind_degree,
                wind_dir: current.wind_dir,
                pressure: current.pressure,
                precip: current.precip,
                humidity: current.humidity,
                cloudcover: current.cloudcover,
                feelslike: current.feelslike,
                uv_index: current.uv_index,
                visibility: current.visibility,
            };
            return { kind: 'ok', result: { city, currentWeather } };
        } catch {
            return { kind: 'bad-data', temporary: false };
        }
    }
}
