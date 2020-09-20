import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import WeatherItemCard from '@components/WeatherItemCard';
import WeatherItemBigCard from '@components/WeatherItemBigCard';
import useLocation from '@hooks/geolocation';
import { setCurrentLocation } from '@redux/preference';
import { getCurrentLocation } from '@redux/preference/selector';
import { getBigCities, getFavorites } from '@redux/favorite/selector';
import { removeBigCity, removeFavorite } from '@redux/favorite';
import { getCityByKey, getCurrentWeatherByKey } from '@redux/weather/selector';
import { fetchCurrentWeather } from '@redux/weather/thunk';

export default function index() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const geolocation = useLocation();
    const fetchCurrentLocationWeather = useCallback(async () => {
        await dispatch(fetchCurrentWeather(geolocation));
        dispatch(setCurrentLocation(geolocation));
    }, [geolocation]);
    useEffect(() => {
        if (geolocation !== '') {
            fetchCurrentLocationWeather().then(() => {
                setLoading(false);
            });
        }
    }, [geolocation]);
    const currentLocation = useSelector(getCurrentLocation);
    const currentLocationWeather = useSelector((state) => getCurrentWeatherByKey(state, currentLocation));
    const currentCity = useSelector((state) => getCityByKey(state, currentLocation));
    const bigCities = useSelector(getBigCities);
    const favorites = useSelector(getFavorites);
    return (
        <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 8 }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push('/[city]', `/${search}`);
                    }}
                >
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        name="search"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        placeholder="Search"
                    />
                </form>
            </div>
            {currentLocationWeather != undefined && (
                <Link href="/[city]" as={`/${currentLocation}`}>
                    <WeatherItemBigCard
                        fallback={currentLocationWeather.get('weather_icons').first()}
                        loading={isLoading}
                        weatherCode={currentLocationWeather.get('weather_code')}
                        title={currentCity.get('name')}
                        temperature={currentLocationWeather.get('temperature')}
                    />
                </Link>
            )}

            {favorites !== undefined && favorites.size > 0 && <h3>Favorites</h3>}
            {favorites !== undefined &&
                favorites.size > 0 &&
                favorites.map((c) => (
                    <Link key={c.get('name')} href="/[city]" as={`/${c.get('name')}`}>
                        <WeatherItemCard
                            onDelete={() => dispatch(removeFavorite(c.get('name')))}
                            latlng={c.get('name')}
                        />
                    </Link>
                ))}

            <h3>Big Cities</h3>
            {bigCities.map((c) => (
                <Link key={c.get('name')} href="/[city]" as={`/${c.get('name')}`}>
                    <WeatherItemCard onDelete={() => dispatch(removeBigCity(c.get('name')))} latlng={c.get('name')} />
                </Link>
            ))}
        </div>
    );
}
