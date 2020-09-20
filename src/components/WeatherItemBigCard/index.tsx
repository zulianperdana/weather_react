import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { spaces, mixins } from '@styles/index';
import WeatherIcon from '@components/WeatherIcon';
import Spinner from '@components/Spinner';

const { flex, alignCenter } = mixins;

const WeatherDetailCardRoot = styled.div`
    ${flex('column')}
    padding: ${spaces.big}px;
    margin-bottom: ${spaces.big}px;
    & > div {
        ${flex('row')}
        justify-content: space-between;
        ${alignCenter}
    }
`;

interface WeatherItemBigCardProps {
    title: string;
    temperature: number;
    weatherCode: number;
    loading: boolean;
    fallback: string;
    onClick?: () => any;
}

export default function index({
    loading,
    title,
    temperature,
    weatherCode,
    fallback,
    onClick,
}: WeatherItemBigCardProps): JSX.Element {
    return (
        <Card onClick={onClick} loading={loading}>
            <WeatherDetailCardRoot>
                <h3>{title}</h3>
                <div>
                    <h1>{temperature}°</h1>
                    <WeatherIcon fallback={fallback} code={weatherCode} size={48} />
                </div>
            </WeatherDetailCardRoot>
        </Card>
    );
}
