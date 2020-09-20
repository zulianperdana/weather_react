import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { spaces, mixins } from '@styles/index';
import { getCityByKey, getCurrentWeatherByKey } from '@redux/weather/selector';
import WeatherIcon from '@components/WeatherIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from '@redux/weather/thunk';
import { useQuery } from 'react-query';

const { flex, alignCenter } = mixins;

const WeatherItemCardRoot = styled.div`
    ${flex('row')}
    ${alignCenter}
    padding: ${spaces.big}px;
    margin-bottom: ${spaces.big}px;
    & > * {
        flex-grow: 1;
    }
    & > h2 {
        text-align: right;
    }
    & > div {
        ${flex('column')}
    }
    & img {
        align-self: center;
    }
    & h3 {
        font-weight: bold;
    }
`;

const DeleteButton = styled.button`
    background: red;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    position: absolute;
    right: 4px;
    padding: 0px;
    top: 4px;
`;

interface WeatherItemCardProps {
    latlng: string;
    onClick?: () => any;
    onDelete: () => any;
}

export default function index({ latlng, onClick, onDelete }: WeatherItemCardProps): JSX.Element {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentLocationWeather = useCallback(async () => {
        return dispatch(fetchCurrentWeather(latlng));
    }, []);
    const currentLocationWeather = useSelector((state) => getCurrentWeatherByKey(state, latlng));
    const currentCity = useSelector((state) => getCityByKey(state, latlng));
    useEffect(() => {
        fetchCurrentLocationWeather().then(() => {
            setLoading(false);
        });
    }, []);
    return (
        <Card loading={currentCity !== undefined && currentLocationWeather !== undefined && isLoading}>
            {currentCity !== undefined && currentLocationWeather !== undefined && (
                <WeatherItemCardRoot onClick={onClick}>
                    <div>
                        <h3>{currentCity.get('name')}</h3>
                        <span>{currentLocationWeather.get('observation_time')}</span>
                    </div>
                    <div>
                        <WeatherIcon
                            fallback={currentLocationWeather.get('weather_icons').first()}
                            code={currentLocationWeather.get('weather_code')}
                            size={32}
                        />
                    </div>
                    <h2>{currentLocationWeather.get('temperature')}°</h2>
                </WeatherItemCardRoot>
            )}
            <DeleteButton onClick={onDelete}>X</DeleteButton>
        </Card>
    );
}
