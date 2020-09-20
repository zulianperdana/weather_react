import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { spaces, mixins, colors } from '@styles/index';
import WeatherIcon from '@components/WeatherIcon';
import * as units from '@constants/units';

const { flex, alignCenter } = mixins;

const WeatherDetailRoot = styled.div`
    ${flex('column')}
    padding: ${spaces.big}px;
    margin-bottom: ${spaces.big}px;
    & > div:nth-child(2) {
        ${flex('row')}
        justify-content: space-between;
        ${alignCenter}
    }
    & > div:nth-child(1) {
        ${flex('row')}
        justify-content: space-between;
        ${alignCenter};
        & span {
            color: ${colors.yellow};
        }
    }
`;

const WeatherDetailContent = styled.div`
    ${flex('column')}
`;

const WeatherDetailContentItemGroup = styled.div`
    ${flex('row')}
    width:100%;
    margin: ${spaces.small}px 0px;
`;

const WeatherDetailContentItem = styled.div`
    ${flex('column')}
    flex-grow:1;
    width: 50px;
    & span:first-child {
        font-weight: bold;
    }
`;

interface WeatherDetailProps {
    title: string;
    temperature: number;
    weatherCode: number;
    loading: boolean;
    rain: number;
    humidity: number;
    windSpeed: number;
    airPressure: number;
    fallback: string;
    unit: string;
    favorite: boolean;
    toggleFavorite: () => any;
}

export default function index({
    title,
    temperature,
    weatherCode,
    favorite,
    toggleFavorite,
    rain,
    humidity,
    windSpeed,
    airPressure,
    fallback,
    unit,
}: WeatherDetailProps): JSX.Element {
    const currentUnit = unit == 'm' ? units.metric : unit == 's' ? units.scientific : units.fahrenheit;
    return (
        <Card>
            <WeatherDetailRoot>
                <div>
                    <h3>{title}</h3>
                    <span onClick={toggleFavorite}>{favorite ? 'Unfavorite' : 'Favorite'}</span>
                </div>
                <div>
                    <h1>
                        {temperature}°{currentUnit.temperature.substr(0, 1)}
                    </h1>
                    <WeatherIcon fallback={fallback} code={weatherCode} size={48} />
                </div>
                <WeatherDetailContent>
                    <WeatherDetailContentItemGroup>
                        <WeatherDetailContentItem>
                            <span>Rain</span>
                            <span>
                                {rain}
                                {currentUnit.precip}
                            </span>
                        </WeatherDetailContentItem>
                        <WeatherDetailContentItem>
                            <span>Humidity</span>
                            <span>{humidity}</span>
                        </WeatherDetailContentItem>
                    </WeatherDetailContentItemGroup>
                    <WeatherDetailContentItemGroup>
                        <WeatherDetailContentItem>
                            <span>Wind Speed</span>
                            <span>
                                {windSpeed}
                                {currentUnit.windSpeed}
                            </span>
                        </WeatherDetailContentItem>
                        <WeatherDetailContentItem>
                            <span>Air Pressure</span>
                            <span>
                                {airPressure} {currentUnit.pressure}
                            </span>
                        </WeatherDetailContentItem>
                    </WeatherDetailContentItemGroup>
                </WeatherDetailContent>
            </WeatherDetailRoot>
        </Card>
    );
}
