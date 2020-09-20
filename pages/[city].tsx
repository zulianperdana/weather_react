import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import WeatherDetail from '@components/WeatherDetail';
import NoteInput from '@components/NoteInput';
import Card from '@components/Card';
import { getCityByKey, getCurrentWeatherByKey } from '@redux/weather/selector';
import { getCityNotes } from '@redux/note/selector';
import { addNote, removeNote } from '@redux/note';
import { fetchCurrentWeather } from '@redux/weather/thunk';
import { getFavorites } from '@redux/favorite/selector';
import { addFavorite } from '@redux/favorite';

export default function index() {
    const router = useRouter();
    const city = router.query.city as string;
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const fetchCurrentLocationWeather = useCallback(async () => {
        await dispatch(fetchCurrentWeather(city));
    }, [city]);
    useEffect(() => {
        if (city !== undefined) {
            fetchCurrentLocationWeather().then(() => {
                setLoading(false);
            });
        }
    }, [city]);
    const currentLocationWeather = useSelector((state) => getCurrentWeatherByKey(state, city));
    const currentCity = useSelector((state) => getCityByKey(state, city));
    const notes = useSelector((state) => getCityNotes(state, city));
    const favorites = useSelector((state) => getFavorites(state));
    const cityName = currentLocationWeather != undefined ? currentCity.get('name') : '';
    const isFavorite = favorites !== undefined && favorites.filter((f) => f.get('name') == cityName).size > 0;
    return (
        <div style={{ padding: 16 }}>
            {currentLocationWeather != undefined && (
                <WeatherDetail
                    fallback={currentLocationWeather.get('weather_icons').first()}
                    airPressure={currentLocationWeather.get('pressure')}
                    humidity={currentLocationWeather.get('humidity')}
                    windSpeed={currentLocationWeather.get('wind_speed')}
                    favorite={isFavorite}
                    toggleFavorite={() => dispatch(addFavorite({ key: cityName, name: cityName }))}
                    loading={isLoading}
                    rain={currentLocationWeather.get('precip')}
                    unit={currentLocationWeather.get('unit')}
                    weatherCode={currentLocationWeather.get('weather_code')}
                    title={currentCity.get('name')}
                    temperature={currentLocationWeather.get('temperature')}
                />
            )}
            <NoteInput onSubmit={(content) => dispatch(addNote({ cityKey: city, content }))} />
            <Card>
                <div style={{ padding: 16 }}>
                    {notes !== undefined && notes.size > 0 && <h3>Notes</h3>}
                    {notes !== undefined &&
                        notes.keySeq().map((key) => (
                            <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {notes.get(key)}
                                <span onClick={() => dispatch(removeNote({ cityKey: city, id: key }))}>X</span>
                            </div>
                        ))}
                </div>
            </Card>
        </div>
    );
}
