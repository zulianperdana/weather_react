import React from 'react';

interface WeatherIconProps {
    code: number;
    size: number;
    fallback: string;
}

export default function WeatherIcon({ code, size, fallback }: WeatherIconProps): JSX.Element {
    const sunny = [113];
    const cloudy = [119, 116, 122, 143, 248, 260];
    const rain = [176, 200, 263, 266, 293, 299, 302, 305, 308, 311];
    const snow = [179, 182, 185, 227, 230, 281, 284];
    let iconUrl = '/icons/';
    if (sunny.includes(code)) {
        iconUrl += 'sun.png';
    }
    if (cloudy.includes(code)) {
        iconUrl += 'cloudy.png';
    }
    if (rain.includes(code)) {
        iconUrl += 'rain.png';
    }
    if (snow.includes(code)) {
        iconUrl += 'snow.png';
    }
    if (iconUrl == '/icons/') {
        iconUrl = fallback;
    }
    return <img src={iconUrl} style={{ width: size, height: size }} />;
}
