import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchCurrentWeather = createAsyncThunk('weather/fetchCurrentWeather', async (key: string, { extra }) => {
    console.log('FETCH CURRENT WEATHER', key);
    const response = await (extra as any).getCurrentWeather(key);
    console.log(response);
    return response;
});

export { fetchCurrentWeather };
